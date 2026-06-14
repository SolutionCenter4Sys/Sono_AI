# Roadmap — SleepScore Web Prototype

> Fases em ordem. Atualiza conforme entrega; nunca apaga histórico.

**Demo Day:** 19/06/2026
**Hoje:** 2026-06-11
**Janela útil:** 8 dias

---

## Fase 0 — Planejamento e governança
**Status:** ✅ Concluída · 2026-06-11

- [x] CLAUDE_CONTEXT.md
- [x] DECISIONS_LOG.md (ADR-001 a ADR-005)
- [x] ROADMAP.md (este arquivo)
- [x] BACKLOG.md (épicos, features, US)

---

## Fase 1 — Setup do projeto
**Status:** ⬜ Não iniciado
**Estimativa:** 2-3 horas

- [ ] `npm create vite@latest . -- --template react`
- [ ] Tailwind 3.4 + PostCSS + autoprefixer
- [ ] shadcn/ui (instalar utils + primitives: button, card, progress, separator)
- [ ] lucide-react, sonner, framer-motion, react-hook-form, zod
- [ ] ESLint config + script `lint`
- [ ] Inicialização do git + `.gitignore`
- [ ] README.md de boas-vindas

---

## Fase 2 — Design tokens e infraestrutura visual
**Status:** ⬜ Não iniciado
**Estimativa:** 3-4 horas

- [ ] `src/styles/globals.css` com HSL vars Dark + Light (mapeadas dos tokens Foursys)
- [ ] `tailwind.config.js` com `colors.marinhoDeep`, `colors.laranja`, etc., apontando para `hsl(var(--*))`
- [ ] Fonte Inter via `@fontsource/inter` (Regular, Medium, Semi Bold, Bold)
- [ ] `src/lib/theme.js` — `toggleTheme()`, `useTheme()` hook
- [ ] Página `/` mostrando swatches dos tokens (utilitário de dev, não vai pra demo)

---

## Fase 3 — Componentes primitivos
**Status:** ⬜ Não iniciado
**Estimativa:** 4-5 horas

- [ ] `PrimaryButton` (Laranja + shadow + ícone opcional)
- [ ] `RiskBadge` (4 variantes: Low, Moderate, High, Critical)
- [ ] `ScoreBar` (apneia Laranja, insônia Menta, animação)
- [ ] `ProgressRing` (donut SVG, animação contínua)
- [ ] `ErrorGlyph` (glow + ring + disc + char central, prop `severity`)
- [ ] `MoonIcon` / `StarsField` (SVG decorativos da Home)

---

## Fase 4 — Telas core do fluxo
**Status:** ⬜ Não iniciado
**Estimativa:** 8-10 horas

- [ ] `HomeScreen` (01)
- [ ] `LoadingScreen` (02) com ring animado + lista de fontes de dados
- [ ] `QuestionnaireScreen` (03) com rhf + zod + progress bar
- [ ] `ResultScreen` (04) com score counter animado + breakdown + recomendação + findings
- [ ] `ErrorScreen` (05) com 5 variantes (default + sdkOutdated + androidTooOld + permissionDenied + sessionNotFound)
- [ ] `SleepStateContext` + máquina de estados
- [ ] `mockRepository` retornando dados de apneia moderada
- [ ] `score.js` portando `ComputeDiagnosticScoreUseCase.kt`
- [ ] Toggle Dark/Light no canto da tela

---

## Fase 5 — Animações e polish
**Status:** ⬜ Não iniciado
**Estimativa:** 4-5 horas

- [ ] Transições entre UiStates (`AnimatePresence` + fade/slide)
- [ ] Score counter 0→N (500ms, EaseOutCubic) na Result
- [ ] ScoreBar animado 0→% (400ms, stagger 80ms)
- [ ] ProgressRing arc animado (250ms por step)
- [ ] OptionCard com transição de seleção (background lerp + radio scale)
- [ ] PrimaryButton press feedback (scale 1 → 0.97 → 1)
- [ ] Banner MODO DEMO entrando suave

---

## Fase 6 — Build, deploy e demo prep
**Status:** ⬜ Não iniciado
**Estimativa:** 2-3 horas

- [ ] `npm run build` validado
- [ ] Deploy no Vercel/Netlify (estático, qualquer um serve)
- [ ] QR code para acesso fácil no Demo Day
- [ ] Test em Chrome desktop + mobile (responsivo)
- [ ] Documentação rápida no README — como rodar local, como demonstrar
- [ ] Cenário ensaiado (fluxo Home → Loading → Questionnaire → Result em < 90s)

---

## Estimativa total

| Fase | Horas | Acumulado |
|---|---|---|
| 1. Setup | 2-3 | 3h |
| 2. Tokens | 3-4 | 7h |
| 3. Primitivos | 4-5 | 12h |
| 4. Telas | 8-10 | 22h |
| 5. Animações | 4-5 | 27h |
| 6. Demo prep | 2-3 | 30h |

Equivale a 4-5 dias úteis dedicados. Folga de 3 dias até 19/06.

---

## Backlog sem data

- Variantes Light de todas as 9 telas (atualmente Figma tem só 01L + 04L)
- Animação de transição Result → Home com card "rebobinar"
- Compartilhamento mock (PDF de findings + WhatsApp share)
- Histórico de noites (precisa de localStorage)
- i18n (en-US + es-ES) para apresentações internacionais
- Integração real com Health Connect (Web Bluetooth API exploratória)

---

## Ondas Figma (escopo expandido)

Novas frentes de produto descobertas após validação do Core Flow. Cada onda é **só Figma primeiro** — implementação React vem depois da validação visual.

### Onda 1 — Onboarding clínico + Pairing de wearable ✅
**Concluída:** 2026-06-11 · **Páginas Figma:** `02 Onboarding`, `03 Pairing`
- [x] WEB-EP-05 — 6 telas: Welcome, Consent LGPD, Perfil básico, Captura facial (instruções), Captura facial (câmera), Setup concluído
- [x] WEB-EP-06 — 6 telas: Seleção plataforma, Buscando, Encontrados, Pareando, Sucesso, Falha
- [x] ADRs 006-009 registradas (vide [DECISIONS_LOG](./DECISIONS_LOG.md))

### Onda 4 — Acompanhamento + Sleep Coins ✅
**Concluída:** 2026-06-11 · **Página Figma:** `08 Acompanhamento` (5 telas)
- [x] Sleep Coins (saldo + insight + 3 desafios + conquistas + CTA)
- [x] Challenge detail (com timeline horizontal de 7 dias)
- [x] Loja de recompensas (Em breve · 6 produtos lockados)
- [x] Histórico de noites (qualidade média + bar chart 30 dias + recordes)
- [x] Régua WhatsApp (timeline D+0/5/30/90 com previews)
- [x] ADRs 010 + 011 registradas

### Onda 2 — Sono AI (assistente) ✅
**Concluída:** 2026-06-11 · **Página Figma:** `04 Sono AI` (4 telas)
- [x] WEB-EP-07 — FAB flutuante (sobre Result), Chat bottom-sheet (peek 40%), Chat full screen com mini-chart, Mensagem com card de ação (insight da semana)

### Onda 3 — Polissonografia móvel ✅
**Concluída:** 2026-06-11 · **Página Figma:** `05 Polissonografia móvel` (7 telas)
- [x] WEB-EP-08 — Sugestão de exame, Confirmação envio, Tracking entrega, Equipamentos chegaram, Agendamento orientação, Videochamada em curso, Stream em tempo real durante o sono

### Onda 5 — Jornada clínica completa do paciente 🟨
**Início:** 2026-06-11 (em curso via workflow paralelo)
- [ ] WEB-EP-10 Triagem detalhada (Epworth · STOP-BANG · ISI · Pittsburgh + score consolidado) — 6 telas em `06 Triagem clínica`
- [ ] WEB-EP-11 Agenda de clínicas (mapa, filtros, detalhe clínica, calendar, confirmação WhatsApp) — 5 telas em `07 Agenda`
- [ ] WEB-EP-12 Exame presencial & Laudo (preparo, status agendado/realizado/IA/médica, diagnóstico, próximas ações) — 6 telas em `09 Exame & Laudo`

### Onda 6 — Portal Médico C2 (espelhado em Figma) 🟨
**Início:** 2026-06-11 (em curso via workflow paralelo)
- [ ] WEB-EP-13 — 5 telas web desktop 1440×900 em `10 Portal Médico`
  - Cadastro CRM/RQE/CNES com validação CFM
  - Triagem revisão de paciente + sugestão CID-10
  - Agenda médica semanal + Google Calendar
  - Laudo HITL + assinatura FHIR R4 (EDF + IA 94%)
  - Dashboard KPIs (funil pacientes, alertas, receita)
- [ ] [[ADR-011]] cobre o não-port para React

### Pós-validação Figma — Portabilidade React ✅ CONCLUÍDA (2026-06-12)
Workflow paralelo de 3 agentes portou as 55 telas Figma → React. Costura via react-router (ADR-012).
- [x] Refactor da fundação: react-router-dom v7 + PhoneShell + DesktopShell + DashboardHome (índice de telas)
- [x] Onboarding (6) + Pairing (6) + Sono AI (4) — agente A
- [x] Sleep Coins (5) + Polisso móvel (7) + Triagem (6) — agente B
- [x] Agenda (5) + Exame & Laudo (6) + Portal Médico desktop (5) — agente C
- [x] routes.jsx costurado (60 rotas), build OK, lint 0 warnings, navegação validada
- [ ] **Pendente:** revisão visual fina por tela (polish pixel-a-pixel) + microajustes de copy se necessário

---

## Histórico

<!-- Mova fases concluídas para cá com data + breve nota -->

### ✅ Fase 0 — Planejamento (2026-06-11)
Criadas CLAUDE_CONTEXT.md, DECISIONS_LOG.md, ROADMAP.md e BACKLOG.md. ADR-001 a ADR-005 registradas. 14 user stories distribuídas em 4 épicos.
