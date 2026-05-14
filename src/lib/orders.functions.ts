import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SPREADSHEET_ID = "1x6Tv9hm81QBBg1KEnJ9pa6c6GPr8dV_HOsR_93o1OC4";
const SHEETS_BASE = "https://sheets.googleapis.com/v4";

type ServiceAccount = {
  client_email: string;
  private_key: string;
};

async function getSheetsToken(sa: ServiceAccount): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  const b64url = (obj: object) =>
    btoa(JSON.stringify(obj))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

  const header = b64url({ alg: "RS256", typ: "JWT" });
  const claim = b64url({
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  });
  const sigInput = `${header}.${claim}`;

  const pemBody = sa.private_key
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\n/g, "");
  const keyBytes = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));

  const privateKey = await crypto.subtle.importKey(
    "pkcs8",
    keyBytes.buffer as ArrayBuffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const sigBytes = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    privateKey,
    new TextEncoder().encode(sigInput),
  );

  const sig = btoa(String.fromCharCode(...new Uint8Array(sigBytes)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const jwt = `${sigInput}.${sig}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!tokenRes.ok) throw new Error(`Token exchange failed: ${await tokenRes.text()}`);
  const { access_token } = (await tokenRes.json()) as { access_token: string };
  return access_token;
}

const orderSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(7).max(20),
  address: z.string().trim().min(10).max(400),
  p5: z.number().int().min(0).max(999),
  p10: z.number().int().min(0).max(999),
  p50: z.number().int().min(0).max(999),
  totalRotis: z.number().int().min(1).max(99999),
  total: z.number().int().min(1).max(9999999),
});

export const submitOrder = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => orderSchema.parse(input))
  .handler(async ({ data }) => {
    const saJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    if (!saJson) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is not configured");

    const sa: ServiceAccount = JSON.parse(saJson);
    const token = await getSheetsToken(sa);
    const authHeaders = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const now = new Date();
    const sheetName = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now);
    const timestamp = now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    const headers = [
      "Timestamp",
      "Name",
      "Phone",
      "Address",
      "Pack of 5",
      "Pack of 10",
      "Pack of 50",
      "Total Rotis",
      "Total ₹",
    ];
    const row = [
      timestamp,
      data.name,
      data.phone,
      data.address,
      data.p5,
      data.p10,
      data.p50,
      data.totalRotis,
      data.total,
    ];

    // Try to create today's sheet tab. Google returns 400 if it already exists — that's fine.
    const addRes = await fetch(
      `${SHEETS_BASE}/spreadsheets/${SPREADSHEET_ID}:batchUpdate`,
      {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          requests: [{ addSheet: { properties: { title: sheetName, index: 0 } } }],
        }),
      },
    );

    if (addRes.ok) {
      await fetch(
        `${SHEETS_BASE}/spreadsheets/${SPREADSHEET_ID}/values/'${sheetName}'!A1:I1?valueInputOption=USER_ENTERED`,
        {
          method: "PUT",
          headers: authHeaders,
          body: JSON.stringify({ values: [headers] }),
        },
      );
    }

    const appendRes = await fetch(
      `${SHEETS_BASE}/spreadsheets/${SPREADSHEET_ID}/values/'${sheetName}'!A:I:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ values: [row] }),
      },
    );

    if (!appendRes.ok) {
      const text = await appendRes.text();
      console.error("Sheets append failed:", appendRes.status, text);
      throw new Error(`Failed to save order (${appendRes.status})`);
    }

    return { ok: true };
  });
