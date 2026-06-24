# Journey Map — Arquitetura espelhada Instituto do Sono

> Mapa único da arquitetura completa: 5 funcionalidades × 2 personas (Paciente / Médico) + camada wearable diária.
> Versão 1.1 · 2026-06-11 · atualizado 2026-06-24 (feedback clínico Dr. Gustavo — ver changelog no fim)

## Origem

O time clínico do Instituto do Sono construiu um mapa estratégico de jornadas em arquivo Figma separado: [Instituto do Sono — Protótipo Jornada Paciente & Médico](https://www.figma.com/design/SZlxqB11Rge8wzJqTrvkPK).

Ele define **5 funcionalidades** ao longo da jornada de cuidado, cada uma com sub-jornadas para Paciente e Médico Prescritor, e identifica os pontos de cruzamento entre elas.

**Nosso protótipo Sono AI** complementa essa estrutura adicionando uma **camada de wearable diário** (app mobile do paciente que analisa cada noite). A captação é **agnóstica ao dispositivo** (anel, relógio, faixa de cabeça, pulseira, oxímetro); para estimar indícios de apneia, o wearable precisa medir **FC e/ou oximetria (SpO₂)**. Ele alimenta o pipeline clínico e fecha o ciclo de aderência via Sleep Score.

## A grande figura

```
┌───────────────────────────────────────────────────────────────────────────┐
│              CAMADA WEARABLE DIÁRIA (app mobile do paciente)              │
│  Home → Loading (lê watch) → Questionnaire → Result → Sono AI assistente  │
│                              ↓ (se há indício)                            │
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
| P-01 | 🚀 Onboarding | Primeiro acesso · Consent LGPD · Perfil de saúde · Captura facial **frontal + perfil** (mandíbula/retrognatia, nariz, pescoço · **sinal complementar, nunca base única**) · link "Como funciona?" → Metodologia | WEB-EP-05 | ✅ Figma 1ª onda | `02 Onboarding` (6 telas) |
| P-W | (Camada wearable) | Parear Galaxy/Apple Watch | WEB-EP-06 | ✅ Figma 1ª onda | `03 Pairing` (6 telas) |
| P-W | (Camada wearable) | Analisar última noite (Home → Result) | WEB-EP-03 | ✅ React implementado | `Screens` (Core Flow) |
| P-AI | (Camada wearable) | Assistente "Sono AI · Chat" flutuante (componente interno do app Sono AI) | WEB-EP-07 | ✅ Figma pronto | `04 Sono AI` (4 telas) |
| P-02 | 📋 Triagem (direcionada) | Queixa principal **multi-seleção** → triagem **direcionada** (subconjunto de Epworth · STOP-BANG · ISI · Pittsburgh, conforme queixa) · Score consolidado só dos aplicados · **referências** + selo "**em validação clínica**" | WEB-EP-10 | 🟨 Onda 5 em curso | `06 Triagem clínica` |
| P-03 | 📅 Atendimento | Consulta: presencial Hospital/Clínica · Teleconsulta (modalidade ≠ exame) | WEB-EP-11 | ✅ React implementado | `07 Agenda` |
| P-04 | 🛌 Exame & Laudo | **Pós-consulta:** Pré-diagnóstico → Recomendação (**polissonografia tipo III · portátil**) → Aprovação → Confirmar exame (kit só em "casa", com **vídeo de orientação + preparo guiado — não desmontar o kit**) · Preparo · Pipeline IA · Diagnóstico (ADR-019) | WEB-EP-08 + 12 | ✅ Fluxo pós-consulta em React · Móvel pronto | `05 Polissonografia móvel` (7) + `09 Exame & Laudo` |
| P-05 | 📊 Acompanhamento | **Sleep Score** (higiene do sono · **ativado pelo médico** · **sem ranking** · comparativo ilustrativo) · Régua WhatsApp · CPAP material · Histórico | WEB-EP-09 | ✅ React implementado | `08 Acompanhamento` |
| P-MET | ℹ️ Metodologia | "Como funciona": triagem ≠ diagnóstico · validação clínica · requisito do wearable (FC/oximetria) · papel auxiliar da análise facial · referências | WEB-EP-09 | ✅ React implementado | (transversal) |

### 🩺 Jornada do Médico (Portal Prescritor C2)

| # | Funcionalidade Instituto | Sub-jornada médico | Nosso épico | Status | Página Figma |
|---|---|---|---|---|---|
| M-01 | 🚀 Onboarding | Cadastro CRM/RQE/CNES · Upload docs · Validação CFM · Agenda+convênios | WEB-EP-13 | 🟨 Onda 6 em curso | `10 Portal Médico` |
| M-02 | 📋 Triagem | Recebe score paciente · Revisa · Sugere CID-10 · Justificativa clínica | WEB-EP-13 | 🟨 Onda 6 em curso | `10 Portal Médico` |
| M-03 | 📅 Agenda | Configura slots · Google Calendar · Convênios · Notificações | WEB-EP-13 | 🟨 Onda 6 em curso | `10 Portal Médico` |
| M-04 | 🛌 Exame & Laudo | EDF bruto · IA staging 94% · HITL validation · Assina laudo FHIR R4 | WEB-EP-13 | 🟨 Onda 6 em curso | `10 Portal Médico` |
| M-05 | 📊 Acompanhamento | Dashboard KPIs · Laudos pendentes · Follow-up CPAP · Orientações | WEB-EP-13 | 🟨 Onda 6 em curso | `10 Portal Médico` |

### 🔗 Pontos de cruzamento (Cross-link)

Identificados no mapa Instituto. Cada um conecta uma sub-jornada paciente a uma médica:

| Cross | Conexão |
|---|---|
| X-01 | Onboarding paciente/médico independentes — sem interação direta |
| X-02 | Score do paciente (P-02) → médico decide encaminhar (M-02) — *formato do encaminhamento (circunstâncias/especialidade/médicos) a amadurecer, feedback Dr. Gustavo* |
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
2. **Onda 2** — WEB-EP-07 Sono AI · Chat (FAB universal + chat — componente do app Sono AI)
3. **Onda 3** — WEB-EP-08 Polissonografia móvel (kit em casa)
4. **Onda 4 (em curso)** — WEB-EP-09 Acompanhamento + Sleep Coins (gamificação)
5. **Onda 5** — WEB-EP-10 Triagem clínica + WEB-EP-11 Agenda + WEB-EP-12 Exame presencial (jornada paciente completa)
6. **Onda 6** — WEB-EP-13 Portal Médico (jornada institucional)

Ordem sugerida (sequencial mas adaptável):
**Onda 1 → 4 → 5 → 2 → 3 → 6**

A Onda 4 (Sleep Coins) vem cedo porque é o conector entre Result do app diário e Acompanhamento clínico — fecha o loop de valor sem precisar do fluxo clínico completo implementado.

## Atualizações 2026-06-24 — feedback clínico (Dr. Gustavo) refletido nas jornadas

As mudanças desta rodada são em **telas compartilhadas**, então aparecem automaticamente ao percorrer qualquer jornada que passe por elas (casos de uso em `DashboardHome` · personas João/Maria/Carlos/Ana/Roberto/Marcela). Resumo do que cada jornada agora mostra:

- **Triagem direcionada por queixa** (P-02): a queixa principal é **multi-seleção**; a triagem aplica só o subconjunto relevante de instrumentos (ronco → STOP-BANG/Epworth; insônia/latência → ISI/Pittsburgh; etc.) e o score consolidado mostra só os aplicados. Reflete na jornada do **João**.
- **Polissonografia tipo III (portátil)** (P-04): termo clínico na Recomendação; a jornada reforça **vídeo de orientação + preparo guiado** e "**não desmontar o kit**" (reduz perda de exame). Reflete na jornada da **Maria**.
- **Credibilidade científica**: **referências** nos dados numéricos (Result, Pré-diagnóstico, Triagem, Sleep Score) + selo **"em validação clínica"**.
- **Captura facial** (P-01): **frontal + perfil**; marcadores anatômicos (mandíbula/retrognatia, nariz, circunferência do pescoço) como **sinal complementar — nunca base única**.
- **Wearable agnóstico**: anel/relógio/faixa/pulseira/oxímetro; para indícios de apneia o aparelho precisa medir **FC e/ou oximetria (SpO₂)**.
- **Nova tela "Como funciona / Metodologia"** (`/metodologia`, linha P-MET): triagem ≠ diagnóstico, validação clínica, requisito do wearable e papel auxiliar da análise facial — acessível pelo "Como funciona?" da captura facial e como waypoint na jornada do João.
- **Público geral**: framing de **envelhecimento saudável + cuidado integrado** (sono · dieta · exercício) — sem nichar em idoso/atleta.

**Adiado** (Dr. Gustavo): amadurecer o **formato do encaminhamento médico** (circunstâncias, especialidade, quais médicos) — ver cross X-02.

**Pendente de refresh** (fora desta rodada): `SonoAI_12CasosDeUso.pptx` usa screenshots de 17/06 (telas antigas) — recapturar e regerar quando fizer sentido.

> Correções de saneamento aplicadas junto: removidas referências a "ranking" e a "risco alto" no app do paciente, alinhando ao posicionamento de triagem assistida (Sleep Score sem ranking, ativado pelo médico).
