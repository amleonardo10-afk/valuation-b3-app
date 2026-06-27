import { useState, useCallback } from "react";

const C = {
  bg:"#0a0e17", surface:"#111827", card:"#151d2e", border:"#1e2d45",
  accent:"#00d4ff", accentDim:"#0099bb", gold:"#f0b429",
  green:"#22c55e", yellow:"#facc15", orange:"#f97316", red:"#ef4444",
  text:"#e2e8f0", muted:"#64748b", dim:"#334155",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{background:#0a0e17;color:#e2e8f0;font-family:'Space Grotesk',sans-serif;min-height:100vh;overflow-x:hidden}
  .mono{font-family:'JetBrains Mono',monospace}
  .shell{max-width:1200px;margin:0 auto;padding:0 24px 64px}
  .header{display:flex;align-items:center;justify-content:space-between;padding:28px 0 24px;border-bottom:1px solid #1e2d45;margin-bottom:36px}
  .logo{display:flex;align-items:center;gap:12px}
  .logo-icon{width:40px;height:40px;background:linear-gradient(135deg,#00d4ff,#0099bb);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px}
  .logo-text{font-size:18px;font-weight:700;letter-spacing:-.5px}
  .logo-sub{font-size:11px;color:#64748b;letter-spacing:2px;text-transform:uppercase}
  .tabs{display:flex;gap:4px;background:#111827;border:1px solid #1e2d45;border-radius:10px;padding:4px;margin-bottom:32px}
  .tab{flex:1;padding:9px 16px;border-radius:7px;border:none;background:transparent;color:#64748b;font-family:'Space Grotesk',sans-serif;font-size:13px;font-weight:500;cursor:pointer;transition:all .2s;white-space:nowrap}
  .tab.active{background:#151d2e;color:#e2e8f0;box-shadow:0 1px 4px rgba(0,0,0,.4)}
  .search-wrap{display:flex;gap:12px;margin-bottom:32px;flex-wrap:wrap}
  .ticker-input{background:#111827;border:1px solid #1e2d45;border-radius:10px;padding:14px 20px;font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:600;color:#e2e8f0;letter-spacing:3px;text-transform:uppercase;outline:none;transition:border-color .2s;width:200px}
  .ticker-input:focus{border-color:#00d4ff}
  .ticker-input::placeholder{color:#64748b;font-size:14px;letter-spacing:1px}
  .btn{padding:14px 28px;background:linear-gradient(135deg,#00d4ff,#0099bb);border:none;border-radius:10px;color:#000;font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:700;cursor:pointer;transition:opacity .2s,transform .1s;letter-spacing:.5px}
  .btn:hover{opacity:.9}.btn:active{transform:scale(.98)}.btn:disabled{opacity:.5;cursor:not-allowed}
  .card{background:#151d2e;border:1px solid #1e2d45;border-radius:14px;padding:24px}
  .grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:20px}
  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px}
  .metric-card{background:#151d2e;border:1px solid #1e2d45;border-radius:14px;padding:20px 22px}
  .metric-label{font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
  .metric-value{font-family:'JetBrains Mono',monospace;font-size:26px;font-weight:600;line-height:1}
  .metric-sub{font-size:12px;color:#64748b;margin-top:6px}
  .score-ring{position:relative;width:110px;height:110px;margin:0 auto 12px}
  .score-ring svg{width:100%;height:100%;transform:rotate(-90deg)}
  .score-num{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:28px;font-weight:700}
  .rec-badge{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:999px;font-size:13px;font-weight:600}
  .ind-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:12px;margin-top:20px}
  .ind-item{background:#111827;border:1px solid #1e2d45;border-radius:10px;padding:14px 16px}
  .ind-name{font-size:11px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}
  .ind-val{font-family:'JetBrains Mono',monospace;font-size:19px;font-weight:600}
  .ind-sig{font-size:11px;margin-top:4px;font-weight:500}
  .ai-block{background:#111827;border:1px solid #1e2d45;border-radius:12px;padding:20px 22px;margin-bottom:14px}
  .ai-block h4{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#00d4ff;margin-bottom:10px}
  .ai-block p,.ai-block li{font-size:14px;line-height:1.7;color:#e2e8f0}
  .ai-block ul{padding-left:18px}.ai-block li{margin-bottom:4px}
  .sec-hdr{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#64748b;margin-bottom:16px;padding-bottom:10px;border-bottom:1px solid #1e2d45}
  .divider{border:none;border-top:1px solid #1e2d45;margin:24px 0}
  .loading-wrap{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;padding:60px 0;color:#64748b}
  .spinner{width:48px;height:48px;border:3px solid #1e2d45;border-top-color:#00d4ff;border-radius:50%;animation:spin .8s linear infinite}
  @keyframes spin{to{transform:rotate(360deg)}}
  .loading-steps{font-size:13px;text-align:center;line-height:2.2}
  .loading-steps .done{color:#22c55e}.loading-steps .cur{color:#00d4ff}
  .empty-state{text-align:center;padding:80px 0;color:#64748b}
  .empty-icon{font-size:48px;margin-bottom:16px}
  .empty-state h3{font-size:18px;font-weight:600;color:#e2e8f0;margin-bottom:8px}
  .empty-state p{font-size:14px}
  .prog-bar-wrap{background:#1e2d45;border-radius:999px;height:6px;overflow:hidden}
  .prog-bar{height:100%;border-radius:999px;transition:width .6s ease}
  .tag{display:inline-block;padding:3px 8px;border-radius:4px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px}
  .compare-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:24px}
  .compare-input{background:#111827;border:1px solid #1e2d45;border-radius:8px;padding:10px 14px;font-family:'JetBrains Mono',monospace;font-size:15px;font-weight:600;color:#e2e8f0;letter-spacing:2px;text-transform:uppercase;outline:none;width:100%;transition:border-color .2s}
  .compare-input:focus{border-color:#00d4ff}
  .hist-table{width:100%;border-collapse:collapse}
  .hist-table th{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#64748b;padding:10px 14px;text-align:left;border-bottom:1px solid #1e2d45}
  .hist-table td{padding:12px 14px;font-size:13px;border-bottom:1px solid #334155}
  .hist-table tr:last-child td{border-bottom:none}
  .alert-box{background:#1a1200;border:1px solid #f0b42944;border-radius:10px;padding:14px 18px;margin-bottom:20px;font-size:13px;color:#f0b429;display:flex;align-items:flex-start;gap:10px}
  .source-badge{display:inline-flex;align-items:center;gap:5px;padding:3px 8px;border-radius:4px;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase}
  .source-real{background:#14532d33;color:#22c55e;border:1px solid #22c55e44}
  .source-est{background:#42330033;color:#facc15;border:1px solid #facc1544}
  @media(max-width:768px){.grid3{grid-template-columns:1fr 1fr}.compare-grid{grid-template-columns:repeat(3,1fr)}}
  @media(max-width:520px){.grid3{grid-template-columns:1fr}.compare-grid{grid-template-columns:1fr 1fr}.tabs{overflow-x:auto}}
`;

const fmtBRL = v => v==null?"—":`R$ ${Number(v).toFixed(2).replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g,".")}`;
const fmtPct = v => v==null?"—":`${Number(v).toFixed(1).replace(".",",")}%`;
const fmtN   = (v,d=2) => v==null?"—":Number(v).toFixed(d).replace(".",",");
const fmtM   = v => { if(v==null)return"—"; const n=Number(v); if(Math.abs(n)>=1e9)return`R$ ${(n/1e9).toFixed(1).replace(".",",")}B`; if(Math.abs(n)>=1e6)return`R$ ${(n/1e6).toFixed(1).replace(".",",")}M`; return fmtBRL(n); };
const scoreColor = s => s>=75?C.green:s>=55?C.yellow:s>=35?C.orange:C.red;

const recConfig = {
  "Compra Fortemente Favorável": {emoji:"🟢",bg:"#14532d22",border:"#22c55e55",text:C.green},
  "Compra Favorável":            {emoji:"🟢",bg:"#14532d22",border:"#22c55e55",text:C.green},
  "Compra com Ressalvas":        {emoji:"🟡",bg:"#42330022",border:"#facc1555",text:C.yellow},
  "Manter":                      {emoji:"🟡",bg:"#42330022",border:"#facc1555",text:C.yellow},
  "Aguardar Melhor Oportunidade":{emoji:"🟠",bg:"#43190022",border:"#f9731655",text:C.orange},
  "Desfavorável no Momento":     {emoji:"🔴",bg:"#43000022",border:"#ef444455",text:C.red},
  "Fortemente Desfavorável":     {emoji:"🔴",bg:"#43000022",border:"#ef444455",text:C.red},
};

function sigColor(s){
  if(!s)return C.muted;
  const l=s.toLowerCase();
  if(l.includes("excelente")||l.includes("bom")||l.includes("segura")||l.includes("baixo risco")||l.includes("sem manipul"))return C.green;
  if(l.includes("moderado")||l.includes("cinza")||l.includes("neutro"))return C.yellow;
  if(l.includes("alto")||l.includes("fraco")||l.includes("risco")||l.includes("negativo")||l.includes("manipul"))return C.orange;
  return C.muted;
}

// ─── CHAMADAS API ────────────────────────────────────────────────────────────
async function fetchBrapi(ticker) {
  const res = await fetch(`/api/brapi?ticker=${encodeURIComponent(ticker)}`);
  const data = await res.json();
  if(!res.ok) throw new Error(data.error||"Erro ao buscar dados na Brapi");
  const r = data.results?.[0];
  if(!r) throw new Error(`Ticker "${ticker}" não encontrado na B3`);
  return r;
}

async function callAI(userPrompt, systemPrompt) {
  const res = await fetch("/api/analyze", {
    method:"POST", headers:{"Content-Type":"application/json"},
    body:JSON.stringify({system:systemPrompt, messages:[{role:"user",content:userPrompt}]}),
  });
  const data = await res.json();
  if(!res.ok) throw new Error(data.error||"Erro na API de IA");
  return data.content?.find(b=>b.type==="text")?.text||"";
}

// ─── MOTOR PRINCIPAL ─────────────────────────────────────────────────────────
async function analisarAcao(ticker, setStep) {
  const sys = `Você é um analista fundamentalista sênior especializado em ações da B3.
Responda SEMPRE em JSON puro, sem markdown, sem texto fora do JSON.`;

  // PASSO 1 — dados reais da Brapi (plano gratuito: cotação + perfil + dividendos)
  setStep(1);
  const raw = await fetchBrapi(ticker.toUpperCase());

  // Extrair o que o plano gratuito fornece
  const sp   = raw.summaryProfile || {};
  const divs = raw.dividendsData?.cashDividends || [];
  const preco = raw.regularMarketPrice;
  const nome  = raw.longName || raw.shortName || raw.symbol;
  const setor = sp.sector || raw.sector || "—";
  const mktCap= raw.marketCap;
  const change= raw.regularMarketChangePercent;

  // DPA real dos últimos 12 meses
  const umAno = Date.now() - 365*24*3600*1000;
  const dpaReal = divs.length>0
    ? divs.filter(d=>new Date(d.paymentDate||d.lastDatePriorEx).getTime()>umAno).reduce((s,d)=>s+(d.rate||0),0)
    : null;

  // PASSO 2 — IA estima os fundamentais com base no que conhece + dados reais disponíveis
  setStep(2);
  const promptFund = `A ação ${ticker.toUpperCase()} (${nome}) do setor ${setor} está cotada a ${fmtBRL(preco)} com market cap de ${fmtM(mktCap)}.
${dpaReal ? `Dividendos pagos nos últimos 12 meses (dado REAL da B3): R$ ${dpaReal.toFixed(2)} por ação.` : "Dados de dividendos não disponíveis."}

Com base no seu conhecimento desta empresa (dados de 2023/2024), estime os indicadores fundamentalistas.
⚠️ Use o preço atual fornecido (${fmtBRL(preco)}) para calcular múltiplos como P/L, P/VP, DY.
${dpaReal ? `⚠️ Use o DPA real fornecido (R$ ${dpaReal.toFixed(2)}) para DY e Bazin.` : ""}

Retorne JSON:
{
  "lpa": number,
  "vpa": number,
  "dpa": number,
  "ebitda_bi": number,
  "receita_bi": number,
  "lucro_liquido_bi": number,
  "divida_liquida_bi": number,
  "patrimonio_liquido_bi": number,
  "shares_milhoes": number,
  "roe": number,
  "roic": number,
  "margem_liquida": number,
  "margem_ebitda": number,
  "margem_bruta": number,
  "crescimento_lucro_5a": number,
  "crescimento_receita_5a": number,
  "divida_ebitda": number,
  "cobertura_juros": number,
  "beta": number,
  "wacc": number,
  "crescimento_perpetuidade": number,
  "piotroski": number,
  "altman_z": number,
  "beneish_m": number,
  "confianca_estimativas": "Alta" | "Média" | "Baixa"
}`;

  const fundRaw = await callAI(promptFund, sys);
  let fund;
  try { fund = JSON.parse(fundRaw.replace(/```json|```/g,"").trim()); }
  catch { throw new Error("Erro ao processar estimativas da IA."); }

  // PASSO 3 — calcular valuation
  setStep(3);
  const lpa    = fund.lpa;
  const vpa    = fund.vpa;
  const dpa    = dpaReal || fund.dpa;
  const wacc   = fund.wacc || 12.5;
  const g      = fund.crescimento_perpetuidade || 4;
  const shares = (fund.shares_milhoes||1) * 1e6;
  const ebitda = (fund.ebitda_bi||0) * 1e9;
  const lucroLiq=(fund.lucro_liquido_bi||0)*1e9;
  const divLiq = (fund.divida_liquida_bi||0)*1e9;
  const pl_    = (fund.patrimonio_liquido_bi||0)*1e9;
  const receita= (fund.receita_bi||0)*1e9;
  const ebit   = ebitda*0.8;

  const graham = lpa>0&&vpa>0 ? Math.sqrt(22.5*lpa*vpa)*0.75 : null;
  const bazin  = dpa>0 ? dpa/0.06 : null;
  const gordRate=(wacc-g)/100;
  const gordon = dpa>0&&gordRate>0.01 ? dpa/gordRate : null;
  const fclPA  = lucroLiq>0&&shares>0 ? (lucroLiq*0.7)/shares : null;
  let dcf=null;
  if(fclPA&&fclPA>0){
    let d2=0; for(let i=1;i<=10;i++) d2+=(fclPA*Math.pow(1+g/100,i))/Math.pow(1+wacc/100,i);
    const term=(fclPA*Math.pow(1+g/100,10)*(1+g/100))/((wacc/100-g/100)*Math.pow(1+wacc/100,10));
    dcf=d2+term;
  }
  const ev = mktCap!=null ? mktCap+divLiq : null;
  const evEbitdaJusto = ebitda>0&&shares>0 ? Math.max(0,(7*ebitda-divLiq)/shares) : null;

  const modelos=[
    graham?{nome:"Graham (adj.)",v:graham,w:2}:null,
    bazin?{nome:"Bazin",v:bazin,w:dpaReal?2:1.5}:null,
    gordon?{nome:"Gordon DDM",v:gordon,w:dpaReal?2:1.5}:null,
    dcf?{nome:"DCF",v:dcf,w:3}:null,
    evEbitdaJusto?{nome:"EV/EBITDA 7x",v:evEbitdaJusto,w:2}:null,
  ].filter(Boolean);

  const totalW=modelos.reduce((s,m)=>s+m.w,0);
  const valorJusto=totalW>0?modelos.reduce((s,m)=>s+m.v*m.w,0)/totalW:preco;
  const margemSeg=preco&&valorJusto?((valorJusto-preco)/valorJusto)*100:null;

  // Múltiplos
  const pL   = lpa>0?preco/lpa:null;
  const pVp  = vpa>0?preco/vpa:null;
  const evEb = ev&&ebitda>0?ev/ebitda:null;
  const evEi = ev&&ebit>0?ev/ebit:null;
  const dyPct= dpa&&preco?(dpa/preco)*100:null;
  const peg  = pL&&fund.crescimento_lucro_5a>0?pL/fund.crescimento_lucro_5a:null;

  const ind = {
    "P/L":           {val:pL,             sinal:pL?(pL<8?"Excelente":pL<15?"Bom":pL<25?"Moderado":"Alto"):null},
    "P/VP":          {val:pVp,            sinal:pVp?(pVp<1?"Excelente":pVp<2?"Bom":"Moderado"):null},
    "EV/EBITDA":     {val:evEb,           sinal:evEb?(evEb<5?"Excelente":evEb<8?"Bom":evEb<12?"Moderado":"Alto"):null},
    "EV/EBIT":       {val:evEi,           sinal:evEi?(evEi<7?"Excelente":evEi<12?"Bom":"Moderado"):null},
    "DY":            {val:dyPct,          sinal:dyPct?(dyPct>8?"Excelente":dyPct>5?"Bom":dyPct>3?"Moderado":"Baixo"):null, unit:"%"},
    "ROE":           {val:fund.roe,       sinal:fund.roe?(fund.roe>20?"Excelente":fund.roe>12?"Bom":fund.roe>6?"Moderado":"Fraco"):null, unit:"%"},
    "ROIC":          {val:fund.roic,      sinal:fund.roic?(fund.roic>15?"Excelente":fund.roic>10?"Bom":fund.roic>5?"Moderado":"Fraco"):null, unit:"%"},
    "PEG":           {val:peg,            sinal:peg?(peg<1?"Excelente":peg<1.5?"Bom":"Alto"):null},
    "Margem Líq.":   {val:fund.margem_liquida, sinal:fund.margem_liquida?(fund.margem_liquida>20?"Excelente":fund.margem_liquida>10?"Bom":fund.margem_liquida>5?"Moderado":"Fraco"):null, unit:"%"},
    "Margem EBITDA": {val:fund.margem_ebitda,  sinal:fund.margem_ebitda?(fund.margem_ebitda>35?"Excelente":fund.margem_ebitda>20?"Bom":"Moderado"):null, unit:"%"},
    "Margem Bruta":  {val:fund.margem_bruta,   sinal:fund.margem_bruta?(fund.margem_bruta>50?"Excelente":fund.margem_bruta>30?"Bom":"Moderado"):null, unit:"%"},
    "Dív/EBITDA":    {val:fund.divida_ebitda,  sinal:fund.divida_ebitda!=null?(fund.divida_ebitda<1?"Excelente":fund.divida_ebitda<2?"Bom":fund.divida_ebitda<3.5?"Moderado":"Alto Risco"):null},
    "Cob. Juros":    {val:fund.cobertura_juros,sinal:fund.cobertura_juros?(fund.cobertura_juros>5?"Excelente":fund.cobertura_juros>2?"Moderado":"Alto Risco"):null},
    "Cresc. Lucro":  {val:fund.crescimento_lucro_5a, sinal:fund.crescimento_lucro_5a?(fund.crescimento_lucro_5a>15?"Excelente":fund.crescimento_lucro_5a>8?"Bom":fund.crescimento_lucro_5a>0?"Moderado":"Negativo"):null, unit:"%"},
    "Cresc. Receita":{val:fund.crescimento_receita_5a,sinal:fund.crescimento_receita_5a?(fund.crescimento_receita_5a>15?"Excelente":fund.crescimento_receita_5a>8?"Bom":fund.crescimento_receita_5a>0?"Moderado":"Negativo"):null, unit:"%"},
    "Beta":          {val:fund.beta,      sinal:fund.beta?(fund.beta<0.8?"Baixo Risco":fund.beta<1.2?"Moderado":"Alto Risco"):null},
    "Piotroski":     {val:fund.piotroski, sinal:fund.piotroski?(fund.piotroski>=7?"Excelente":fund.piotroski>=5?"Bom":fund.piotroski>=3?"Moderado":"Fraco"):null},
    "Altman Z":      {val:fund.altman_z,  sinal:fund.altman_z?(fund.altman_z>2.99?"Zona Segura":fund.altman_z>1.81?"Zona Cinza":"Zona de Risco"):null},
    "Beneish M":     {val:fund.beneish_m, sinal:fund.beneish_m?(fund.beneish_m<-2.22?"Sem Manipulação":"Risco de Manipulação"):null},
    "Margem Seg.":   {val:margemSeg,      sinal:margemSeg!=null?(margemSeg>30?"Excelente":margemSeg>15?"Bom":margemSeg>0?"Moderado":"Acima do Justo"):null, unit:"%"},
  };

  // PASSO 4 — análise IA
  setStep(4);
  const resumo=[
    `Ticker: ${ticker.toUpperCase()} | Empresa: ${nome} | Setor: ${setor}`,
    `Preço REAL (Brapi): ${fmtBRL(preco)} | Market Cap: ${fmtM(mktCap)} | Variação hoje: ${change?.toFixed(2)||"—"}%`,
    `DPA (${dpaReal?"REAL - B3":"estimado"}): ${fmtBRL(dpa)} | DY: ${fmtPct(dyPct)}`,
    `Valor Justo calculado: ${fmtBRL(valorJusto)} | Margem de segurança: ${fmtPct(margemSeg)}`,
    `Modelos: ${modelos.map(m=>`${m.nome}=${fmtBRL(m.v)}`).join(", ")}`,
    `P/L=${fmtN(pL)} | P/VP=${fmtN(pVp)} | EV/EBITDA=${fmtN(evEb)} | ROE=${fmtPct(fund.roe)} | ROIC=${fmtPct(fund.roic)}`,
    `Margem Líq=${fmtPct(fund.margem_liquida)} | Dív/EBITDA=${fmtN(fund.divida_ebitda)} | Piotroski=${fund.piotroski} | Altman Z=${fmtN(fund.altman_z)}`,
    `⚠️ ATENÇÃO: Preço e DPA são dados REAIS. Demais fundamentos são ESTIMATIVAS da IA (confiança: ${fund.confianca_estimativas}).`,
  ].join("\n");

  const analiseRaw = await callAI(
    `Analise a ação com os dados abaixo e gere avaliação fundamentalista:\n\n${resumo}\n\nIMPORTANTE: Deixe claro na análise quais dados são reais (preço, DPA quando indicado) e quais são estimativas. Retorne APENAS JSON:\n{"score_ia":number,"nivel_confianca":"Alta"|"Média"|"Baixa","recomendacao":"Compra Fortemente Favorável"|"Compra Favorável"|"Compra com Ressalvas"|"Manter"|"Aguardar Melhor Oportunidade"|"Desfavorável no Momento"|"Fortemente Desfavorável","resumo_executivo":"string","pontos_positivos":["","",""],"pontos_atencao":["",""],"principais_riscos":["",""],"fundamentacao":"string"}`,
    sys
  );

  let analise;
  try { analise = JSON.parse(analiseRaw.replace(/```json|```/g,"").trim()); }
  catch { throw new Error("Erro ao processar análise da IA."); }

  setStep(5);
  return {
    ticker:ticker.toUpperCase(), nome, setor, preco, mktCap, change,
    dpa, dpaReal, fund, ind, modelos, valorJusto, margemSeg,
    pL, pVp, evEb, dyPct, analise, timestamp:new Date(),
    ebitda, receita, lucroLiq, divLiq, pl_,
  };
}

// ─── COMPONENTES ─────────────────────────────────────────────────────────────
function ScoreRing({score}){
  const cor=scoreColor(score), circ=2*Math.PI*44, offset=circ*(1-score/100);
  return(
    <div className="score-ring">
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="44" fill="none" stroke="#1e2d45" strokeWidth="8"/>
        <circle cx="50" cy="50" r="44" fill="none" stroke={cor} strokeWidth="8" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"/>
      </svg>
      <div className="score-num mono" style={{color:cor}}>{score}</div>
    </div>
  );
}

function RecBadge({rec}){
  const cfg=recConfig[rec]||{emoji:"⬜",bg:C.surface,border:C.border,text:C.muted};
  return <div className="rec-badge" style={{background:cfg.bg,border:`1px solid ${cfg.border}`,color:cfg.text}}><span>{cfg.emoji}</span><span>{rec}</span></div>;
}

function Ind({name,val,sinal,unit=""}){
  const cor=sigColor(sinal);
  const disp=val==null?"—":typeof val==="number"?(Math.abs(val)>1000?val.toFixed(0):Math.abs(val)>100?val.toFixed(1):val.toFixed(2)):val;
  return(
    <div className="ind-item">
      <div className="ind-name">{name}</div>
      <div className="ind-val" style={{color:cor}}>{disp}{unit&&<span style={{fontSize:12}}>{unit}</span>}</div>
      {sinal&&<div className="ind-sig" style={{color:cor}}>{sinal}</div>}
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App(){
  const [aba,setAba]=useState("analise");
  const [ticker,setTicker]=useState("");
  const [loading,setLoading]=useState(false);
  const [step,setStep]=useState(0);
  const [resultado,setResultado]=useState(null);
  const [erro,setErro]=useState("");
  const [historico,setHistorico]=useState([]);
  const [tickers5,setTickers5]=useState(["","","","",""]);
  const [loadingComp,setLoadingComp]=useState(false);
  const [comparacao,setComparacao]=useState(null);

  const STEPS=["Inicializando…","Buscando cotação real na B3 via Brapi…","IA estimando fundamentos…","Calculando modelos de valuation…","IA analisando indicadores…","Consolidando resultado…"];

  const analisar=useCallback(async()=>{
    if(!ticker.trim())return;
    setLoading(true);setErro("");setResultado(null);setStep(0);
    try{
      const res=await analisarAcao(ticker.trim(),setStep);
      setResultado(res);
      setHistorico(h=>[{data:res.timestamp,ticker:res.ticker,preco:res.preco,valorJusto:res.valorJusto,score:res.analise.score_ia,rec:res.analise.recomendacao},...h].slice(0,50));
      setAba("analise");
    }catch(e){setErro(e.message);}
    finally{setLoading(false);setStep(0);}
  },[ticker]);

  const compararAcoes=useCallback(async()=>{
    const list=tickers5.filter(t=>t.trim());
    if(list.length<2)return;
    setLoadingComp(true);setComparacao(null);setErro("");
    try{ const r=await Promise.all(list.map(t=>analisarAcao(t.trim(),()=>{}))); setComparacao(r); }
    catch(e){setErro(e.message);}
    finally{setLoadingComp(false);}
  },[tickers5]);

  const renderAnalise=()=>{
    if(loading)return(
      <div className="loading-wrap">
        <div className="spinner"/>
        <div className="loading-steps">
          {STEPS.map((s,i)=><div key={i} className={i<step?"done":i===step?"cur":""}>{i<step?"✓ ":i===step?"⟳ ":"  "}{s}</div>)}
        </div>
        <div style={{fontSize:12,color:C.muted}}>Cotação real · Fundamentos estimados pela IA</div>
      </div>
    );
    if(erro)return <div className="empty-state"><div className="empty-icon">⚠️</div><h3>Erro na análise</h3><p style={{color:C.red}}>{erro}</p></div>;
    if(!resultado)return(
      <div className="empty-state">
        <div className="empty-icon">📊</div>
        <h3>Insira um ticker para começar</h3>
        <p>Ex.: PETR4, WEGE3, VALE3, ITUB4, POMO4, EGIE3</p>
        <p style={{marginTop:8,fontSize:12,color:C.dim}}>Cotação real B3 · Fundamentos estimados por IA</p>
      </div>
    );

    const r=resultado;
    return(
      <>
        {/* Aviso transparente */}
        <div className="alert-box">
          <span>ℹ️</span>
          <div>
            <strong>Transparência sobre os dados:</strong> O <strong>preço atual</strong>{r.dpaReal?" e os <strong>dividendos</strong>":""} são dados <strong>reais da B3</strong> via Brapi. Os demais fundamentos (LPA, VPA, EBITDA, margens etc.) são <strong>estimativas da IA</strong> com base no conhecimento da empresa — confiança: <strong>{r.fund.confianca_estimativas}</strong>. Para dados reais completos, considere o plano pago da Brapi.
          </div>
        </div>

        {/* Cabeçalho */}
        <div className="card" style={{marginBottom:20,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
              <span className="mono" style={{fontSize:24,fontWeight:700,color:C.accent}}>{r.ticker}</span>
              <span className="tag" style={{background:C.border,color:C.muted}}>{r.setor}</span>
              <span className="source-badge source-real">✓ Preço Real · Brapi</span>
            </div>
            <div style={{fontSize:16,fontWeight:600}}>{r.nome}</div>
            {r.mktCap&&<div style={{fontSize:12,color:C.muted,marginTop:4}}>Market Cap: {fmtM(r.mktCap)} · Var. hoje: <span style={{color:r.change>=0?C.green:C.red}}>{r.change?.toFixed(2)||"—"}%</span></div>}
          </div>
          <RecBadge rec={r.analise.recomendacao}/>
        </div>

        <div className="grid3">
          <div className="metric-card">
            <div className="metric-label">Preço Atual <span className="source-badge source-real">Real</span></div>
            <div className="metric-value mono">{fmtBRL(r.preco)}</div>
            <div className="metric-sub">Beta estimado: {fmtN(r.fund.beta)}</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Valor Justo <span className="source-badge source-est">Estimado</span></div>
            <div className="metric-value mono" style={{color:C.gold}}>{fmtBRL(r.valorJusto)}</div>
            <div className="metric-sub">{r.modelos.length} modelos ponderados</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Margem de Segurança</div>
            <div className="metric-value mono" style={{color:r.margemSeg>15?C.green:r.margemSeg>0?C.yellow:C.red}}>
              {fmtPct(r.margemSeg)}
            </div>
            <div className="metric-sub">{r.margemSeg>0?"Desconto em relação ao justo":"Acima do valor justo"}</div>
          </div>
        </div>

        <div className="grid3">
          <div className="metric-card" style={{textAlign:"center"}}>
            <div className="metric-label">Score IA</div>
            <ScoreRing score={r.analise.score_ia}/>
            <div style={{color:C.muted,fontSize:12}}>Confiança: <strong style={{color:C.text}}>{r.analise.nivel_confianca}</strong></div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Dividend Yield <span className="source-badge source-real">Real</span></div>
            <div className="metric-value mono" style={{color:C.gold}}>{fmtPct(r.dyPct)}</div>
            <div className="metric-sub">DPA 12m: {fmtBRL(r.dpa)} {r.dpaReal?"(real)":"(estimado)"}</div>
            <hr style={{border:"none",borderTop:`1px solid ${C.border}`,margin:"14px 0"}}/>
            <div className="metric-label">ROE / ROIC <span className="source-badge source-est">Est.</span></div>
            <div style={{display:"flex",gap:16}}>
              <div><div className="mono" style={{fontSize:20,fontWeight:600,color:r.fund.roe>15?C.green:C.yellow}}>{fmtPct(r.fund.roe)}</div><div style={{fontSize:11,color:C.muted}}>ROE</div></div>
              <div><div className="mono" style={{fontSize:20,fontWeight:600,color:r.fund.roic>12?C.green:C.yellow}}>{fmtPct(r.fund.roic)}</div><div style={{fontSize:11,color:C.muted}}>ROIC</div></div>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Modelos de Valuation</div>
            {r.modelos.map(m=>(
              <div key={m.nome} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 0",borderBottom:`1px solid ${C.dim}`}}>
                <span style={{fontSize:12,color:C.muted}}>{m.nome}</span>
                <span className="mono" style={{fontSize:13,color:m.v>r.preco?C.green:C.red}}>{fmtBRL(m.v)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ai-block"><h4>Resumo Executivo</h4><p>{r.analise.resumo_executivo}</p></div>
        <div className="grid2" style={{marginBottom:20}}>
          <div className="ai-block" style={{marginBottom:0}}><h4>✅ Pontos Positivos</h4><ul>{r.analise.pontos_positivos?.map((p,i)=><li key={i}>{p}</li>)}</ul></div>
          <div className="ai-block" style={{marginBottom:0}}><h4>⚠️ Pontos de Atenção</h4><ul>{r.analise.pontos_atencao?.map((p,i)=><li key={i}>{p}</li>)}</ul></div>
        </div>
        <div className="grid2">
          <div className="ai-block" style={{marginBottom:0}}><h4>🔴 Principais Riscos</h4><ul>{r.analise.principais_riscos?.map((p,i)=><li key={i}>{p}</li>)}</ul></div>
          <div className="ai-block" style={{marginBottom:0}}><h4>📌 Fundamentação</h4><p>{r.analise.fundamentacao}</p></div>
        </div>
        <hr className="divider"/>
        <div className="sec-hdr">Todos os Indicadores <span className="source-badge source-est" style={{marginLeft:8}}>Fundamentos estimados por IA</span></div>
        <div className="ind-grid">
          {Object.entries(r.ind).map(([k,v])=><Ind key={k} name={k} val={v.val} sinal={v.sinal} unit={v.unit||""}/>)}
        </div>
      </>
    );
  };

  const renderComparacao=()=>(
    <>
      <div className="sec-hdr" style={{marginBottom:20}}>Comparação de Até 5 Ações</div>
      <div className="compare-grid" style={{marginBottom:16}}>
        {tickers5.map((t,i)=>(
          <input key={i} className="compare-input" placeholder={`Ticker ${i+1}`} value={t}
            onChange={e=>{const n=[...tickers5];n[i]=e.target.value.toUpperCase();setTickers5(n);}} maxLength={6}/>
        ))}
      </div>
      <button className="btn" style={{marginBottom:28}} onClick={compararAcoes} disabled={loadingComp||tickers5.filter(t=>t.trim()).length<2}>
        {loadingComp?"Analisando…":"Comparar Ações"}
      </button>
      {erro&&<div style={{color:C.red,marginBottom:16,fontSize:13}}>⚠️ {erro}</div>}
      {loadingComp&&<div className="loading-wrap"><div className="spinner"/><div style={{color:C.muted,fontSize:13}}>Analisando em paralelo…</div></div>}
      {comparacao&&(
        <>
          <div className="sec-hdr">Ranking por Score IA</div>
          <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:28}}>
            {[...comparacao].sort((a,b)=>b.analise.score_ia-a.analise.score_ia).map((r,i)=>(
              <div key={r.ticker} className="card" style={{display:"flex",alignItems:"center",gap:16}}>
                <div style={{width:32,height:32,borderRadius:8,background:i===0?C.gold:C.border,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:i===0?"#000":C.muted,flexShrink:0}}>{i+1}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6,flexWrap:"wrap",gap:8}}>
                    <span className="mono" style={{fontWeight:700}}>{r.ticker}</span>
                    <span style={{fontSize:12,color:C.muted}}>{r.nome}</span>
                    <span style={{color:scoreColor(r.analise.score_ia),fontWeight:700}}>Score {r.analise.score_ia}</span>
                  </div>
                  <div className="prog-bar-wrap"><div className="prog-bar" style={{width:`${r.analise.score_ia}%`,background:scoreColor(r.analise.score_ia)}}/></div>
                </div>
                <RecBadge rec={r.analise.recomendacao}/>
              </div>
            ))}
          </div>
          <div className="sec-hdr">Comparativo</div>
          <div className="card" style={{overflowX:"auto"}}>
            <table className="hist-table">
              <thead><tr><th>Indicador</th>{comparacao.map(r=><th key={r.ticker}>{r.ticker}</th>)}<th>🏆</th></tr></thead>
              <tbody>
                {[
                  {label:"Preço ✓Real",  fn:r=>fmtBRL(r.preco),         best:r=>-r.preco},
                  {label:"Valor Justo",  fn:r=>fmtBRL(r.valorJusto),    best:r=>r.valorJusto||0},
                  {label:"Margem Seg.",  fn:r=>fmtPct(r.margemSeg),     best:r=>r.margemSeg||0},
                  {label:"Score IA",     fn:r=>r.analise.score_ia,       best:r=>r.analise.score_ia},
                  {label:"P/L",          fn:r=>fmtN(r.pL),              best:r=>-(r.pL||999)},
                  {label:"DY ✓Real",     fn:r=>fmtPct(r.dyPct),         best:r=>r.dyPct||0},
                  {label:"ROE",          fn:r=>fmtPct(r.fund.roe),       best:r=>r.fund.roe||0},
                  {label:"ROIC",         fn:r=>fmtPct(r.fund.roic),      best:r=>r.fund.roic||0},
                  {label:"Margem Líq.",  fn:r=>fmtPct(r.fund.margem_liquida), best:r=>r.fund.margem_liquida||0},
                  {label:"Dív/EBITDA",   fn:r=>fmtN(r.fund.divida_ebitda),   best:r=>-(r.fund.divida_ebitda||999)},
                ].map(({label,fn,best})=>{
                  const vals=comparacao.map(best);
                  const bi=vals.indexOf(Math.max(...vals));
                  return(
                    <tr key={label}>
                      <td style={{color:C.muted,fontWeight:600}}>{label}</td>
                      {comparacao.map((r,i)=><td key={i} className="mono" style={{color:i===bi?C.green:C.text,fontWeight:i===bi?700:400}}>{fn(r)}</td>)}
                      <td style={{color:C.green,fontWeight:700}}>{comparacao[bi]?.ticker}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );

  const renderHistorico=()=>(
    <>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div className="sec-hdr" style={{marginBottom:0}}>Histórico de Análises</div>
        {historico.length>0&&<button onClick={()=>setHistorico([])} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,borderRadius:6,padding:"6px 12px",cursor:"pointer",fontSize:12}}>Limpar</button>}
      </div>
      {historico.length===0?(
        <div className="empty-state"><div className="empty-icon">📋</div><h3>Nenhuma análise registrada</h3><p>As análises aparecerão aqui automaticamente.</p></div>
      ):(
        <div className="card" style={{overflowX:"auto"}}>
          <table className="hist-table">
            <thead><tr><th>Data/Hora</th><th>Ticker</th><th>Preço Real</th><th>Valor Justo</th><th>Score IA</th><th>Recomendação</th></tr></thead>
            <tbody>
              {historico.map((h,i)=>(
                <tr key={i}>
                  <td className="mono" style={{color:C.muted,fontSize:12}}>{h.data.toLocaleDateString("pt-BR")} {h.data.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</td>
                  <td className="mono" style={{fontWeight:700,color:C.accent}}>{h.ticker}</td>
                  <td className="mono">{fmtBRL(h.preco)}</td>
                  <td className="mono" style={{color:C.gold}}>{fmtBRL(h.valorJusto)}</td>
                  <td><span style={{color:scoreColor(h.score),fontWeight:700}}>{h.score}</span></td>
                  <td><RecBadge rec={h.rec}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );

  return(
    <>
      <style>{css}</style>
      <div className="shell">
        <header className="header">
          <div className="logo">
            <div className="logo-icon">📈</div>
            <div><div className="logo-text">Valuation B3</div><div className="logo-sub">Cotação Real · IA Analítica</div></div>
          </div>
          <div style={{fontSize:12,color:C.muted,textAlign:"right"}}><div>Powered by Claude AI</div><div style={{color:C.dim}}>Preço Real: Brapi · B3</div></div>
        </header>
        <div className="search-wrap">
          <input className="ticker-input" placeholder="TICKER" value={ticker}
            onChange={e=>setTicker(e.target.value.toUpperCase())}
            onKeyDown={e=>e.key==="Enter"&&analisar()} maxLength={6}/>
          <button className="btn" onClick={analisar} disabled={loading||!ticker.trim()}>
            {loading?"Analisando…":"Analisar"}
          </button>
        </div>
        <div className="tabs">
          {[{id:"analise",label:"📊 Análise"},{id:"comparacao",label:"⚖️ Comparação"},{id:"historico",label:"📋 Histórico"}].map(t=>(
            <button key={t.id} className={`tab ${aba===t.id?"active":""}`} onClick={()=>setAba(t.id)}>{t.label}</button>
          ))}
        </div>
        {aba==="analise"&&renderAnalise()}
        {aba==="comparacao"&&renderComparacao()}
        {aba==="historico"&&renderHistorico()}
      </div>
    </>
  );
}
