import { useState, useCallback } from "react";

// ─── CORES ──────────────────────────────────────────────────────────────────
const C = {
  bg:"#0a0e17", surface:"#111827", card:"#151d2e", border:"#1e2d45",
  accent:"#00d4ff", accentDim:"#0099bb", gold:"#f0b429",
  green:"#22c55e", yellow:"#facc15", orange:"#f97316", red:"#ef4444",
  text:"#e2e8f0", muted:"#64748b", dim:"#334155",
};

// ─── CSS ────────────────────────────────────────────────────────────────────
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

// ─── UTILS ──────────────────────────────────────────────────────────────────
const fmtBRL = v => v==null?"—":`R$ ${Number(v).toFixed(2).replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g,".")}`;
const fmtPct = v => v==null?"—":`${Number(v).toFixed(1).replace(".",",")}%`;
const fmtN   = (v,d=2) => v==null?"—":Number(v).toFixed(d).replace(".",",");
const fmtM   = v => { // formata em milhões/bilhões
  if(v==null) return "—";
  const n=Number(v);
  if(Math.abs(n)>=1e9) return `R$ ${(n/1e9).toFixed(1).replace(".",",")}B`;
  if(Math.abs(n)>=1e6) return `R$ ${(n/1e6).toFixed(1).replace(".",",")}M`;
  return fmtBRL(n);
};
const safe = (v,fallback=null) => (v!=null&&!isNaN(v)&&isFinite(v))?v:fallback;
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
  if(!s) return C.muted;
  const l=s.toLowerCase();
  if(l.includes("excelente")||l.includes("ótimo")||l.includes("bom")||l.includes("segura")||l.includes("baixo risco")||l.includes("sem manipul")) return C.green;
  if(l.includes("moderado")||l.includes("cinza")||l.includes("neutro")) return C.yellow;
  if(l.includes("alto")||l.includes("fraco")||l.includes("risco")||l.includes("negativo")||l.includes("manipul")) return C.orange;
  return C.muted;
}

// ─── EXTRATOR DE DADOS BRAPI ────────────────────────────────────────────────
function extrairDados(r) {
  // r = results[0] da resposta Brapi
  const ks  = r.defaultKeyStatistics || {};
  const fd  = r.financialData        || {};
  const sp  = r.summaryProfile       || {};

  // Balanço mais recente
  const bs  = (r.balanceSheetHistory?.balanceSheetStatements || [])[0] || {};
  // DRE mais recente
  const is_ = (r.incomeStatementHistory?.incomeStatementHistory || [])[0] || {};
  // Fluxo de caixa mais recente
  const cf  = (r.cashflowHistory?.cashflowStatements || [])[0] || {};
  // Dividendos
  const divs = r.dividendsData?.cashDividends || [];

  const preco   = safe(r.regularMarketPrice);
  const shares  = safe(ks.sharesOutstanding) || safe(r.regularMarketVolume * 100);
  const mktCap  = safe(r.marketCap) || safe(ks.marketCap);
  const lpa     = safe(ks.trailingEps);
  const vpa     = safe(ks.bookValue);
  const beta    = safe(ks.beta);
  const roe     = safe(ks.returnOnEquity);   // decimal
  const roic    = safe(fd.returnOnCapital);  // decimal ou null
  const pl      = safe(ks.trailingPE) || (preco&&lpa&&lpa>0?preco/lpa:null);
  const pvp     = safe(ks.priceToBook) || (preco&&vpa&&vpa>0?preco/vpa:null);
  const dy_raw  = safe(ks.dividendYield); // decimal
  const ebitda  = safe(fd.ebitda);
  const receita = safe(fd.totalRevenue);
  const lucroLiq= safe(fd.netIncomeToCommon) || safe(is_.netIncome);
  const divLiq  = safe(fd.totalDebt) - safe(fd.totalCash) || null;
  const pl_     = safe(bs.totalStockholderEquity);
  const totalDeb= safe(fd.totalDebt);
  const freeCF  = safe(fd.freeCashflow);
  const opCF    = safe(fd.operatingCashflow);
  const grossP  = safe(fd.grossProfits);
  const revGrow = safe(fd.revenueGrowth); // decimal
  const epsGrow = safe(fd.earningsGrowth); // decimal

  // DPA estimado a partir do histórico de dividendos (últimos 12 meses)
  const um_ano = Date.now() - 365*24*3600*1000;
  const dpaReal = divs.length>0
    ? divs.filter(d=>new Date(d.paymentDate||d.lastDatePriorEx).getTime()>um_ano)
           .reduce((s,d)=>s+(d.rate||0),0)
    : null;
  const dpa = safe(dpaReal) || (dy_raw&&preco ? dy_raw*preco : null);

  // EV
  const ev = mktCap!=null&&totalDeb!=null ? mktCap + totalDeb - (safe(fd.totalCash)||0) : null;
  const ebit = safe(is_.ebit) || (ebitda?ebitda*0.75:null);

  // Margens
  const mLiq    = receita&&lucroLiq ? (lucroLiq/receita)*100 : safe(fd.profitMargins)*100;
  const mBruta  = receita&&grossP   ? (grossP/receita)*100   : null;
  const mEbitda = receita&&ebitda   ? (ebitda/receita)*100   : safe(fd.ebitdaMargins)*100;

  // Múltiplos derivados
  const evEbitda= ev&&ebitda&&ebitda>0 ? ev/ebitda : null;
  const evEbit  = ev&&ebit&&ebit>0     ? ev/ebit   : null;
  const divEbitda = ebitda&&ebitda>0&&totalDeb ? totalDeb/ebitda : null;

  // PEG
  const peg = pl&&epsGrow&&epsGrow>0 ? pl/(epsGrow*100) : null;

  // DY %
  const dyPct = dy_raw!=null ? dy_raw*100 : (dpa&&preco ? (dpa/preco)*100 : null);

  // ROE/ROIC em %
  const roePct  = roe!=null  ? roe*100  : null;
  const roicPct = roic!=null ? roic*100 : null;

  // Crescimento receita/lucro em %
  const creceitaPct = revGrow!=null ? revGrow*100 : null;
  const clucPct     = epsGrow!=null ? epsGrow*100 : null;

  // Cobertura de juros estimada
  const cobJuros = safe(fd.interestCoverage) || (ebit&&totalDeb&&totalDeb>0?(ebit/(totalDeb*0.1)):null);

  // Campos de texto
  const nome  = r.longName || r.shortName || r.symbol;
  const setor = sp.sector || r.sector || "—";
  const ticker= r.symbol;

  // WACC estimado (Selic ~10,5 + prêmio risco setorial)
  const wacc = 12.5;
  const g    = 4.0;

  return {
    ticker, nome, setor, preco,
    lpa, vpa, dpa, beta,
    mktCap, shares, ebitda, ebit, receita, lucroLiq,
    divLiq, pl_, totalDeb,
    freeCF, opCF,
    roe: roePct, roic: roicPct,
    mLiq, mBruta, mEbitda,
    dyPct, pl, pvp, evEbitda, evEbit, ev,
    divEbitda, cobJuros, peg,
    creceitaPct, clucPct,
    wacc, g,
    // flags de qualidade de dado
    _temFundamentos: !!(ks.trailingPE || fd.ebitda || bs.totalStockholderEquity),
    _temDividendos:  divs.length>0,
  };
}

// ─── CÁLCULO DE VALUATION ───────────────────────────────────────────────────
function calcularValuation(d) {
  const {preco,lpa,vpa,dpa,lucroLiq,shares,ebitda,divLiq,mktCap,wacc,g,ev,ebit} = d;

  // Graham: sqrt(22.5 * LPA * VPA) * 0.75 (margem conservadora)
  const graham = lpa>0&&vpa>0 ? Math.sqrt(22.5*lpa*vpa)*0.75 : null;

  // Bazin: DPA / 0.06
  const bazin = dpa&&dpa>0 ? dpa/0.06 : null;

  // Gordon DDM: DPA / (WACC% - g%)
  const gordRate = (wacc - g)/100;
  const gordon = dpa&&dpa>0&&gordRate>0.01 ? dpa/gordRate : null;

  // DCF simplificado com FCL real ou estimado
  const fclPorAcao = d.freeCF&&shares&&shares>0
    ? d.freeCF/shares
    : (lucroLiq&&shares&&shares>0 ? (lucroLiq*0.7)/shares : null);

  let dcf = null;
  if(fclPorAcao&&fclPorAcao>0){
    let dcfFCL=0;
    for(let i=1;i<=10;i++) dcfFCL+=(fclPorAcao*Math.pow(1+g/100,i))/Math.pow(1+wacc/100,i);
    const terminal=(fclPorAcao*Math.pow(1+g/100,10)*(1+g/100))/((wacc/100-g/100)*Math.pow(1+wacc/100,10));
    dcf=dcfFCL+terminal;
  }

  // EV/EBITDA (múltiplo justo setorial ~7x)
  const evEbitdaJusto = ebitda&&ebitda>0&&shares&&shares>0
    ? Math.max(0,(7*ebitda-(divLiq||0))/shares)
    : null;

  // EV/EBIT (múltiplo justo ~10x)
  const evEbitJusto = ebit&&ebit>0&&shares&&shares>0
    ? Math.max(0,(10*ebit-(divLiq||0))/shares)
    : null;

  // Valor justo ponderado (apenas modelos com resultado válido)
  const modelos = [
    graham       ? {nome:"Graham (adj.)",  v:graham,        w:2.0, real:!!(lpa&&vpa)} : null,
    bazin        ? {nome:"Bazin",          v:bazin,         w:1.5, real:!!(dpa)} : null,
    gordon       ? {nome:"Gordon DDM",     v:gordon,        w:1.5, real:!!(dpa)} : null,
    dcf          ? {nome:"DCF",            v:dcf,           w:3.0, real:!!(d.freeCF)} : null,
    evEbitdaJusto? {nome:"EV/EBITDA 7x",  v:evEbitdaJusto, w:2.0, real:!!(ebitda)} : null,
    evEbitJusto  ? {nome:"EV/EBIT 10x",   v:evEbitJusto,   w:1.5, real:!!(ebit)} : null,
  ].filter(Boolean);

  const totalW = modelos.reduce((s,m)=>s+m.w,0);
  const valorJusto = totalW>0 ? modelos.reduce((s,m)=>s+m.v*m.w,0)/totalW : preco;
  const margemSeg  = preco&&valorJusto ? ((valorJusto-preco)/valorJusto)*100 : null;

  return { modelos, valorJusto, margemSeg };
}

// ─── INDICADORES PARA EXIBIÇÃO ───────────────────────────────────────────────
function montarIndicadores(d, val) {
  const {pl,pvp,evEbitda,evEbit,dyPct,peg,roe,roic,mLiq,mEbitda,mBruta,divEbitda,cobJuros,creceitaPct,clucPct,beta} = d;
  const {margemSeg} = val;
  return {
    "P/L":           {val:pl,        sinal:pl?(pl<8?"Excelente":pl<15?"Bom":pl<25?"Moderado":"Alto"):null},
    "P/VP":          {val:pvp,       sinal:pvp?(pvp<1?"Excelente":pvp<2?"Bom":pvp<3?"Moderado":"Alto"):null},
    "EV/EBITDA":     {val:evEbitda,  sinal:evEbitda?(evEbitda<5?"Excelente":evEbitda<8?"Bom":evEbitda<12?"Moderado":"Alto"):null},
    "EV/EBIT":       {val:evEbit,    sinal:evEbit?(evEbit<7?"Excelente":evEbit<12?"Bom":"Moderado"):null},
    "DY":            {val:dyPct,     sinal:dyPct?(dyPct>8?"Excelente":dyPct>5?"Bom":dyPct>3?"Moderado":"Baixo"):null, unit:"%"},
    "ROE":           {val:roe,       sinal:roe!=null?(roe>20?"Excelente":roe>12?"Bom":roe>6?"Moderado":"Fraco"):null, unit:"%"},
    "ROIC":          {val:roic,      sinal:roic!=null?(roic>15?"Excelente":roic>10?"Bom":roic>5?"Moderado":"Fraco"):null, unit:"%"},
    "PEG":           {val:peg,       sinal:peg?(peg<1?"Excelente":peg<1.5?"Bom":peg<2?"Moderado":"Alto"):null},
    "Margem Líq.":   {val:mLiq,      sinal:mLiq!=null?(mLiq>20?"Excelente":mLiq>10?"Bom":mLiq>5?"Moderado":"Fraco"):null, unit:"%"},
    "Margem EBITDA": {val:mEbitda,   sinal:mEbitda!=null?(mEbitda>35?"Excelente":mEbitda>20?"Bom":mEbitda>10?"Moderado":"Fraco"):null, unit:"%"},
    "Margem Bruta":  {val:mBruta,    sinal:mBruta!=null?(mBruta>50?"Excelente":mBruta>30?"Bom":"Moderado"):null, unit:"%"},
    "Dív/EBITDA":    {val:divEbitda, sinal:divEbitda!=null?(divEbitda<1?"Excelente":divEbitda<2?"Bom":divEbitda<3.5?"Moderado":"Alto Risco"):null},
    "Cob. Juros":    {val:cobJuros,  sinal:cobJuros!=null?(cobJuros>5?"Excelente":cobJuros>2?"Moderado":"Alto Risco"):null},
    "Cresc. Receita":{val:creceitaPct,sinal:creceitaPct!=null?(creceitaPct>15?"Excelente":creceitaPct>8?"Bom":creceitaPct>0?"Moderado":"Negativo"):null, unit:"%"},
    "Cresc. Lucro":  {val:clucPct,   sinal:clucPct!=null?(clucPct>15?"Excelente":clucPct>8?"Bom":clucPct>0?"Moderado":"Negativo"):null, unit:"%"},
    "Beta":          {val:beta,      sinal:beta!=null?(beta<0.8?"Baixo Risco":beta<1.2?"Moderado":"Alto Risco"):null},
    "Margem Seg.":   {val:margemSeg, sinal:margemSeg!=null?(margemSeg>30?"Excelente":margemSeg>15?"Bom":margemSeg>0?"Moderado":"Acima do Justo"):null, unit:"%"},
  };
}

// ─── CHAMADAS DE API ─────────────────────────────────────────────────────────
async function fetchBrapi(ticker) {
  const res = await fetch(`/api/brapi?ticker=${encodeURIComponent(ticker)}`);
  const data = await res.json();
  if(!res.ok) throw new Error(data.error || "Erro ao buscar dados na Brapi");
  const r = data.results?.[0];
  if(!r) throw new Error(`Ticker "${ticker}" não encontrado na B3`);
  return r;
}

async function callAI(userPrompt, systemPrompt) {
  const res = await fetch("/api/analyze", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({system:systemPrompt, messages:[{role:"user",content:userPrompt}]}),
  });
  const data = await res.json();
  if(!res.ok) throw new Error(data.error||"Erro na API de IA");
  return data.content?.find(b=>b.type==="text")?.text||"";
}

// ─── MOTOR PRINCIPAL ─────────────────────────────────────────────────────────
async function analisarAcao(ticker, setStep) {
  setStep(1);
  const raw = await fetchBrapi(ticker.toUpperCase());

  setStep(2);
  const d = extrairDados(raw);

  setStep(3);
  const val = calcularValuation(d);
  const ind = montarIndicadores(d, val);

  setStep(4);
  // Monta resumo para a IA
  const resumo = [
    `Ticker: ${d.ticker} | Empresa: ${d.nome} | Setor: ${d.setor}`,
    `Preço atual: ${fmtBRL(d.preco)} | Valor Justo calculado: ${fmtBRL(val.valorJusto)} | Margem de segurança: ${fmtPct(val.margemSeg)}`,
    `Modelos: ${val.modelos.map(m=>`${m.nome}=${fmtBRL(m.v)}`).join(", ")}`,
    `P/L=${fmtN(d.pl)} | P/VP=${fmtN(d.pvp)} | EV/EBITDA=${fmtN(d.evEbitda)} | EV/EBIT=${fmtN(d.evEbit)}`,
    `DY=${fmtPct(d.dyPct)} | ROE=${fmtPct(d.roe)} | ROIC=${fmtPct(d.roic)} | PEG=${fmtN(d.peg)}`,
    `Margem Líq=${fmtPct(d.mLiq)} | Margem EBITDA=${fmtPct(d.mEbitda)} | Margem Bruta=${fmtPct(d.mBruta)}`,
    `Dív/EBITDA=${fmtN(d.divEbitda)} | Cob.Juros=${fmtN(d.cobJuros)} | Beta=${fmtN(d.beta)}`,
    `Cresc.Receita=${fmtPct(d.creceitaPct)} | Cresc.Lucro=${fmtPct(d.clucPct)}`,
    `EBITDA=${fmtM(d.ebitda)} | Receita=${fmtM(d.receita)} | Lucro Líq=${fmtM(d.lucroLiq)} | FCL=${fmtM(d.freeCF)}`,
  ].join("\n");

  const analiseRaw = await callAI(
    `Analise a ação com os dados reais abaixo e gere um JSON com a avaliação fundamentalista:

${resumo}

IMPORTANTE: Os dados acima são REAIS, coletados da API Brapi (B3 + CVM). Baseie toda a análise exclusivamente neles.
Valores "—" indicam dado não disponível para este ativo.

Retorne APENAS JSON puro (sem markdown):
{
  "score_ia": number (0-100),
  "nivel_confianca": "Alta" | "Média" | "Baixa",
  "recomendacao": "Compra Fortemente Favorável" | "Compra Favorável" | "Compra com Ressalvas" | "Manter" | "Aguardar Melhor Oportunidade" | "Desfavorável no Momento" | "Fortemente Desfavorável",
  "resumo_executivo": "string 2-3 frases objetivas sobre a situação atual",
  "pontos_positivos": ["string","string","string"],
  "pontos_atencao": ["string","string"],
  "principais_riscos": ["string","string"],
  "fundamentacao": "string 2-3 frases explicando a recomendação com base nos dados"
}`,
    `Você é um analista fundamentalista sênior especializado em ações da B3. 
Responda SEMPRE em JSON puro, sem markdown, sem texto fora do JSON.
Seja objetivo, use os números fornecidos e evite especulações além dos dados.`
  );

  let analise;
  try { analise = JSON.parse(analiseRaw.replace(/```json|```/g,"").trim()); }
  catch { throw new Error("Erro ao processar análise da IA. Tente novamente."); }

  setStep(5);
  return { d, ind, val, analise, raw, timestamp: new Date() };
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

function SourceBadge({real}){
  return real
    ? <span className="source-badge source-real">✓ Dado Real</span>
    : <span className="source-badge source-est">~ Estimado</span>;
}

// ─── APP ──────────────────────────────────────────────────────────────────────
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

  const STEPS=["Inicializando…","Buscando dados reais na Brapi (B3 + CVM)…","Extraindo fundamentos do balanço…","Calculando modelos de valuation…","IA analisando os indicadores…","Consolidando resultado…"];

  const analisar=useCallback(async()=>{
    if(!ticker.trim())return;
    setLoading(true);setErro("");setResultado(null);setStep(0);
    try{
      const res=await analisarAcao(ticker.trim(),setStep);
      setResultado(res);
      setHistorico(h=>[{
        data:res.timestamp, ticker:res.d.ticker, preco:res.d.preco,
        valorJusto:res.val.valorJusto, score:res.analise.score_ia, rec:res.analise.recomendacao,
        temFund:res.d._temFundamentos,
      },...h].slice(0,50));
      setAba("analise");
    }catch(e){setErro(e.message);}
    finally{setLoading(false);setStep(0);}
  },[ticker]);

  const compararAcoes=useCallback(async()=>{
    const list=tickers5.filter(t=>t.trim());
    if(list.length<2)return;
    setLoadingComp(true);setComparacao(null);setErro("");
    try{
      const resultados=await Promise.all(list.map(t=>analisarAcao(t.trim(),()=>{})));
      setComparacao(resultados);
    }catch(e){setErro(e.message);}
    finally{setLoadingComp(false);}
  },[tickers5]);

  // ── RENDER ANÁLISE ──────────────────────────────────────────────────────────
  const renderAnalise=()=>{
    if(loading) return(
      <div className="loading-wrap">
        <div className="spinner"/>
        <div className="loading-steps">
          {STEPS.map((s,i)=>(
            <div key={i} className={i<step?"done":i===step?"cur":""}>
              {i<step?"✓ ":i===step?"⟳ ":"  "}{s}
            </div>
          ))}
        </div>
        <div style={{fontSize:12,color:C.muted,marginTop:8}}>Dados reais via Brapi · CVM · B3</div>
      </div>
    );

    if(erro) return(
      <div className="empty-state">
        <div className="empty-icon">⚠️</div>
        <h3>Erro na análise</h3>
        <p style={{color:C.red,marginBottom:16}}>{erro}</p>
        <p style={{fontSize:13}}>Verifique se o ticker está correto e se a chave BRAPI_TOKEN está configurada no Vercel.</p>
      </div>
    );

    if(!resultado) return(
      <div className="empty-state">
        <div className="empty-icon">📊</div>
        <h3>Insira um ticker para começar</h3>
        <p>Ex.: PETR4, WEGE3, VALE3, ITUB4, POMO4, EGIE3</p>
        <p style={{marginTop:8,fontSize:12,color:C.dim}}>Dados reais da B3 via Brapi API</p>
      </div>
    );

    const {d,ind,val,analise}=resultado;
    const temFund = d._temFundamentos;

    return(
      <>
        {/* Aviso se faltar fundamentalismo */}
        {!temFund&&(
          <div className="alert-box">
            <span>⚠️</span>
            <div>
              <strong>Dados fundamentalistas limitados para {d.ticker}.</strong> Alguns indicadores podem estar indisponíveis ou estimados. O plano pago da Brapi disponibiliza dados completos de DRE e balanço patrimonial para todos os ativos.
            </div>
          </div>
        )}

        {/* Cabeçalho */}
        <div className="card" style={{marginBottom:20,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
              <span className="mono" style={{fontSize:24,fontWeight:700,color:C.accent}}>{d.ticker}</span>
              <span className="tag" style={{background:C.border,color:C.muted}}>{d.setor}</span>
              <span className="source-badge source-real">✓ Dados Reais · Brapi</span>
            </div>
            <div style={{fontSize:16,fontWeight:600}}>{d.nome}</div>
            {d.mktCap&&<div style={{fontSize:12,color:C.muted,marginTop:4}}>Market Cap: {fmtM(d.mktCap)}</div>}
          </div>
          <RecBadge rec={analise.recomendacao}/>
        </div>

        {/* KPIs principais */}
        <div className="grid3">
          <div className="metric-card">
            <div className="metric-label">Preço Atual <SourceBadge real={true}/></div>
            <div className="metric-value mono">{fmtBRL(d.preco)}</div>
            <div className="metric-sub">Beta: {fmtN(d.beta)||"—"} · LPA: {fmtBRL(d.lpa)}</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Valor Justo <SourceBadge real={temFund}/></div>
            <div className="metric-value mono" style={{color:C.gold}}>{fmtBRL(val.valorJusto)}</div>
            <div className="metric-sub">{val.modelos.length} modelos ponderados</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Margem de Segurança</div>
            <div className="metric-value mono" style={{color:val.margemSeg>15?C.green:val.margemSeg>0?C.yellow:C.red}}>
              {fmtPct(val.margemSeg)}
            </div>
            <div className="metric-sub">{val.margemSeg>0?"Desconto em relação ao justo":"Acima do valor justo"}</div>
          </div>
        </div>

        <div className="grid3">
          {/* Score */}
          <div className="metric-card" style={{textAlign:"center"}}>
            <div className="metric-label">Score IA</div>
            <ScoreRing score={analise.score_ia}/>
            <div style={{color:C.muted,fontSize:12}}>Confiança: <strong style={{color:C.text}}>{analise.nivel_confianca}</strong></div>
          </div>
          {/* DY + ROE */}
          <div className="metric-card">
            <div className="metric-label">Dividend Yield <SourceBadge real={d._temDividendos}/></div>
            <div className="metric-value mono" style={{color:C.gold}}>{fmtPct(d.dyPct)}</div>
            <div className="metric-sub">DPA estimado: {fmtBRL(d.dpa)}</div>
            <hr style={{border:"none",borderTop:`1px solid ${C.border}`,margin:"14px 0"}}/>
            <div className="metric-label">ROE / ROIC</div>
            <div style={{display:"flex",gap:16}}>
              <div><div className="mono" style={{fontSize:20,fontWeight:600,color:d.roe>15?C.green:C.yellow}}>{fmtPct(d.roe)}</div><div style={{fontSize:11,color:C.muted}}>ROE</div></div>
              <div><div className="mono" style={{fontSize:20,fontWeight:600,color:d.roic>12?C.green:C.yellow}}>{fmtPct(d.roic)}</div><div style={{fontSize:11,color:C.muted}}>ROIC</div></div>
            </div>
          </div>
          {/* Modelos */}
          <div className="metric-card">
            <div className="metric-label">Modelos de Valuation</div>
            {val.modelos.map(m=>(
              <div key={m.nome} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 0",borderBottom:`1px solid ${C.dim}`}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{fontSize:12,color:C.muted}}>{m.nome}</span>
                  <SourceBadge real={m.real}/>
                </div>
                <span className="mono" style={{fontSize:13,color:m.v>d.preco?C.green:C.red}}>{fmtBRL(m.v)}</span>
              </div>
            ))}
            {val.modelos.length===0&&<div style={{color:C.muted,fontSize:13}}>Dados insuficientes para valuation</div>}
          </div>
        </div>

        {/* IA */}
        <div className="ai-block"><h4>Resumo Executivo</h4><p>{analise.resumo_executivo}</p></div>
        <div className="grid2" style={{marginBottom:20}}>
          <div className="ai-block" style={{marginBottom:0}}><h4>✅ Pontos Positivos</h4><ul>{analise.pontos_positivos?.map((p,i)=><li key={i}>{p}</li>)}</ul></div>
          <div className="ai-block" style={{marginBottom:0}}><h4>⚠️ Pontos de Atenção</h4><ul>{analise.pontos_atencao?.map((p,i)=><li key={i}>{p}</li>)}</ul></div>
        </div>
        <div className="grid2">
          <div className="ai-block" style={{marginBottom:0}}><h4>🔴 Principais Riscos</h4><ul>{analise.principais_riscos?.map((p,i)=><li key={i}>{p}</li>)}</ul></div>
          <div className="ai-block" style={{marginBottom:0}}><h4>📌 Fundamentação</h4><p>{analise.fundamentacao}</p></div>
        </div>

        <hr className="divider"/>

        {/* Financeiros */}
        <div className="sec-hdr">Dados Financeiros Reais</div>
        <div className="grid3" style={{marginBottom:20}}>
          {[
            ["Receita (TTM)",   d.receita],
            ["EBITDA (TTM)",    d.ebitda],
            ["Lucro Líq. (TTM)",d.lucroLiq],
            ["FCL (TTM)",       d.freeCF],
            ["Dívida Total",    d.totalDeb],
            ["Patrim. Líquido", d.pl_],
          ].map(([k,v])=>(
            <div key={k} className="metric-card" style={{padding:"14px 18px"}}>
              <div className="metric-label">{k}</div>
              <div className="mono" style={{fontSize:18,fontWeight:600,color:v>=0?C.text:C.red}}>{fmtM(v)}</div>
            </div>
          ))}
        </div>

        {/* Indicadores completos */}
        <div className="sec-hdr">Todos os Indicadores</div>
        <div className="ind-grid">
          {Object.entries(ind).map(([k,v])=>(
            <Ind key={k} name={k} val={v.val} sinal={v.sinal} unit={v.unit||""}/>
          ))}
        </div>
      </>
    );
  };

  // ── RENDER COMPARAÇÃO ───────────────────────────────────────────────────────
  const renderComparacao=()=>(
    <>
      <div className="sec-hdr" style={{marginBottom:20}}>Comparação de Até 5 Ações — Dados Reais</div>
      <div className="compare-grid" style={{marginBottom:16}}>
        {tickers5.map((t,i)=>(
          <input key={i} className="compare-input" placeholder={`Ticker ${i+1}`} value={t}
            onChange={e=>{const n=[...tickers5];n[i]=e.target.value.toUpperCase();setTickers5(n);}} maxLength={6}/>
        ))}
      </div>
      <button className="btn" style={{marginBottom:28}} onClick={compararAcoes}
        disabled={loadingComp||tickers5.filter(t=>t.trim()).length<2}>
        {loadingComp?"Analisando…":"Comparar Ações"}
      </button>
      {erro&&<div style={{color:C.red,marginBottom:16,fontSize:13}}>⚠️ {erro}</div>}
      {loadingComp&&<div className="loading-wrap"><div className="spinner"/><div style={{color:C.muted,fontSize:13}}>Buscando dados reais em paralelo…</div></div>}
      {comparacao&&(
        <>
          <div className="sec-hdr">Ranking por Score IA</div>
          <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:28}}>
            {[...comparacao].sort((a,b)=>b.analise.score_ia-a.analise.score_ia).map((r,i)=>(
              <div key={r.d.ticker} className="card" style={{display:"flex",alignItems:"center",gap:16}}>
                <div style={{width:32,height:32,borderRadius:8,background:i===0?C.gold:C.border,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:i===0?"#000":C.muted,flexShrink:0}}>{i+1}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6,flexWrap:"wrap",gap:8}}>
                    <span className="mono" style={{fontWeight:700}}>{r.d.ticker}</span>
                    <span style={{fontSize:12,color:C.muted}}>{r.d.nome}</span>
                    <span style={{color:scoreColor(r.analise.score_ia),fontWeight:700}}>Score {r.analise.score_ia}</span>
                  </div>
                  <div className="prog-bar-wrap"><div className="prog-bar" style={{width:`${r.analise.score_ia}%`,background:scoreColor(r.analise.score_ia)}}/></div>
                </div>
                <RecBadge rec={r.analise.recomendacao}/>
              </div>
            ))}
          </div>
          <div className="sec-hdr">Comparativo de Indicadores</div>
          <div className="card" style={{overflowX:"auto"}}>
            <table className="hist-table">
              <thead><tr><th>Indicador</th>{comparacao.map(r=><th key={r.d.ticker}>{r.d.ticker}</th>)}<th>🏆 Melhor</th></tr></thead>
              <tbody>
                {[
                  {label:"Preço",       fn:r=>fmtBRL(r.d.preco),          best:r=>-r.d.preco},
                  {label:"Valor Justo", fn:r=>fmtBRL(r.val.valorJusto),   best:r=>r.val.valorJusto||0},
                  {label:"Margem Seg.", fn:r=>fmtPct(r.val.margemSeg),    best:r=>r.val.margemSeg||0},
                  {label:"Score IA",    fn:r=>r.analise.score_ia,          best:r=>r.analise.score_ia},
                  {label:"P/L",         fn:r=>fmtN(r.d.pl),               best:r=>-(r.d.pl||999)},
                  {label:"P/VP",        fn:r=>fmtN(r.d.pvp),              best:r=>-(r.d.pvp||999)},
                  {label:"DY",          fn:r=>fmtPct(r.d.dyPct),          best:r=>r.d.dyPct||0},
                  {label:"ROE",         fn:r=>fmtPct(r.d.roe),            best:r=>r.d.roe||0},
                  {label:"ROIC",        fn:r=>fmtPct(r.d.roic),           best:r=>r.d.roic||0},
                  {label:"Margem Líq.", fn:r=>fmtPct(r.d.mLiq),          best:r=>r.d.mLiq||0},
                  {label:"Dív/EBITDA",  fn:r=>fmtN(r.d.divEbitda),       best:r=>-(r.d.divEbitda||999)},
                  {label:"EV/EBITDA",   fn:r=>fmtN(r.d.evEbitda),        best:r=>-(r.d.evEbitda||999)},
                ].map(({label,fn,best})=>{
                  const vals=comparacao.map(best);
                  const bestIdx=vals.indexOf(Math.max(...vals));
                  return(
                    <tr key={label}>
                      <td style={{color:C.muted,fontWeight:600}}>{label}</td>
                      {comparacao.map((r,i)=><td key={i} className="mono" style={{color:i===bestIdx?C.green:C.text,fontWeight:i===bestIdx?700:400}}>{fn(r)}</td>)}
                      <td style={{color:C.green,fontWeight:700}}>{comparacao[bestIdx]?.d.ticker}</td>
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

  // ── RENDER HISTÓRICO ────────────────────────────────────────────────────────
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
            <thead><tr><th>Data/Hora</th><th>Ticker</th><th>Fonte</th><th>Preço</th><th>Valor Justo</th><th>Score IA</th><th>Recomendação</th></tr></thead>
            <tbody>
              {historico.map((h,i)=>(
                <tr key={i}>
                  <td className="mono" style={{color:C.muted,fontSize:12}}>{h.data.toLocaleDateString("pt-BR")} {h.data.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</td>
                  <td className="mono" style={{fontWeight:700,color:C.accent}}>{h.ticker}</td>
                  <td><SourceBadge real={h.temFund}/></td>
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
            <div><div className="logo-text">Valuation B3</div><div className="logo-sub">Dados Reais · IA Analítica</div></div>
          </div>
          <div style={{fontSize:12,color:C.muted,textAlign:"right"}}>
            <div>Powered by Claude AI</div>
            <div style={{color:C.dim}}>Dados: Brapi · CVM · B3</div>
          </div>
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

        {aba==="analise"    && renderAnalise()}
        {aba==="comparacao" && renderComparacao()}
        {aba==="historico"  && renderHistorico()}
      </div>
    </>
  );
}
