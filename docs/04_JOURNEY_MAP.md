# Journey Map — Arquitetura espelhada Instituto do Sono

> Mapa único da arquitetura completa: 5 funcionalidades × 2 personas (Paciente / Médico) + camada wearable diária.
> Versão 1.0 · 2026-06-11

## Origem

O time clínico do Instituto do Sono construiu um mapa estratégico de jornadas em arquivo Figma separado: [Instituto do Sono — Protótipo Jornada Paciente & Médico](https://www.figma.com/design/SZlxqB11Rge8wzJqTrvkPK).

Ele define **5 funcionalidades** ao longo da jornada de cuidado, cada uma com sub-jornadas para Paciente e Médico Prescritor, e identifica os pontos de cruzamento entre elas.

**Nosso protótipo SleepScore** complementa essa estrutura adicionando uma **camada de wearable diário** (app mobile do paciente que analisa cada noite via Galaxy Watch / Apple Watch). Ele alimenta o pipeline clínico e fecha o ciclo de aderência via Sleep Coins.

## A grande figura

```
┌───────────────────────────────────────────────────────────────────────────┐
│              CAMADA WEARABLE DIÁRIA (app mobile do paciente)              │
│  Home → Loading (lê watch) → Questionnaire → Result → Sono AI assistente  │
│                              ↓ (se risco alto)                            │
└───────────────────────────────────────────────────────────────────────────┘
                              ↓ aciona
┌───────────────────────────────────────────────────────────────────────────┐
│                CAMADA CLÍNICA INSTITUCIONAL (5 funcionalidades)            │
│   01 Onboarding → 02 Triagem → 03 Agenda → 04 Exame & Laudo → 05 Acompanh │
│   ┌─────────────────────────────────────────────────────────────────────┐ │
│   │ Paciente: jornada digital                                            │ │
│   │ Médico:   portal C2 prescritor                                       │ │
│   └─────────────────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────────────┘
```

## Matriz de progresso

Cada célula mapeia para o épico do `BACKLOG.md` e para a página Figma correspondente.

### 🟠 Jornada do Paciente

| # | Funcionalidade Instituto | Sub-jornada paciente | Nosso épico | Status | Página Figma |
|---|---|---|---|---|---|
| P-01 | 🚀 Onboarding | Primeiro acesso · Consent LGPD · Perfil de saúde · Captura facial | WEB-EP-05 | ✅ Figma 1ª onda | `02 Onboarding` (6 telas) |
| P-W | (Camada wearable) | Parear Galaxy/Apple Watch | WEB-EP-06 | ✅ Figma 1ª onda | `03 Pairing` (6 telas) |
| P-W | (Camada wearable) | Analisar última noite (Home → Result) | WEB-EP-03 | ✅ React implementado | `Screens` (Core Flow) |
| P-AI | (Camada wearable) | Assistente Sono AI flutuante | WEB-EP-07 | ✅ Figma pronto | `04 Sono AI` (4 telas) |
| P-02 | 📋 Triagem & Risco | Epworth · STOP-BANG · ISI · Pittsburgh · Score | WEB-EP-10 | 🟨 Onda 5 em curso | `06 Triagem clínica` |
| P-03 | 📅 Atendimento | Consulta: presencial Hospital/Clínica · Teleconsulta (modalidade ≠ exame) | WEB-EP-11 | ✅ React implementado | `07 Agenda` |
| P-04 | 🛌 Exame & Laudo | **Pós-consulta:** Pré-diagnóstico → Recomendação → Aprovação → Confirmar exame (kit só em "casa") · depois Preparo · Pipeline IA · Diagnóstico (ADR-019) | WEB-EP-08 + 12 | ✅ Fluxo pós-consulta em React · Móvel pronto | `05 Polissonografia móvel` (7) + `09 Exame & Laudo` |
| P-05 | 📊 Acompanhamento | **Sleep Score ⭐** (pontos · níveis · ranking, sem loja — ADR-020) · Régua WhatsApp · CPAP material · Histórico | WEB-EP-09 | ✅ React implementado | `08 Acompanhamento` |

### 🩺 Jornada do Médico (Portal Prescritor C2)

| # | Funcionalidade Instituto | Sub-jornada médico | Nosso épico | Status | Página Figma |
|---|---|---|---|---|---|
| M-01 | 🚀 Onboarding | Cadastro CRM/RQE/CNES · Upload docs · Validação CFM · Agenda+convênios | WEB-EP-13 | 🟨 Onda 6 em curso | `10 Portal Médico` |
| M-02 | 📋 Triagem & Risco | Recebe score paciente · Revisa · Sugere CID-10 · Justificativa clínica | WEB-EP-13 | 🟨 Onda 6 em curso | `10 Portal Médico` |
| M-03 | 📅 Agenda | Configura slots · Google Calendar · Convênios · Notificações | WEB-EP-13 | 🟨 Onda 6 em curso | `10 Portal Médico` |
| M-04 | 🛌 Exame & Laudo | EDF bruto · IA staging 94% · HITL validation · Assina laudo FHIR R4 | WEB-EP-13 | 🟨 Onda 6 em curso | `10 Portal Médico` |
| M-05 | 📊 Acompanhamento | Dashboard KPIs · Laudos pendentes · Follow-up CPAP · Orientações | WEB-EP-13 | 🟨 Onda 6 em curso | `10 Portal Médico` |

### 🔗 Pontos de cruzamento (Cross-link)

Identificados no mapa Instituto. Cada um conecta uma sub-jornada paciente a uma médica:

| Cross | Conexão |
|---|---|
| X-01 | Onboarding paciente/médico independentes — sem interação direta |
| X-02 | Score do paciente (P-02) → médico decide encaminhar (M-02) |
| X-03 | Reserva paciente (P-03) bloqueia slot real-time no médico (M-03) |
| X-04 | Laudo médico assinado (M-04) → libera resultado para paciente (P-04) |
| X-05 | Aderência paciente ao tratamento (P-05) visível no dashboard médico (M-05) — onde **Sleep Coins** se torna métrica clínica de engajamento |

## Status visual do arquivo Figma

| Página | Frames | Status | Épico |
|---|---|---|---|
| `Screens` | 9 (5 core + 4 errors) + 2 Light | ✅ Implementado em React | WEB-EP-03 |
| `02 Onboarding` | 6 | ✅ Figma pronto | WEB-EP-05 |
| `03 Pairing` | 6 | ✅ Figma pronto | WEB-EP-06 |
| `08 Acompanhamento` | 5 | ✅ Pronto | WEB-EP-09 |
| `04 Sono AI` | 4 | ✅ Pronto | WEB-EP-07 |
| `05 Polissonografia móvel` | 7 | ✅ Pronto | WEB-EP-08 |
| `06 Triagem clínica` | 6 | 🟨 Onda 5 em curso | WEB-EP-10 |
| `07 Agenda` | 5 | 🟨 Onda 5 em curso | WEB-EP-11 |
| `09 Exame & Laudo` | 6 | 🟨 Onda 5 em curso | WEB-EP-12 |
| `10 Portal Médico` | 5 (web desktop) | 🟨 Onda 6 em curso | WEB-EP-13 |

## Ondas de execução

1. **Onda 1** (concluída) — WEB-EP-05 Onboarding + WEB-EP-06 Pairing
2. **Onda 2** — WEB-EP-07 Sono AI (FAB universal + chat)
3. **Onda 3** — WEB-EP-08 Polissonografia móvel (kit em casa)
4. **Onda 4 (em curso)** — WEB-EP-09 Acompanhamento + Sleep Coins (gamificação)
5. **Onda 5** — WEB-EP-10 Triagem clínica + WEB-EP-11 Agenda + WEB-EP-12 Exame presencial (jornada paciente completa)
6. **Onda 6** — WEB-EP-13 Portal Médico (jornada institucional)

Ordem sugerida (sequencial mas adaptável):
**Onda 1 → 4 → 5 → 2 → 3 → 6**

A Onda 4 (Sleep Coins) vem cedo porque é o conector entre Result do app diário e Acompanhamento clínico — fecha o loop de valor sem precisar do fluxo clínico completo implementado.
