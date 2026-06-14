# Decisions Log (ADRs) — SleepScore Web Prototype

> Registro de decisões arquiteturais relevantes. Formato: ADR simplificado.
> Numeração sequencial. Nunca delete um ADR — marque `Status: Substituído por ADR-XXX`.

---

## ADR-001 — Frontend: React 19 + Vite 8
**Data:** 2026-06-11
**Status:** Aceito

**Contexto:** Protótipo precisa ser entregue em < 10 dias para Demo Day (19/06/2026). Time tem familiaridade com React. Alternativas (Vue, Svelte, Solid) custariam learning curve sem ganho proporcional para uma PoC visual.

**Decisão:** React 19 + Vite 8 + JSX puro (sem TypeScript no protótipo).

**Consequências:**
- (+) Bundle e HMR rápidos — feedback imediato no desenvolvimento visual
- (+) Ecossistema amplo (shadcn, lucide, framer-motion)
- (+) Reaproveita conhecimento da equipe
- (−) Migrar para TypeScript depois custa algumas horas de refator
- (−) JSX sem tipos = mais cuidado com props em components reutilizáveis

**Alternativas consideradas:**
- **Next.js** — rejeitado: SSR/routing são overkill para 5 telas state-driven
- **Vue 3** — rejeitado: equipe sem familiaridade, sem ganho visual
- **TypeScript desde já** — rejeitado: setup time alto vs. payoff em PoC de 5 telas

---

## ADR-002 — Dados 100% mockados (sem backend)
**Data:** 2026-06-11
**Status:** Aceito

**Contexto:** O Demo Day é validação visual do conceito. Backend (Node + Postgres + Health Connect proxy) adiciona 2-3 semanas e não contribui para a história a ser contada. O app Android já tem `MockSleepRepository` espelhando dados de apneia moderada.

**Decisão:** Toda fonte de dados vem de `src/data/mockRepository.js`, com a mesma interface conceitual do `SleepRepository` Android. Sem fetch, sem env vars, sem CORS para configurar.

**Consequências:**
- (+) Zero infraestrutura para o Demo Day
- (+) Demo offline (importante em ambiente de evento com Wi-Fi instável)
- (+) Quando virar produto real, o repository vira um drop-in com fetch — interface preservada
- (−) Não valida latência real / loading states genuínos (simulado com `setTimeout`)
- (−) Não exercita autenticação, permissões, multi-tenancy

**Alternativas consideradas:**
- **MSW (Mock Service Worker)** — rejeitado: overhead para 1 endpoint mock
- **JSON estático em `public/`** — rejeitado: precisamos simular latência e variantes (success/error)

---

## ADR-003 — Tailwind 3.4 + shadcn/ui + HSL CSS variables
**Data:** 2026-06-11
**Status:** Aceito

**Contexto:** Os tokens do design system já existem como Figma Variables com 2 modos (Dark/Light). Precisamos refletir isso no código sem CSS-in-JS pesado.

**Decisão:** Tailwind 3.4 sem prefix (greenfield, sem legacy CSS para coexistir) + shadcn/ui copy-paste em `src/components/ui/`. Toda cor vira HSL CSS variable em `:root` (Dark) e `[data-theme="light"]` (Light).

**Consequências:**
- (+) Troca de tema = troca de classe no `<html>`, zero JS adicional
- (+) shadcn componentes não viram dependência runtime — código é nosso
- (+) Mapping 1:1 com tokens do Figma
- (−) Manter sincronia manual entre Figma Variables e CSS vars (script automatizado fica para v2)

**Tokens base:**
```css
:root {
  --marinho-deep: 240 33% 12%;
  --laranja: 17 100% 54%;
  --baunilha: 38 100% 83%;
  --menta: 167 24% 63%;
  /* ... */
}
[data-theme="light"] {
  --marinho-deep: 42 26% 95%;
  --laranja: 16 100% 45%;
  /* ... */
}
```

---

## ADR-004 — Estado via React Context (sem Redux/Zustand)
**Data:** 2026-06-11
**Status:** Aceito

**Contexto:** O domínio tem **uma** máquina de estado central (`UiState`) e **um** estado de tema. Redux/Zustand resolvem problemas que não temos (time travel, devtools complexos, atomicidade entre stores).

**Decisão:** `SleepStateContext` único provendo `uiState`, `session`, `score`, `questionnaire`, e as transições (`startAnalysis`, `submitQuestionnaire`, `reset`, etc.).

**Consequências:**
- (+) Zero dependência adicional
- (+) Fácil de raciocinar — uma `function transition(state, event)` reproduz o `MainViewModel.kt`
- (+) Hot reload preserva estado durante design tweaks
- (−) Re-renders mais largos se o contexto crescer demais — solução: split em 2 contexts (data + actions) se a dor aparecer

---

## ADR-005 — Roteamento por UiState (sem react-router)
**Data:** 2026-06-11
**Status:** Aceito

**Contexto:** No Android, a navegação é decidida por `when (uiState) → Screen()` no `App.kt`. Não usamos NavController. Replicar isso em web mantém paridade conceitual e elimina dor de back-button vs. máquina de estados.

**Decisão:** `App.jsx` faz `switch (uiState)` e renderiza a tela apropriada. Animações de transição via `AnimatePresence` do framer-motion.

**Consequências:**
- (+) Paridade 1:1 com o Android — uma sessão lendo este código entende o Kotlin imediatamente
- (+) Sem URLs / deep linking para gerenciar (irrelevante para Demo Day)
- (+) Voltar = `transition('reset')`, não `navigate(-1)` — mais previsível
- (−) Sem URLs compartilháveis (ex.: link direto para Result) — fora de escopo na PoC
- (−) Se virar produto real com SEO/PWA, vai precisar adicionar router depois (refactor pequeno)

**Alternativas consideradas:**
- **react-router-dom 6** — rejeitado: 5 telas state-driven, URLs não agregam valor agora
- **TanStack Router** — rejeitado: mesma razão + curva de aprendizado

---

## ADR-006 — Onboarding obrigatório antes do fluxo principal
**Data:** 2026-06-11
**Status:** Aceito

**Contexto:** O escopo do produto cresceu — agora o app precisa coletar consentimento LGPD, perfil clínico básico e uma baseline facial **antes** de chegar na Home. O fluxo atual (Idle → Loading → Result) assume que isso já foi feito. Sem onboarding obrigatório, dados ficam inconsistentes e o algoritmo de score perde precisão.

**Decisão:** Adicionar onboarding em 6 telas (Welcome → Consent → Perfil → Captura facial em 2 telas → Resumo) que precede o fluxo principal. Estado `onboarded` (boolean) é persistido em `localStorage` na PoC e o usuário só vê Onboarding na primeira execução.

**Consequências:**
- (+) Algoritmo recebe contexto pré-cadastrado (idade, sexo, marcadores faciais)
- (+) Consentimento LGPD vira pré-condição estrutural, não opcional
- (+) Onboarding completo aumenta perceived value antes do primeiro Loading
- (−) Mais 6 telas Figma + ~3 telas a portar para React no futuro
- (−) "Retornar ao Onboarding" não está no escopo da PoC (precisa de tela de Settings)

---

## ADR-007 — Captura facial: imagem não persistida, apenas marcadores derivados
**Data:** 2026-06-11
**Status:** Aceito

**Contexto:** A captura facial visa extrair marcadores clínicos (proporções, índices) que ajudam o algoritmo de score. Mas armazenar fotos do rosto cria alto risco LGPD: dados sensíveis, biometria, vazamento causa dano irreversível.

**Decisão:** A imagem capturada **nunca** é armazenada — nem local nem remoto. Processamento gera apenas vetor de marcadores numéricos (anonimizados) que vai para o perfil clínico. Tela de consentimento (WEB-EP-05-FT-01-US-02) comunica explicitamente esse contrato.

**Consequências:**
- (+) Conformidade LGPD por design — não temos o dado, não temos o risco
- (+) Mensagem clara de privacidade vira diferencial competitivo
- (+) Marcadores anonimizados podem ser compartilhados para ML treinado sem PII
- (−) Não dá pra "rever" a captura ou retreinar com dados antigos — usuário tem que recapturar
- (−) Algoritmo de derivação dos marcadores precisa ser determinístico (mesma foto → mesmos marcadores)

---

## ADR-008 — Sono AI mockado na PoC (sem LLM real)
**Data:** 2026-06-11
**Status:** Aceito

**Contexto:** A nova feature "Sono AI" — assistente flutuante que responde dúvidas e dá insights baseados nos dados do paciente — exige integração com LLM (Claude/GPT) ou modelo treinado. No escopo Demo Day, integrar real-time custa dias e expõe risco de latência/falha durante a apresentação.

**Decisão:** Sono AI na PoC tem respostas **scriptadas** baseadas em padrões observáveis nos dados mock. Componente FAB + chat UI são reais (componentes Figma + React futuro), mas o backend é um state machine de scripts. Documentar como "Mock" no banner do chat.

**Consequências:**
- (+) Demo confiável — sem dependência de API externa
- (+) UI/UX da interação chat fica validada
- (+) Quando virar produto real, substituir o mock é trabalho contido em um único service
- (−) Não temos validação de qualidade de resposta de LLM real
- (−) Apresentadores precisam saber as respostas scriptadas para não desviar

**Alternativas consideradas:**
- **Integrar Claude API direto** — rejeitado: setup, custos, risco de latência no Demo Day
- **Esconder a feature até v2** — rejeitado: assistente é diferencial chave, mostrar como mock é melhor que não mostrar

---

## ADR-009 — Polissonografia móvel: app cobre fluxo, AFIP cobre operação
**Data:** 2026-06-11
**Status:** Aceito

**Contexto:** A polissonografia móvel envolve enviar equipamentos físicos ao paciente, agendar técnico para orientação por videochamada, sincronizar sensores durante o sono. Várias dessas etapas são **operacionais** (logística + clínica) e não software. Não dá pra construir tudo no app sem definir fronteira.

**Decisão:**
- **App responsável:** confirmação, tracking de status (consumindo API operacional fake na PoC), videochamada (UI placeholder), stream de dados ao vivo (UI + mock data), resultado preliminar.
- **AFIP responsável (fora do app):** logística de envio, equipamentos físicos, treinamento dos técnicos, análise final do exame.
- **Contrato app↔operação na PoC:** mock REST endpoints simulados em `mockRepository.js` (status timeline + scheduling). Quando virar produto real, esses endpoints viram chamadas para a infraestrutura AFIP.

**Consequências:**
- (+) Escopo do app fica viável dentro do prazo
- (+) Equipe AFIP pode operar com seus sistemas atuais — não precisa reescrever logística
- (+) Contrato definido evita brigas sobre "quem implementa o quê"
- (−) Integração real com sistemas AFIP precisa de ADR adicional quando virar produto (autenticação, formato dos eventos, SLAs)

---

## ADR-010 — Sleep Coins: gamificação sem valor financeiro real
**Data:** 2026-06-11
**Status:** Aceito

**Contexto:** O time de produto quer aumentar aderência do paciente ao tratamento (CPAP, hábitos, exercícios respiratórios) via mecânica de jogo. A primeira intuição seria criar uma moeda real (R$ ou pontos trocáveis por desconto em farmácia). Isso adiciona complexidade regulatória (Bacen, programas de fidelidade), risco de gaming do sistema (fraude para acumular coins) e fricção LGPD (rastrear consumo).

**Decisão:** Sleep Coins é uma moeda **não-financeira** que representa **engajamento** com o tratamento. Inicialmente trocáveis por:
- Conteúdo premium do material educativo (CPAP, higiene do sono)
- Sessões de orientação por video com técnico AFIP
- Materiais físicos de baixo custo (máscara CPAP backup, almofada para dormir)
- Reconhecimento social (medalhas, leaderboard opcional)

Não há cashback, conversão para dinheiro real, ou troca por produtos de terceiros. Comunicado explicitamente como "moeda de engajamento" — não "dinheiro".

**Consequências:**
- (+) Sem risco regulatório de programa de fidelidade financeiro
- (+) Não cria expectativa de retorno material — foco no comportamento
- (+) Aderência ao CPAP vira métrica clínica diretamente no dashboard médico (M-05) [[ADR-011]]
- (+) Sleep Coins desbloqueia funções dentro do próprio app — feedback loop curto
- (−) Engajamento inicial menor se usuário esperava "ganhar dinheiro"
- (−) Operação AFIP precisa cobrir custo dos resgates (material físico, sessões)

**Alternativas consideradas:**
- **Cashback em consulta** — rejeitado: dependência de operação financeira AFIP, risco regulatório
- **Conversão em produtos parceiros** — rejeitado: contratos comerciais que demandariam meses
- **Sem gamificação** — rejeitado: aderência ao CPAP é dor clínica real (50% abandono em 1 ano em literatura)

---

## ADR-011 — Portal Médico C2: Figma sim, React não no escopo PoC
**Data:** 2026-06-11
**Status:** Aceito

**Contexto:** O mapa do Instituto define toda uma jornada paralela para o **Médico Prescritor** — 5 sub-jornadas (Cadastro → Triagem → Agenda → Laudo → Dashboard). Esse "Portal C2" é fundamental para fechar o ciclo clínico (laudo assinado libera resultado para o paciente, follow-up CPAP volta para o paciente como métrica).

Implementar o portal médico em React **agora**:
- Duplica esforço de design system (responsividade web ≠ mobile)
- Demanda autenticação real (CFM, validação CRM/RQE/CNES) — fora do escopo PoC mock
- Empurra prazo para muito além do Demo Day (19/06/2026)

Não implementar **em nenhum lugar** deixa o pitch incompleto — stakeholders precisam ver a contraparte médica para entender o produto inteiro.

**Decisão:**
- **Figma:** desenhar as 5 telas principais do médico (M-01 a M-05) na página `10 Portal Médico` quando chegar a Onda 6. Mostra a visão integrada no Demo Day.
- **React:** **fora do escopo** da PoC. Quando virar produto real, vira projeto separado (`sleepscore-portal-c2`) usando o mesmo design system Foursys.
- **Conexão entre jornadas:** os cross-links (X-01 a X-05 do [[04_JOURNEY_MAP]]) são mockados via `localStorage` — paciente acompanha status do laudo como se o médico tivesse assinado.

**Consequências:**
- (+) Foco do PoC fica no paciente — onde está a maior oportunidade visual
- (+) Pitch ganha amplitude sem perder profundidade
- (+) Portal médico vira projeto separado com escopo claro
- (−) Demo precisa de transição explicada ("aqui é o que o médico vê") quando passar para Figma estático
- (−) Quem ver só o React acha que o produto é só mobile

**Alternativas consideradas:**
- **Implementar React do portal médico também** — rejeitado: prazo + complexidade auth + duplica design system
- **Pular médico inteiro até v2** — rejeitado: stakeholder do Instituto não veria a tela do próprio papel
- **Cross-link real (mobile chama API mock do médico)** — postponed: foco do React fica no paciente; cross-link via shared `localStorage` é suficiente

---

## ADR-012 — Adotar react-router para protótipo navegável de 59 telas (supera ADR-005)
**Data:** 2026-06-11
**Status:** Aceito · Supera [[ADR-005]]

**Contexto:** [[ADR-005]] (Roteamento por UiState · sem react-router) foi tomada quando o escopo do protótipo era **5 telas** do Core Flow. Com a expansão para **59 telas** (Onboarding, Pairing, Sono AI, Sleep Coins, Polissonografia móvel, Triagem clínica, Agenda, Exame & Laudo, Portal Médico desktop), o pattern `switch (uiState.kind)` no `App.jsx` viraria switch case ingovernável.

Além disso, o protótipo precisa funcionar como **mock navegável** — apresentadores no Demo Day vão pular entre telas via URL/QR Code e via dashboard de debug. URLs compartilháveis viram requisito.

**Decisão:**
- Adotar `react-router-dom@^7` com `BrowserRouter` + `Routes`/`Route`.
- 2 layouts compartilhados via `Outlet`:
  - **`PhoneShell`** — frame mobile 412 (max-w) + status bar + theme toggle + debug menu flutuante. Hospeda todas as telas paciente.
  - **`DesktopShell`** — sidebar 240px + header + content area 1200px. Hospeda Portal Médico C2.
- **`DashboardHome` em `/`** — índice navegável de todas as telas agrupadas por épico (WEB-EP-05 a WEB-EP-13). Visível só em modo demo.
- Estrutura de rotas:
  - `/` — Dashboard
  - `/app/*` — Core Flow (mantém SleepStateContext para Idle→Loading→Result, mas exposto via rota)
  - `/onboarding/*`, `/pairing/*`, `/sono-ai/*`, `/polisso-movel/*`, `/coins/*`, `/triagem/*`, `/agenda/*`, `/exame/*` — telas mobile
  - `/medico/*` — Portal Médico desktop (DesktopShell)
- `SleepStateContext` deixa de controlar navegação geral; passa a focar em **dados de sessão** (questionário, sleep coins, perfil do usuário mockado).

**Consequências:**
- (+) URLs compartilháveis (QR code → tela específica)
- (+) Navegação por browser back/forward funciona
- (+) Dashboard de debug fica trivial (`Link` para cada rota)
- (+) Layouts compartilhados via Outlet reduzem duplicação de chrome (status bar + theme toggle)
- (−) Bundle ganha ~25 KB gzip
- (−) `App.jsx` antigo precisa refactor — Core Flow vira `/app/*` rotas mas estado fica no Provider
- (−) Tests futuros precisam `MemoryRouter` (não relevante para PoC)

**Alternativas consideradas:**
- **TanStack Router** — rejeitado: maior curva, sem ganho para PoC
- **Manter switch + URL hash manual** — rejeitado: feio e propenso a bugs em 59 telas
- **Migrar para Next.js** — rejeitado: SSR/SSG não traz valor para mock + setup time alto

**Notas de migração:**
- Mantém `SleepStateContext` para dados de sessão (currentQuestionnaire, coinsBalance, etc.)
- Redirect na `/app` → equivalente do antigo Idle (Home)
- Cada rota usa primitivos existentes (PrimaryButton, ScoreBar, RiskBadge, etc.)
- Telas novas viram componentes funcionais simples; mock data inline ou em `src/data/`

---

## ADR-013 — Nome do app: "Instituto do Sono" + selo "PROTÓTIPO" (SleepScore suspenso)
**Data:** 2026-06-12
**Status:** Aceito · Substitui o uso de "SleepScore" na UI

**Contexto:** O nome "SleepScore" ainda não foi aprovado pelo cliente. Usá-lo no protótipo de demonstração pode gerar expectativa indevida ou confusão de marca. O cliente pediu para manter o protótipo sob o nome neutro "Protótipo Instituto do Sono".

**Decisão:**
- Marca exibida na UI: **Instituto do Sono** + badge **PROTÓTIPO** (laranja, pequeno) nos headers principais.
- Title do navegador: "Protótipo · Instituto do Sono (AFIP)".
- Removido "SleepScore" de todo texto visível ao usuário (10 arquivos + index.html).
- Mantido: footer "Powered by Foursys" (assinatura do fornecedor) e o nome da feature "Sleep Coins" (moeda de gamificação — não é o nome do app).
- Nome técnico do projeto (pasta, package.json `sleepscore-web`) permanece — não é visível ao usuário, troca depois se a marca mudar.

**Consequências:**
- (+) Demo não compromete uma marca não aprovada
- (+) Reforça que é protótipo (selo visível) — gerencia expectativa
- (−) Se o nome final for aprovado, novo rebranding (mecânico, ~10 arquivos)

## ADR-014 — Polissonografia: 3 modalidades de realização
**Data:** 2026-06-12
**Status:** Aceito · Expande [[ADR-009]]

**Contexto:** [[ADR-009]] tratava só da polissonografia móvel (kit em casa). O produto definiu 3 formas de realizar o exame, e o paciente deve escolher.

**Decisão:** Tela de escolha de modalidade (`/polisso-movel/modalidade`) com 3 opções:
- **A — Presencial** no Hospital do Sono ou clínica parceira → reusa o épico Agenda (`/agenda/mapa`).
- **B — Retirar o kit no hospital** (orientação presencial, dorme em casa) → nova tela `/polisso-movel/retirada` (PickupScreen).
- **C — Receber o kit em casa** (logística + orientação por vídeo) → fluxo móvel existente (`/polisso-movel/confirmacao-envio`).

**Consequências:**
- (+) Cobre o espectro de conforto/custo/assistência do paciente
- (+) Reaproveita épicos existentes (Agenda para presencial)
- (+) Todas levam ao mesmo laudo assinado por médico do sono — mensagem de equivalência clínica
- (−) Modalidade B tem fluxo mais enxuto no protótipo (1 tela); detalhamento de devolução do kit fica para produção

## ADR-015 — Nomes de placeholder genéricos nos mockups
**Data:** 2026-06-12
**Status:** Aceito

**Contexto:** O protótipo usava o nome real do usuário ("Walter Araújo") como paciente protagonista. Em mockups de demonstração, é melhor usar placeholders genéricos.

**Decisão:** Paciente protagonista = **"João Silva"** (placeholder padrão pt-BR, equivalente a "John Doe"). Demais nomes (Dr. Marcos Rocha, Ana Costa, Pedro Lima, etc.) já eram fictícios e permanecem.

**Consequências:**
- (+) Mockup neutro, sem expor dados de pessoa real
- (+) "João Silva" é reconhecível como placeholder

## ADR-016 — Toast próprio (event-based) em vez de sonner
**Data:** 2026-06-12
**Status:** Aceito

**Contexto:** Para dar feedback "em breve" em CTAs sem backend, foi adicionado `sonner`. Em runtime, o `<Toaster>` do sonner lançava "Invalid hook call" com React 19.2 (incompatibilidade), falhando ao montar.

**Decisão:** Substituir sonner por um toast caseiro event-based: `comingSoon()` dispara um `CustomEvent`, e `<ToastHost>` (montado no App) escuta, enfileira e renderiza com framer-motion (já no projeto). Sonner desinstalado.

**Consequências:**
- (+) Zero dependência problemática; controle total do visual
- (+) Funciona com React 19.2
- (−) Sem features avançadas do sonner (stacking complexo, promises) — desnecessárias aqui

---

## ADR-017 — Jornada de primeiro acesso encadeada + entradas explícitas no Dashboard
**Data:** 2026-06-12
**Status:** Aceito

**Contexto:** Feedback de teste de usabilidade: a divisão por épicos (acessível pelo Dashboard de dev `/`) é boa para pular a um momento específico, mas "abrir o app do zero" não tinha uma jornada lógica encadeada. Havia furos: SetupDone "Fazer depois" ia para o pareamento (em vez de pular), e PairedSuccess pulava Loading + Questionário, indo direto ao Result.

**Decisão:**
- Definir a jornada de primeiro acesso encadeada: **Onboarding → Pareamento (opcional) → Análise (Loading → Questionário → Result) → Triagem → Atendimento → Exame → Laudo**.
- Corrigir cabeamentos: SetupDone "Fazer depois" → `/app/home`; PairedSuccess "Analisar minha noite" → `/app/loading`.
- Adicionar 2 entradas explícitas no Dashboard `/`:
  - **▶ Iniciar jornada do paciente** (primeiro acesso) → `/onboarding/welcome`
  - **🏠 App do dia a dia** (usuário recorrente) → `/inicio`
- Manter a grade de épicos abaixo, agora rotulada "Ou abra uma tela específica".

**Consequências:**
- (+) Quem testa "do começo" segue um fluxo intuitivo, sem becos
- (+) Mantém o acesso direto a qualquer tela (demo / QA)
- (+) Distingue claramente primeiro-uso de uso-recorrente
- (−) Persistência de "já fez onboarding" ainda é manual (sem flag localStorage) — aceitável para PoC

## ADR-018 — Atendimento em 3 formas (presencial hospital / clínica parceira / teleconsulta)
**Data:** 2026-06-12
**Status:** Aceito · Complementa [[ADR-014]]

**Contexto:** [[ADR-014]] cobria as 3 modalidades do **exame** (polissonografia). Faltava o **atendimento** (consulta com o médico do sono), que o produto definiu em 3 formas — incluindo teleconsulta para remover a barreira geográfica.

**Decisão:** Tela `ConsultTypeScreen` (`/agenda/atendimento`) com 3 opções:
- **Presencial · Hospital do Sono** → `/agenda/mapa`
- **Presencial · Clínica parceira** → `/agenda/mapa`
- **Online · Teleconsulta** → `/agenda/teleconsulta` (TeleconsultScreen)

A teleconsulta agenda atendimento por vídeo com o médico e, ao confirmar, **conecta com o envio dos equipamentos para casa** (`/polisso-movel/confirmacao-envio`) — fechando o ciclo "atende remoto + exame em casa".

Cabeamento: TriagemScore "Agendar atendimento" e PatientHome "Agendar atendimento" → `/agenda/atendimento` (antes iam direto ao mapa de clínicas).

**Consequências:**
- (+) Remove barreira geográfica (teleconsulta atende qualquer cidade)
- (+) Conecta consulta online → exame domiciliar de forma natural
- (+) Reaproveita o épico Agenda (mapa de clínicas) para as presenciais
- (−) Fluxo de teleconsulta é enxuto no protótipo (1 tela de agendamento); sala de vídeo real fica para produção

---

## ADR-019 — Desacoplar modalidade de atendimento da modalidade de exame; kit só após pré-diagnóstico + recomendação + aprovação + confirmação
**Data:** 2026-06-12
**Status:** Aceito · Refina [[ADR-018]] e [[ADR-014]]

**Contexto:** [[ADR-018]] conectava a teleconsulta diretamente ao envio do kit (`TeleconsultScreen` → `/polisso-movel/confirmacao-envio`), acoplando indevidamente a **forma do atendimento** à **modalidade do exame** e disparando a logística do kit cedo demais. O cliente definiu o princípio correto: as duas decisões são independentes — o paciente pode ser atendido por vídeo e ainda assim fazer o exame presencial (ou o contrário), e o **envio do kit só é confirmado pelo paciente** depois de pré-diagnóstico + recomendação (médico/algoritmo) + aprovação.

**Decisão:** Inserir um fluxo pós-consulta antes de qualquer escolha de modalidade de exame:

```
Atendimento (ConsultType: presencial Hospital / presencial Clínica / Teleconsulta)
  → /exame/consulta        (Consulta agendada/realizada — bridge; modo via state)
  → /exame/pre-diagnostico (Pré-diagnóstico: resumo dos achados, NÃO é laudo)
  → /exame/recomendacao    (Recomendação médico + algoritmo: "polissonografia indicada")
  → /exame/aprovacao       (Assinatura do médico SEMPRE + cobertura Convênio/Particular)
  → /exame/confirmar       (Paciente confirma e escolhe ONDE: Instituto / clínica / casa)
       • casa      → /polisso-movel/confirmacao-envio  (kit só AQUI)
       • presencial→ /agenda/mapa                       (agenda o exame no local)
```

Detalhes:
- **2 telas** separadas para pré-diagnóstico e recomendação (decisão do cliente).
- **Aprovação:** assinatura do médico (Dr. Marcos Rocha) é sempre necessária; o paciente escolhe a **cobertura** — Convênio (autorização da operadora, mockada como aprovada) ou Particular (sem autorização de convênio). A timeline de status reage à escolha.
- **`ExamModalityScreen` foi movida** de `polisso-movel/` (`/polisso-movel/modalidade`, rota removida) para `exame/ExamConfirmScreen.jsx` (`/exame/confirmar`), reposicionada como confirmação do paciente. `ExamSuggestionScreen` agora aponta para `/exame/confirmar`.
- **Atendimento presencial** (Hospital/Clínica) passou a ir direto para `/exame/consulta` (bridge) em vez de `/agenda/mapa`. O épico **Agenda** (`mapa → … → confirmacao → preparo`) fica reservado para o **agendamento do exame presencial** (terminal já com cópia de exame), evitando ter de propagar contexto consulta-vs-exame por 5 telas sem estado global.

**Consequências:**
- (+) Modalidade de atendimento e de exame ficam genuinamente independentes.
- (+) Kit só é confirmado pelo paciente, após indicação + aprovação — alinhado ao fluxo clínico real.
- (+) Reaproveita a `ExamModalityScreen` (3 cards) no ponto correto do fluxo.
- (−) No protótipo, a consulta presencial não passa pelo seletor de unidade da Agenda antes da consulta (a unidade é exibida na tela de consulta). Aceitável para PoC; se necessário, threading de contexto pela Agenda fica para depois.
- (−) "Consulta realizada" é um atalho de demo (botão), sem espera/estado real.

---

## ADR-020 — Gamificação sem loja: "Sleep Coins" → "Sleep Score" (pontos + níveis + ranking)
**Data:** 2026-06-12
**Status:** Aceito · Ajusta escopo de [[WEB-EP-09]] · Relaciona-se a [[ADR-013]]

**Contexto:** A feature de gamificação foi prototipada como **Sleep Coins** — uma **moeda gastável** com **loja de recompensas** (`/coins/loja`, estado "em breve"). O produto decidiu **remover a lógica de moeda/loja** da PoC e posicionar a gamificação apenas como **engajamento por ranking + desafios + níveis**, sem resgate de prêmios.

**Decisão:**
- **Remover a loja** (`RewardsStoreScreen` + rota `/coins/loja` + CTA "Ir à loja de recompensas").
- **Renomear a feature** de "Sleep Coins" para **"Sleep Score"** em toda a UI. A pontuação deixa de ser "coins" (moeda) e passa a ser **"pontos" (pts)** — engajamento, não economia resgatável. Símbolos `☾`/`₡` substituídos por `pts`.
- **Adicionar tela de Ranking** (`RankingScreen`, `/coins/ranking`): leaderboard semanal (Liga Prata), posição do paciente, top participantes **anonimizados**, regra de subida de liga. Mockado, sem dados clínicos.
- Recabeamento: o CTA do hub aponta para `/coins/ranking` (não mais `/coins/loja`); atualizados `PatientHomeScreen`, `DashboardHome`, `PhoneShell` (debug), `NextStepsScreen`, `ChallengeDetailScreen`, `NightsHistoryScreen`, `InsightCardScreen`.

**Sobre o nome (relação com [[ADR-013]]):** [[ADR-013]] suspendeu **"SleepScore" como nome do APP** (não aprovado pelo cliente) — o app permanece "Instituto do Sono". Aqui "**Sleep Score**" é o nome de uma **funcionalidade** (gamificação), não do aplicativo — decisão explícita do usuário. Para evitar colisão com o **score de qualidade do sono (62/100)** já exibido na Home/Resultado, a pontuação da gamificação é sempre rotulada como **"pontos/pts"**, não como "score".

**Consequências:**
- (+) Gamificação fica coerente sem backend de recompensas/logística de prêmios.
- (+) Ranking adiciona o eixo competitivo que o produto pediu.
- (+) Sem promessa de "prêmios de verdade" (que a loja "em breve" sugeria) na PoC.
- (−) Convivência de dois termos "Score" (qualidade do sono vs. feature Sleep Score) exige cuidado de copy — mitigado usando "pontos" para a gamificação.
- (−) Telas de gamificação ainda não estão no Figma (épico em onda futura) — sync fica para depois.

---

## ADR-021 — Histórico evolui para central de tendências (tabs de métrica + range navegável + histórico de desafios)
**Data:** 2026-06-13
**Status:** Aceito · Tira [[WEB-EP-09-FT-03]] de "futuro" para "em curso" · Substitui a `NightsHistoryScreen` original

**Contexto:** A `NightsHistoryScreen` (rota `/score/historico`, criada na 4ª onda) mostrava só **uma** métrica (qualidade do sono) num gráfico fixo de 30 barras + recordes. O produto pediu uma central de tendências real: comparar várias dimensões clínicas, escolher janela temporal e ainda ver a evolução dos desafios de gamificação. Manter três cards estáticos não cobre o caso de uso "olhar para trás e entender padrões".

**Decisão:** Evoluir a tela existente (mantém a rota `/score/historico`). Estrutura nova:

1. **Tabs de métrica** (segmented control no topo):
   - **Sono** — qualidade 0-100 (bar chart)
   - **Apneia** — AHI por noite com bandas de classificação (Normal / Leve / Moderada / Grave) — line chart
   - **FC noturna** — bpm médio (line chart com baseline)
   - **SpO2 mínima** — % (line chart com limiar 90%)

2. **Chips de range** (logo abaixo das tabs): `Noite anterior` · `7 dias` (default) · `15 dias` · `30 dias`.

3. **Janela navegável de 7 dias** — o gráfico **sempre** renderiza 7 dias. Para 15d/30d, setas `‹ ›` deslocam a janela de 7 em 7. Para "Noite anterior", a janela colapsa para comparação 2 noites (ontem vs anteontem). Indicador de janela ("dia X-Y de N").

4. **Card comparativo** (acima do gráfico): valor médio do período + delta vs período imediatamente anterior do mesmo tamanho.

5. **Seção "Desafios"** (abaixo do gráfico): histórico de progresso dos desafios da gamificação (CPAP, sem cafeína, 8h de sono) — concluídos, em curso e abandonados. Cada linha com % final/atual e período coberto.

6. **Recordes** mantidos como bloco final (melhor noite, pior noite, sequência).

**Dados:** novo `src/data/historyMock.js` com 30 noites simuladas por métrica + linha do tempo dos desafios. Sem backend (ADR-002).

**Consequências:**
- (+) Cobre o pedido de "ver tendência de várias métricas com janela escolhível".
- (+) Janela de 7 dias mantém leitura confortável em 412px de largura mesmo para 30 dias de dado.
- (+) Liga a camada clínica (apneia/FC/SpO2) à de engajamento (desafios) numa só tela — reforça a tese do produto.
- (+) Mantém a rota existente — zero quebra em CTAs já cabeados (PatientHome, SleepCoinsScreen "Ver todos").
- (−) Mais componentes de chart (line chart com bandas de severidade) — mas todos puros SVG/HTML, sem nova dependência.
- (−) Mock de 30 dias precisa ser representativo de apneia moderada (consistência com o resto da PoC).

**Alternativas consideradas:**
- **Tela nova ao lado da atual** — rejeitado: duplica CTA e a tela existente já estava subdimensionada.
- **Recharts/Victory para gráficos** — rejeitado: protótipo já tem SVG inline funcionando bem; dependência nova só pra essa tela é exagero.
- **Range diário com scroll horizontal (sem janela fixa)** — rejeitado: leitura pior em mobile; janela navegável dá controle e mantém densidade.

---

## ADR-022 — Rotas de gamificação: `/coins/*` → `/score/*`
**Data:** 2026-06-13
**Status:** Aceito · Refina [[ADR-020]]

**Contexto:** [[ADR-020]] renomeou a feature de "Sleep Coins" para "Sleep Score" na UI, mas manteve as rotas em `/coins/*` por conveniência (evitar refactor). Com a tela de Histórico (ADR-021) expandida e mais entradas explícitas no app (PatientHome → "Sleep Score"), a divergência URL ↔ rótulo ficou visível em demo (debug bar, dashboard de dev, mensagens de erro). Manter o mismatch confunde leitores que cruzam código com Figma.

**Decisão:** Renomear todas as rotas `/coins/*` para `/score/*`. A pasta `src/screens/coins/` permanece — é nome interno de pacote, sem impacto no usuário, e renomeá-la criaria churn em imports sem ganho.

Rotas afetadas:
- `/coins` → `/score`
- `/coins/challenge/:id` → `/score/challenge/:id`
- `/coins/ranking` → `/score/ranking`
- `/coins/historico` → `/score/historico`
- `/coins/regua-whatsapp` → `/score/regua-whatsapp`

24 referências corrigidas em 12 arquivos (routes.jsx + 8 telas + PhoneShell + DashboardHome + docs).

**Consequências:**
- (+) URL bate com rótulo exibido — leitura mais limpa em demo
- (+) QR codes / links externos passam a refletir o nome correto
- (−) Quem tiver bookmark antigo em `/coins/*` cai em 404 (aceitável: protótipo, sem deep linking externo)
- (−) Folder name `screens/coins/` agora destoa do nome da rota — internalismo aceitável dado custo do rename

---

## ADR-023 — Modelo "relógio sempre conectado": análise vira leitura, sync vira manutenção; nova tela /dispositivo
**Data:** 2026-06-13
**Status:** Aceito

**Contexto:** O fluxo original tratava a análise como um **gatilho manual** ("Analisar minha noite" na Home/Resultado → "Fazer nova análise" no rodapé). Isso fazia sentido quando o protótipo seguia o app Android original (pull explícito do Health Connect). Mas o produto evoluiu para um modelo onde **o relógio está conectado e sincronizando em segundo plano** — então "fazer nova análise" não tem objeto: os dados já estão lá, o que o paciente faz é **ver o relatório**.

O link "Fazer nova análise" no rodapé do Resultado virou ruído cognitivo (paciente pergunta "análise de quê? Já não fiz?"). Ao mesmo tempo, faltava transparência sobre o estado do dispositivo: bateria, última sincronização, permissões — coisas que o paciente precisa controlar para o algoritmo funcionar.

**Decisão:**

1. **Renomear a ação do rodapé do `ResultScreen`** de "Fazer nova análise" para **"Atualizar dados do relógio"** — agora é um *force-sync* explícito, com feedback inline ("Sincronizando..." → "Atualizado há instantes"), não navegação.

2. **Nova tela `/dispositivo` (`DeviceScreen`)** com:
   - **Hero de status**: nome + modelo do relógio, ponto colorido (conectado/offline/sincronizando), bateria, última sincronização.
   - **Sincronizar agora**: CTA primária com estado de progresso.
   - **Reconectar** (quando offline) + link "Trocar de dispositivo" → reaproveita `/pairing/select`.
   - **Permissões / dados sincronizados**: lista granular (FC, SpO₂, sono, passos) com estado por permissão.

3. **`PatientHomeScreen` ganha dois pontos de entrada** para a tela de dispositivo:
   - **Ícone no header** (canto superior direito): mini-bateria + ponto de status. Discreto, sempre visível.
   - **Mini-card horizontal** acima de "Sua última noite": "Galaxy Watch 6 · Conectado · sincronizado há 12min" + atalho "Sincronizar". Redundância proposital — header é glance, card é affordance.

4. **Estado mockado** em `src/data/deviceMock.js` (ADR-002 mantido). Não há SDK real do Health Connect — o sync é simulado com setTimeout para dar a sensação certa.

**Consequências:**
- (+) Mental model alinhado ao produto: análise = ver relatório, sync = manutenção.
- (+) Paciente entende por que o algoritmo às vezes "não tem dados novos" (vê bateria baixa, sync antigo).
- (+) Permissões transparentes — diferencial LGPD que se conversa em demo.
- (+) Reaproveita fluxo de pareamento existente quando precisa trocar dispositivo.
- (−) Mais 1 tela para manter no Figma (próxima onda) e na PoC.
- (−) Mini-card no topo da Home empurra "Sua última noite" um pouco para baixo (aceitável).

**Alternativas consideradas:**
- **Manter "Fazer nova análise"** — rejeitado: confunde no novo modelo.
- **Só ícone no header (sem mini-card)** — rejeitado: paciente novo não percebe o ícone; mini-card educa.
- **Tela de dispositivo só pela engrenagem de Settings** — rejeitado: status é informação de primeira ordem (algoritmo depende dele), merece atalho da Home.

---

## ADR-024 — Pré-diagnóstico algorítmico na Home (`/pre-diagnostico`) distinto do pré-diagnóstico pós-consulta (`/exame/pre-diagnostico`)
**Data:** 2026-06-13
**Status:** Aceito

**Contexto:** Já existe `PreDiagnosisScreen` em `/exame/pre-diagnostico` (criada em [[ADR-019]]) — ela reúne **triagem + conversa com o médico + sinais do wearable** num resumo apresentado **depois** da consulta para encaminhar a recomendação de exame. É um pré-diagnóstico clínico, validado por humano.

O produto pediu agora um pré-diagnóstico de **outra natureza**: um **alerta gerado pelo algoritmo**, baseado APENAS nos dados do relógio, que aparece **na Home** mesmo antes do paciente ter consultado alguém. A função desse alerta é converter "tem sinais aqui" em "marque uma consulta" — fechar o gap entre dado bruto e ação.

Misturar os dois numa tela só confunde:
- O pós-consulta tem peso de "o médico viu tudo isso".
- O algorítmico tem peso de "isso aqui é uma triagem automática — vá conversar com alguém".

**Decisão:**

1. **Nova rota `/pre-diagnostico`** (sem `/exame/`) com **`PreDiagnosisAlertScreen`**. Tela dedicada acessível pela Home. Conteúdo:
   - Aviso preliminar ("não é diagnóstico, é triagem automática")
   - Hero com a gravidade detectada (apneia leve-moderada)
   - Métricas do relógio com cor (3 quedas SpO₂, FC noturna, duração do sono)
   - "Por que isso importa" (educacional, 2-3 linhas)
   - Próximos passos sugeridos (consulta · triagem · exame)
   - CTA primária: "Agendar atendimento" → `/agenda/atendimento`
   - Link: "Tirar dúvidas com Sono AI" → `/sono-ai/full`

2. **Card de alerta na Home** (`PatientHomeScreen`), logo após o header:
   - Tom acolhedor (menta + laranja suave, sem alarmismo)
   - Kicker "Pré-diagnóstico"
   - Título: "Detectamos sinais de apneia leve a moderada"
   - 3 bullets com métricas curtas
   - Botão "Agendar atendimento" + link "Entender o pré-diagnóstico" → `/pre-diagnostico`

3. **`/exame/pre-diagnostico` permanece** como pós-consulta — não é tocada nesta ADR.

4. **Dados mockados inline** no `PreDiagnosisAlertScreen` (e referenciados pelo card da Home). Sem novo arquivo em `src/data/` — payload é pequeno e específico desta tela.

**Consequências:**
- (+) Converte o "tem dado" do relógio em ação clínica direta.
- (+) Distinção de tom evita confusão entre triagem automática e leitura humana.
- (+) Alerta sempre visível impulsiona o paciente a abrir o app diariamente.
- (−) Dois conceitos com nome parecido ("pré-diagnóstico") — mitigado pela URL e pela copy.
- (−) Card de alerta empurra mini-card de dispositivo e "última noite" para baixo.

**Alternativas consideradas:**
- **Reusar `/exame/pre-diagnostico`** — rejeitado: tom diferente, contexto de chegada diferente.
- **Apenas o card na Home, sem tela dedicada** — rejeitado: paciente clica para "entender" e merece um lugar onde aprofundar.
- **Substituir o card "Sua última noite" quando há alerta** — rejeitado: paciente perde a leitura quantitativa (62/100), que tem valor próprio.

---

## ADR-025 — Polissonografia domiciliar: 8 canais clínicos no LiveStream, janela 1-7 noites e tela de acompanhamento na Home
**Data:** 2026-06-13
**Status:** Aceito · Expande [[ADR-009]] e [[ADR-014]]

**Contexto:** O `LiveStreamScreen` (`/polisso-movel/stream`) mostrava 4 métricas (FC, SpO₂, movimento, temperatura) — útil mas insuficiente: polissonografia domiciliar real coleta vários **canais clínicos** específicos (fluxo aéreo, esforço respiratório, posição corporal, ronco) que diferenciam o exame de uma leitura genérica de wearable. Além disso, o protocolo do Instituto pode estender o exame **até 7 noites** consecutivas para reduzir o *first-night effect* e ganhar acurácia diagnóstica. Durante essa janela, o exame é o evento central da rotina do paciente — precisa estar visível na Home.

O fluxo atual não cobria nada disso: o LiveStream mostrava "Noite 1 de 1", não havia tela para o paciente entender em que noite está, e a Home não refletia que existe um exame ativo.

**Decisão:**

1. **`LiveStreamScreen` ganha 4 canais clínicos** (além dos 4 atuais), formando grid 2×4:
   - **Fluxo aéreo** (L/min)
   - **Esforço respiratório** (tórax/abdômen — escala)
   - **Posição corporal** (supino · lateral · prono)
   - **Ronco** (eventos/h)
   - Mantém SOS técnico e botão "Minimizar".

2. **Nova tela `/polisso-movel/acompanhamento`** (`ExamTrackingScreen`) com:
   - Hero de status (noite N de Y, status, início, devolução até DD/MM)
   - Timeline de noites (concluídas com AHI/SpO₂, atual destacada, pendentes)
   - Pré-resultado consolidado (AHI parcial · classificação provável · % de coleta)
   - Saúde do equipamento (bateria do kit, sinal, modelo) com atalho para "Ver dados ao vivo"
   - Instruções operacionais (como vestir, dicas, "Chamar técnico")
   - Devolução + próximos passos (data de devolução, análise IA → laudo médico)

3. **Card "Exame em casa" na `PatientHome`**, posicionado **abaixo** do alerta de pré-diagnóstico (mantém triagem como prioridade visual), com:
   - Kicker "Exame em casa"
   - Linha "Noite {n} de {total}"
   - Barra de progresso
   - CTA "Acompanhar exame" → `/polisso-movel/acompanhamento`
   - Aparece apenas quando `EXAM.state === 'in_progress' | 'returning'`.

4. **Janela parametrizável (mock 1-7 noites)** em `src/data/examMock.js`. O default da PoC é 7 noites para mostrar o caso comprido — apresentadores podem editar o mock.

**Consequências:**
- (+) PSG visualmente coerente com o exame clínico real — apresentação cl­ínica vira diferencial em demo.
- (+) Paciente entende multi-noite e mantém engajamento durante a janela.
- (+) Home reflete o estado do exame; ele não some atrás de outras telas.
- (+) Timeline + pré-resultado mostram o exame "se formando" — antecipa o laudo.
- (−) Mais 1 tela para sincronizar com Figma na próxima onda.
- (−) Grid 2×4 fica mais denso em 412px (ajuste fino de spacing já feito).

**Alternativas consideradas:**
- **Tudo no LiveStream (sem tela separada)** — rejeitado: stream é "agora", tracking é "jornada do exame" — propósitos distintos.
- **Card só no LiveStream, sem Home** — rejeitado: paciente que minimiza a tela perde referência.
- **Substituir o alerta de pré-diagnóstico durante o exame** — rejeitado: pré-diagnóstico é gatilho que levou ao exame; manter os dois reforça a continuidade.

---

## ADR-026 — Card pós-exame em 3 estados + laudo enriquecido (gráficos, análise IA, follow-up, PDF preview)
**Data:** 2026-06-13
**Status:** Aceito · Expande [[ADR-025]]

**Contexto:** [[ADR-025]] cobriu o exame **em andamento** — multi-noite, canais clínicos, tracking. O passo seguinte (pós-exame) tinha telas (`/exame/em-laudo-ia`, `/exame/em-revisao-medica`, `/exame/resultado`) mas **nenhum vínculo com a `PatientHome`**: o paciente terminava o exame e perdia visibilidade até voltar à tela do laudo via dashboard de dev.

Além disso, a `DiagnosisScreen` (o laudo assinado) era textual demais para um documento clínico que serve de base para tratamento — faltava o lado **visual** (gráficos), a separação **pré-laudo gerado por IA vs. validação médica**, a parte **educacional** (o que cada métrica significa) e ações de **follow-up com o médico**.

**Decisão:**

1. **`PatientHome` ganha card multi-estado** (substitui o card "Exame em casa" anterior) com 4 variantes lidas de `EXAM.state`:
   - `in_progress` → "Noite N de Y" (atual) — sem mudança
   - `analyzing` → "IA analisando seu exame" → `/exame/em-laudo-ia`
   - `reviewing` → "Pré-laudo com Dr. Marcos Rocha" → `/exame/em-revisao-medica`
   - `signed` → "Laudo pronto · assinado em DD/MM" → `/exame/resultado`
   - Cada variante com cor própria (menta/laranja/sun-moon) e badge correspondente.

2. **`DiagnosisScreen` enriquecida** com 4 blocos novos:
   - **Visualização clínica**: IAH com bandas de severidade (5/15/30), gauge de eficiência, hipnograma simplificado (N1·N2·N3·REM·Wake), curva SpO₂ ao longo da noite com limiar 90%.
   - **Análise gerada pela IA** (distinta da análise médica) — deixa explícito que o pré-laudo é algorítmico antes da validação.
   - **O que cada número significa** — seção educacional com texto-base sobre IAH (leve 5-14, moderado 15-29, grave ≥30), eficiência (alvo ≥85%), fases (N1/N2/N3/REM) e SpO₂ (queda < 90% como evento clínico). Conteúdo direto do material fornecido pela equipe clínica.
   - **3 ações de follow-up** no rodapé: Mensagem para Dr. Marcos · Agendar retorno · Sono AI.

3. **Modal de preview do PDF**: clicar "Baixar PDF" abre modal com preview estilizado + botões "Baixar (usa window.print)" e "Enviar por email" (toast). Sem dependência nova.

4. **Mock `LAUDO`** em `src/data/examMock.js`: número, data/hora de assinatura, médico (Dr. Marcos Rocha · CRM 117892-SP · RQE 28156), validação Instituto, hipnograma (8 segmentos), curva SpO₂ (16 pontos), padrão FHIR R4.

**Consequências:**
- (+) Continuidade visual entre exame em andamento → análise → revisão → laudo (paciente nunca perde referência).
- (+) Laudo se aproxima do documento clínico real — visual, educativo, e separa o que é IA vs. o que é validação humana.
- (+) PDF export realista sem dependência (window.print → "Salvar como PDF" do navegador).
- (+) Follow-up via 3 canais cobre a comunicação assíncrona, síncrona e curiosidade (Sono AI).
- (−) `DiagnosisScreen` cresce em altura — scroll mais longo (aceitável: é um documento).
- (−) Card multi-estado adiciona ramificações no `PatientHome` — testar todas as variantes durante demo.

**Alternativas consideradas:**
- **Botão "Falar com médico" único** — rejeitado: o paciente quer escolher canal (urgente · marcar retorno · só tirar dúvida).
- **Gerar PDF com jsPDF** — rejeitado: dependência nova + bundle maior; window.print é suficiente.
- **Apenas estado "signed" na Home** — rejeitado: pula a parte mais interessante (IA → revisão) e quebra a continuidade.

---

## ADR-027 — Tela de dispositivo do kit PSG (`/polisso-movel/dispositivo`), simétrica à do relógio, acessada via /dispositivo
**Data:** 2026-06-13
**Status:** Aceito · Complementa [[ADR-023]] e [[ADR-025]]

**Contexto:** [[ADR-023]] criou `/dispositivo` (status + sync + permissões do relógio). [[ADR-025]] criou `/polisso-movel/acompanhamento` (status do exame multi-noite) onde a "Saúde do equipamento" do kit PSG aparece como uma seção secundária — bateria + sinal embutidos junto da timeline e do pré-resultado.

Falta para o paciente uma **tela dedicada do kit**, simétrica à do relógio, onde ele entende o equipamento físico que tem em casa — quais sensores, onde vão no corpo, quais canais estão ativos, e como pedir ajuda. Esse foco fica diluído na tela de acompanhamento (que olha pra jornada do exame, não pro equipamento).

**Decisão:**

1. **Nova tela `/polisso-movel/dispositivo`** (`KitDeviceScreen`) com 4 blocos:
   - **Hero de status**: nome + modelo (AFIP PSG Home Kit · v2), chip de status, bateria do módulo central, qualidade do sinal de transmissão.
   - **8 canais clínicos**: lista com indicador ativo/sem leitura por canal (espelhando os 8 cards do LiveStream).
   - **Diagrama dos sensores**: SVG esquemático do corpo mostrando onde cada componente vai (faixa torácica, cânula nasal, oxímetro no dedo, módulo central). Educativo.
   - **Devolução + suporte**: data de devolução, como embalar, chamar técnico (atalho para a mesma ação da ExamTrackingScreen).

2. **Acesso único**: dentro da tela `/dispositivo` (do relógio) aparece um card **"Também em uso: kit de polissonografia"** quando `EXAM.state ∈ {in_progress, returning}`. Centraliza dispositivos numa hub única — o paciente abre "dispositivo" e vê o que está conectado.

3. **Tela independente**, sem extrair shell compartilhado. Tela do relógio e tela do kit têm propósitos clínicos diferentes (continuous monitoring vs. estudo de noite); convergir prematuramente complica.

4. **Mock estendido em `examMock.js`**: `KIT_CHANNELS` (8 itens com `active: bool` + ícone), `KIT_SENSORS` (4 itens com `position: {bodyPart, side?, label}` para o diagrama).

**Consequências:**
- (+) Simetria entre os dois dispositivos torna o app coerente.
- (+) Paciente entende fisicamente o equipamento que tem em casa — reduz incerteza ("estou usando direito?").
- (+) Diagrama de sensores é diferencial visual em demo.
- (+) Hub único de dispositivos (via /dispositivo) facilita futuras adições (oxímetro, anel, etc.).
- (−) ExamTrackingScreen e KitDeviceScreen têm sobreposição (bateria + sinal aparecem nos dois lugares) — aceitável: tracking é macro-status, kit é detalhe.

**Alternativas consideradas:**
- **Linkar diretamente da ExamTrackingScreen** — rejeitado: hub único de dispositivos é mais escalável.
- **Mini-card na Home** — rejeitado: a Home já está densa; o /dispositivo basta.
- **Componente `<DeviceShell>` compartilhado** — rejeitado: 2 telas não justifica extração; espera-se variação clínica entre dispositivos.

---

## ADR-028 — Acompanhamento pós-laudo com retornos híbridos (temporal + clínico)
**Data:** 2026-06-14
**Status:** Aceito · Estende [[ADR-026]] (laudo enriquecido) e [[ADR-010]] (Sleep Score como engajamento)

**Contexto:** Depois do laudo assinado, a jornada do paciente no protótipo terminava — havia botões "Agendar retorno" e "Mensagem para Dr. Marcos" no rodapé do laudo, mas nenhuma continuidade visível. Na prática clínica, apneia é doença crônica: paciente em CPAP tem retornos no protocolo D+30 (titulação), D+90 (reavaliação de aderência), D+180 (manutenção) e anual. Além disso, dados do relógio + aderência ao CPAP podem indicar piora antes do retorno programado — momento ideal pra antecipar a consulta automaticamente.

**Decisão:** Implementar acompanhamento pós-laudo com **dois gatilhos de retorno coexistindo**:

1. **Temporal** — calendário padrão do protocolo: D+30, D+90, D+180, anual (D+365 e depois anual indefinido). Agendado automaticamente no momento da assinatura do laudo, baseado na gravidade do diagnóstico.

2. **Clínico** — antecipação automática quando os dados disparam regras:
   - Aderência CPAP cai abaixo de 70% por 14 dias
   - AHI parcial volta a subir acima de 15 em 7 noites consecutivas (medido pelo wearable)
   - Sleep Score cai > 8 pontos em uma semana
   - Quando dispara, o próximo retorno temporal é "antecipado" para 14 dias à frente, com badge "ANTECIPADO POR DADOS CLÍNICOS" e copy explicando o motivo.

**Arquitetura de telas:**

- **`/acompanhamento`** (novo) — hub central. Hero "Próximo retorno em X dias" (com badge temporal/antecipado), timeline vertical de TODOS os retornos (concluídos com chevron pra detalhe, próximo destacado, futuros pending), card de aderência ao tratamento (CPAP, hábitos).
- **`/acompanhamento/retorno/:id`** (novo) — detalhe individual. Para retornos passados: resumo da consulta + decisões. Para o próximo: pré-consulta automatizada com comparativo de métricas (último retorno vs agora), questionário rápido pré-preenchido baseado em dados do wearable, gatilho clínico explicado (quando aplicável).
- **`/medico/retornos`** (novo) — visão consolidada para o médico. Lista de retornos do dia, badge temporal/antecipado, prévia do paciente, link pro pré-laudo HITL.
- **`PatientHomeScreen`** — card condicional "Próximo retorno em X dias" com CTA "Ver acompanhamento". Aparece quando há retorno agendado em ≤ 30 dias.
- **`DiagnosisScreen`** (laudo) — bloco "Plano de acompanhamento" após condutas, com mini-timeline e CTA.

**Mock estratégico** (`src/data/followUpMock.js`): cenário "rotina" — paciente diagnosticado há 120 dias, fez D+30 (aderência 92%, AHI 8) e D+90 (aderência 85%, AHI 12 — deterioração leve). Sistema antecipou o próximo retorno para D+150 (antes do programado D+180). Conta uma história clínica completa em poucas linhas de mock.

**Consequências:**
- (+) Fecha o loop clínico — produto deixa de terminar no laudo e mostra cuidado contínuo.
- (+) Antecipação clínica vira vendedor em demo (sistema "ativo" vs "passivo").
- (+) Sleep Score + dados do relógio ganham razão de ser pra além de gamificação — alimentam decisão clínica.
- (+) Portal médico ganha uso recorrente (lista de retornos do dia) — diferente do laudo único.
- (−) Mais 3 telas para manter + Figma sync.
- (−) Card "Próximo retorno" empurra Home pra baixo — coexiste com alerta pré-diag (que só aparece pré-diagnóstico) e card pós-exame (que só aparece com exame ativo), então em momentos distintos do tempo do paciente.

**Alternativas consideradas:**
- **Só gatilho temporal** — rejeitado: perde a história "produto inteligente" que justifica investimento.
- **Sem tela dedicada `/acompanhamento`** (só card na Home) — rejeitado: jornada não cabe num card; paciente precisa ver evolução, histórico.
- **Antecipação manual** (paciente vê alerta e decide) — rejeitado: empurra decisão pro paciente, contraria a promessa "sistema acompanha pra você".

---

<!-- Adicione novos ADRs abaixo. Sempre incrementar o número. -->
