// api/brapi.js — Vercel Serverless: proxy seguro para Brapi
// Protege o BRAPI_TOKEN no servidor.
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const { ticker } = req.query;
  if (!ticker) return res.status(400).json({ error: "ticker obrigatório" });

  const token = process.env.BRAPI_TOKEN;
  if (!token) return res.status(500).json({ error: "BRAPI_TOKEN não configurado" });

  const modules = [
    "defaultKeyStatistics",
    "financialData",
    "balanceSheetHistory",
    "incomeStatementHistory",
    "cashflowHistory",
    "summaryProfile",
  ].join(",");

  const url = `https://brapi.dev/api/quote/${encodeURIComponent(ticker)}?dividends=true&modules=${modules}&token=${token}`;

  try {
    const r = await fetch(url);
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data.message || "Brapi error" });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
