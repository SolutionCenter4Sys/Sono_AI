# Instituto do Sono — Protótipo navegável

> Clickable mockup (web) do app de triagem e diagnóstico de **apneia e insônia** do Instituto do Sono.
> PoC **CoCria 2026** · Foursys × Instituto do Sono (AFIP) · Demo Day **19/06/2026**.
>
> **Dados 100% mockados, sem backend** — todo o cálculo e estado é local. Selo `PROTÓTIPO` exibido na UI.

---

## Stack

- **React 19** + **Vite 6** (build / HMR)
- **Tailwind CSS 3.4** + primitives shadcn/ui · tokens de cor via CSS variables (tema Dark/Light)
- **react-router-dom v7** (navegação por rotas)
- **Framer Motion** (animações: contadores, barras de score, transições)
- **react-hook-form + zod** (questionários da triagem)
- **lucide-react** (ícones) · **@fontsource/inter** (tipografia)

## Como rodar

```bash
npm install
npm run dev       # servidor de desenvolvimento → http://localhost:5173
npm run build     # build de produção → dist/
npm run preview   # serve o build de produção localmente
npm run lint      # ESLint (meta: 0 warnings)
```

## Navegação

- **`/`** — Dashboard índice: todas as telas agrupadas por épico (uso de demo / QA).
- **`/inicio`** — Home do paciente (hub da jornada).
- Menu **🐛** (canto superior direito) pula entre telas a qualquer momento.
- Telas mobile rodam no `PhoneShell` (frame 412×917 + toggle de tema); o Portal Médico roda no `DesktopShell` (sidebar 240px).

## Épicos / fluxos (~64 telas)

Core Flow · Onboarding clínico · Pairing wearable · Sono AI · Sleep Coins · Triagem clínica · **Atendimento** · **Exame & Laudo** · Polissonografia móvel · Portal Médico (desktop).

### Fluxo Atendimento → Exame (ADR-019)

A **modalidade de atendimento é independente da modalidade de exame**. O kit domiciliar só é enviado quando o paciente, no fim do fluxo, escolhe "receber em casa":

```
Triagem → Atendimento (presencial Hospital · presencial Clínica · Teleconsulta)
   → Consulta agendada/realizada
   → Pré-diagnóstico (resumo dos achados — não é laudo)
   → Recomendação (médico + algoritmo)
   → Aprovação (assinatura médica + cobertura Convênio/Particular)
   → Confirmar exame: Instituto · Clínica parceira · Em casa (← só aqui envia o kit)
```

## Estrutura

```
src/
├── router/routes.jsx        # todas as rotas
├── layout/                  # PhoneShell, DesktopShell, ToastHost
├── components/
│   ├── ui/                  # primitives shadcn
│   └── primitives/          # PrimaryButton, ScoreBar, RiskBadge, ProgressRing…
├── screens/
│   ├── app/ onboarding/ pairing/ sono-ai/ coins/ triagem/
│   ├── agenda/ exame/ polisso-movel/
│   ├── medico/              # Portal Médico (desktop)
│   └── dashboard/           # índice de telas
├── lib/                     # utils, theme, demoToast
└── styles/globals.css       # HSL CSS vars (Dark + Light)
```

## Convenções

- **UI em pt-BR, código em inglês** (variáveis, componentes, comentários).
- **Sem hardcode de cor** — sempre tokens via CSS variables.
- **Conventional Commits** (`feat:`, `fix:`, `docs:`, `chore:`…).
- Sem backend / sem `fetch` nesta fase — tudo via mocks.

## Documentação do projeto

- [`docs/DECISIONS_LOG.md`](docs/DECISIONS_LOG.md) — ADRs (decisões de arquitetura).
- [`docs/BACKLOG.md`](docs/BACKLOG.md) — épicos, features e user stories.
- [`docs/ROADMAP.md`](docs/ROADMAP.md) — fases / ondas.
- [`docs/04_JOURNEY_MAP.md`](docs/04_JOURNEY_MAP.md) — mapa de jornadas (paciente / médico).
- [`docs/05_UX_AUDIT.md`](docs/05_UX_AUDIT.md) — auditoria de UX.

## Design (Figma)

Arquivo único `Screens`: https://www.figma.com/design/CIqvmuUT9VJlv6RRlPjZTk

---

Powered by **Foursys** · CoCria 2026 (AFIP / Instituto do Sono)
