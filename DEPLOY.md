# 🚀 Deploy — Valuation B3 no Vercel

## Estrutura do projeto
```
valuation-b3/
├── api/
│   ├── analyze.js     ← proxy seguro → Anthropic (ANTHROPIC_API_KEY)
│   └── brapi.js       ← proxy seguro → Brapi     (BRAPI_TOKEN)
├── frontend/
│   ├── src/
│   │   ├── App.jsx    ← aplicação React com dados reais
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── vercel.json        ← configuração de build e rotas
└── .gitignore
```

---

## Passo 1 — Criar conta gratuita na Brapi

1. Acesse https://brapi.dev
2. Clique em **Entrar** → crie conta gratuita
3. No dashboard, copie seu **Token de API**

> O plano gratuito permite consultar qualquer ação da B3.
> Para fundamentalismo completo (DRE, balanço), o plano Basic (~R$ 30/mês) é recomendado.

---

## Passo 2 — Subir código no GitHub

1. Crie um repositório no https://github.com (pode ser privado)
2. Dentro da pasta `valuation-b3`, execute:

```bash
git init
git add .
git commit -m "Valuation B3 — versão inicial com dados reais"
git remote add origin https://github.com/SEU_USUARIO/valuation-b3.git
git push -u origin main
```

---

## Passo 3 — Deploy no Vercel

1. Acesse https://vercel.com e crie conta gratuita (pode usar a conta do GitHub)
2. Clique em **Add New → Project**
3. Selecione o repositório `valuation-b3`
4. Nas configurações de build, o Vercel detectará automaticamente o `vercel.json`
5. Clique em **Deploy**

---

## Passo 4 — Configurar variáveis de ambiente (OBRIGATÓRIO)

No painel do projeto no Vercel:
1. Vá em **Settings → Environment Variables**
2. Adicione as duas variáveis:

| Nome                | Valor                        |
|---------------------|------------------------------|
| `ANTHROPIC_API_KEY` | sk-ant-...sua chave aqui...  |
| `BRAPI_TOKEN`       | seu token da Brapi aqui      |

3. Clique em **Save** e depois **Redeploy**

> ⚠️ NUNCA coloque essas chaves no código fonte. Elas ficam seguras no servidor do Vercel.

---

## Passo 5 — Instalar no celular como PWA

1. Abra o link do seu app (ex: `valuation-b3.vercel.app`) no **Chrome** ou **Safari**
2. No Chrome Android: menu (⋮) → **Adicionar à tela inicial**
3. No Safari iOS: botão compartilhar → **Adicionar à Tela de Início**

O app abre como aplicativo nativo, sem barra de endereço! 📱

---

## Como funciona a arquitetura segura

```
Celular/Navegador
      │
      │  /api/brapi?ticker=PETR4
      ▼
Vercel Serverless (api/brapi.js)
      │  injeta BRAPI_TOKEN (seguro, invisível ao usuário)
      ▼
Brapi API → retorna dados reais da B3 + CVM
      │
      ▼
Vercel Serverless (api/analyze.js)
      │  injeta ANTHROPIC_API_KEY (seguro)
      ▼
Claude Sonnet → análise IA
      │
      ▼
App React → exibe resultado
```

---

## Atualizações futuras

Para atualizar o app após mudanças:
```bash
git add .
git commit -m "descrição da mudança"
git push
```
O Vercel faz novo deploy automaticamente em ~1 minuto.

---

## Suporte / Dúvidas

- Brapi: https://brapi.dev/docs
- Vercel: https://vercel.com/docs
- Anthropic: https://docs.anthropic.com
