# Backlog — SleepScore Web Prototype
## Épicos · Features · User Stories

**Versão:** 1.0 | **Data:** 2026-06-11
**Projeto:** CoCria 2026 · Foursys × Instituto do Sono (AFIP) · prototype web

---

## Estrutura

`EPICO > FEATURE > USER STORY`

Convenção de ID:
- Épico:   `WEB-EP-XX`
- Feature: `WEB-EP-XX-FT-XX`
- Story:   `WEB-EP-XX-FT-XX-US-XX`

**Definition of Done (geral):**
- Componente/tela implementado e compilando sem warnings (`npm run lint`)
- Funciona em Chrome desktop e em mobile via DevTools (320–414px)
- Tema Dark renderiza corretamente; Light renderiza nas telas que têm variante
- Sem hardcode de cor (todo HSL via vars)
- Critério de aceite validado manualmente

---

## WEB-EP-01 · Infraestrutura do projeto
**Goal:** Repositório React+Vite operacional com Tailwind, shadcn, tokens HSL e tema Dark/Light.

### WEB-EP-01-FT-01 · Scaffold inicial

#### WEB-EP-01-FT-01-US-01
**Como** dev, **quero** o projeto Vite+React inicializado com Tailwind 3.4 e shadcn/ui, **para que** eu tenha base produtiva no primeiro commit.

**Critério de aceite:**
- `npm run dev` sobe em < 3s
- `npm run build` gera bundle sem warnings
- Hot Module Reload funciona ao editar `App.jsx`

#### WEB-EP-01-FT-01-US-02
**Como** dev, **quero** ESLint configurado com regras razoáveis (no `eslint-plugin-react-hooks` + JSX a11y), **para que** erros simples não passem.

### WEB-EP-01-FT-02 · Tokens e tema

#### WEB-EP-01-FT-02-US-01
**Como** designer, **quero** todos os tokens Foursys mapeados para HSL CSS variables, **para que** o código reflita o Figma 1:1 e troca de tema seja instantânea.

**Critério de aceite:**
- 14 tokens (MarinhoDeep, Marinho, Surface, Surface2, Laranja, Baunilha, Menta, RiskLow/Mod/High/Crit, TextPrimary, TextOnBrand, SunMoon) em `:root` e `[data-theme="light"]`
- `tailwind.config.js` expõe classes utilitárias: `bg-marinho-deep`, `text-laranja`, etc.

#### WEB-EP-01-FT-02-US-02
**Como** usuário, **quero** alternar Dark↔Light com um botão, **para que** eu visualize o protótipo no tema que prefiro.

**Critério de aceite:**
- Toggle persistido em `localStorage`
- Default = Dark (alinhado ao Demo Day em ambiente escuro)
- Transição suave 180ms

---

## WEB-EP-02 · Componentes primitivos
**Goal:** Biblioteca de componentes reutilizáveis fiéis ao 03_DESIGN_SYSTEM.md.

### WEB-EP-02-FT-01 · Inputs e ações

#### WEB-EP-02-FT-01-US-01
**Como** dev, **quero** `<PrimaryButton>` reutilizável com props `label`, `icon`, `onClick`, `disabled`, **para que** todas as CTAs sigam o mesmo visual.

**Critério de aceite:**
- Fill Laranja + shadow Laranja 30%
- Texto sempre TextOnBrand (branco em qualquer tema)
- Estado disabled: opacity 0.5, sem shadow, cursor not-allowed
- Press feedback scale 1 → 0.97 → 1 (framer-motion)

#### WEB-EP-02-FT-01-US-02
**Como** dev, **quero** `<TextLink>` com underline Baunilha 55%, **para que** ações secundárias (Pular, Modo Demo, Cancelar) sejam consistentes.

### WEB-EP-02-FT-02 · Indicadores

#### WEB-EP-02-FT-02-US-01
**Como** dev, **quero** `<RiskBadge level="moderate">`, **para que** o badge de risco renderize com a cor semântica correta (Low/Moderate/High/Critical).

#### WEB-EP-02-FT-02-US-02
**Como** dev, **quero** `<ScoreBar value={58} label="Apneia" color="laranja">` animado, **para que** o breakdown da Result renderize barras fiéis ao Figma.

#### WEB-EP-02-FT-02-US-03
**Como** dev, **quero** `<ProgressRing percent={65}>` em SVG, **para que** o Loading exiba o donut de progresso com glow Laranja.

#### WEB-EP-02-FT-02-US-04
**Como** dev, **quero** `<ErrorGlyph severity="moderate" char="!">`, **para que** cada variante de erro tenha um glyph consistente.

---

## WEB-EP-03 · Telas e fluxo
**Goal:** Fluxo completo navegável Home → Loading → Questionnaire → Result, com tratamentos de erro.

### WEB-EP-03-FT-01 · Máquina de estados

#### WEB-EP-03-FT-01-US-01
**Como** dev, **quero** `SleepStateContext` com `uiState: 'idle' | 'loading' | 'questionnaire' | 'result' | 'error'`, **para que** a navegação espelhe o `MainViewModel.kt` Android.

**Critério de aceite:**
- Reducer puro `(state, event) → state` (testável em isolamento)
- Eventos: `START`, `PERMISSIONS_GRANTED`, `DATA_LOADED`, `QUESTIONNAIRE_DONE`, `RESET`, `ERROR(case)`
- `state.session`, `state.score`, `state.questionnaire` populam ao longo do fluxo

#### WEB-EP-03-FT-01-US-02
**Como** dev, **quero** `mockRepository.fetchLastNightSleep()` retornando o caso de apneia moderada após 1500ms, **para que** o Loading tenha duração crível na demo.

### WEB-EP-03-FT-02 · Tela Home

#### WEB-EP-03-FT-02-US-01
**Como** usuário, **quero** ver a Home com hero da lua, copy "Vamos analisar seu sono", CTA Iniciar análise e link Modo Demo, **para que** o app convide o uso na primeira impressão.

### WEB-EP-03-FT-03 · Tela Loading

#### WEB-EP-03-FT-03-US-01
**Como** usuário, **quero** ver o ring de progresso 0→100% com label "Lendo sua última noite" e lista de 3 fontes de dados (sono, FC, SpO2) progredindo, **para que** eu entenda o que o app está fazendo.

### WEB-EP-03-FT-04 · Tela Questionnaire

#### WEB-EP-03-FT-04-US-01
**Como** usuário, **quero** responder uma pergunta simples sobre minha queixa principal (6 opções) com radio cards, **para que** o score considere meu contexto.

**Critério de aceite:**
- react-hook-form + zod (schema com enum SleepComplaint)
- Botão Continuar desabilitado até seleção
- Botão Pular sempre disponível
- Progress bar reflete progresso (mockado em 1/9 para Demo)

### WEB-EP-03-FT-05 · Tela Result

#### WEB-EP-03-FT-05-US-01
**Como** usuário, **quero** ver Hero card com score 62/100, RiskBadge MODERADO, 3 métricas (6h12, 87%, 68bpm), **para que** eu compreenda meu status num só olhar.

**Critério de aceite:**
- Score counter animado 0→62 em 500ms
- Banner "MODO DEMO" amber sticky no topo
- Card sticky CTA "Nova análise" no rodapé

#### WEB-EP-03-FT-05-US-02
**Como** usuário, **quero** ver breakdown apneia 58% (Laranja) e insônia 32% (Menta) com barras animadas, **para que** eu saiba qual condição predomina.

#### WEB-EP-03-FT-05-US-03
**Como** usuário, **quero** ver card "Procure um especialista do sono" mencionando o Instituto do Sono (AFIP), **para que** o nível MODERADO direcione para próximo passo claro.

#### WEB-EP-03-FT-05-US-04
**Como** usuário, **quero** ver até 5 achados em linguagem leiga com marcadores › Laranja, **para que** eu leve informações concretas ao médico.

### WEB-EP-03-FT-06 · Telas de erro

#### WEB-EP-03-FT-06-US-01
**Como** usuário sem Health Connect, **quero** ver mensagem clara e CTA "Instalar Health Connect" (link mock), **para que** eu saiba o próximo passo.

#### WEB-EP-03-FT-06-US-02
**Como** usuário em dispositivo antigo, **quero** ver mensagem amigável ("Este Android ainda não roda o SleepScore") + apenas opção de Modo Demo, **para que** eu não me sinta culpado mas tenha caminho.

#### WEB-EP-03-FT-06-US-03
**Como** usuário que negou permissão, **quero** ver CTA "Abrir Configurações" + opção Modo Demo, **para que** eu mude de ideia sem reinstalar.

#### WEB-EP-03-FT-06-US-04
**Como** usuário sem sessão registrada, **quero** ver dica para usar o watch durante a noite + CTA Tentar novamente, **para que** o app me oriente.

---

## WEB-EP-04 · Animações e refino visual
**Goal:** Sensação fluida, próxima de produto pronto.

### WEB-EP-04-FT-01 · Transições entre telas

#### WEB-EP-04-FT-01-US-01
**Como** apresentador, **quero** transições fade+slide 220ms entre telas, **para que** o protótipo pareça polido.

### WEB-EP-04-FT-02 · Microinterações

#### WEB-EP-04-FT-02-US-01
**Como** usuário, **quero** o score counter contar 0→N com cubic ease-out 500ms, **para que** o momento "aha" da Result seja memorável.

#### WEB-EP-04-FT-02-US-02
**Como** usuário, **quero** as ScoreBars animadas (apneia primeiro, insônia 80ms depois), **para que** o breakdown ganhe ritmo.

#### WEB-EP-04-FT-02-US-03
**Como** usuário, **quero** o radio do OptionCard com bounce (overshoot 1.1) ao selecionar, **para que** o feedback tátil seja imediato.

---

## WEB-EP-05 · Onboarding clínico (Figma — 1ª onda)
**Goal:** Setup inicial uma vez por usuário coletando consentimento, perfil básico e baseline facial antes de chegar no fluxo principal.

> **Status atual:** especificado no Figma (página `02 Onboarding`). Implementação React em onda futura.

### WEB-EP-05-FT-01 · Welcome + consentimento

#### WEB-EP-05-FT-01-US-01
**Como** novo usuário, **quero** ver uma tela de boas-vindas que explique o valor do app, **para que** eu entenda o que está prestes a fazer.

#### WEB-EP-05-FT-01-US-02
**Como** usuário, **quero** consentir explicitamente o tratamento dos meus dados antes de qualquer coleta, **para que** o app respeite a LGPD (atende [[ADR-007]]).

**Critério de aceite:**
- Tela específica de consentimento com 4 pontos-chave
- Checkbox "Li e concordo" como pré-condição do CTA
- Link para termos completos

### WEB-EP-05-FT-02 · Perfil clínico básico

#### WEB-EP-05-FT-02-US-01
**Como** usuário, **quero** informar idade e sexo, **para que** o algoritmo de score seja mais preciso.

#### WEB-EP-05-FT-02-US-02
**Como** usuário, **quero** preencher peso/altura opcionalmente, **para que** eu não trave o fluxo se não souber agora.

### WEB-EP-05-FT-03 · Captura facial

#### WEB-EP-05-FT-03-US-01
**Como** usuário, **quero** ver instruções claras antes da câmera ligar, **para que** eu saiba o que esperar.

#### WEB-EP-05-FT-03-US-02
**Como** usuário, **quero** uma interface de câmera com frame de alinhamento + feedback em tempo real ("centralize", "mantenha-se parado"), **para que** a captura seja bem-sucedida em uma tentativa.

#### WEB-EP-05-FT-03-US-03
**Como** usuário consciente, **quero** ter certeza de que minha imagem **não** será armazenada — só os marcadores derivados (atende [[ADR-007]]).

### WEB-EP-05-FT-04 · Conclusão

#### WEB-EP-05-FT-04-US-01
**Como** usuário, **quero** ver um resumo do que foi configurado + CTA para o próximo passo (Pareamento), **para que** eu saiba o que falta.

---

## WEB-EP-06 · Pairing de wearable (Figma — 1ª onda)
**Goal:** Conexão do Apple Watch ou Galaxy Watch que substitui a abstração genérica "Health Connect" atual.

> **Status atual:** especificado no Figma (página `03 Pairing`). Implementação React em onda futura.

### WEB-EP-06-FT-01 · Descoberta

#### WEB-EP-06-FT-01-US-01
**Como** usuário, **quero** escolher entre Apple Watch e Galaxy Watch, **para que** o app saiba qual SDK ativar.

#### WEB-EP-06-FT-01-US-02
**Como** usuário, **quero** ver uma busca animada com a lista crescendo, **para que** eu confirme que o app está procurando ativamente.

#### WEB-EP-06-FT-01-US-03
**Como** usuário com vários relógios próximos, **quero** ver bateria + sinal de cada um, **para que** eu escolha o correto.

### WEB-EP-06-FT-02 · Conexão

#### WEB-EP-06-FT-02-US-01
**Como** usuário, **quero** ver os steps do pareamento (descoberta → handshake → permissões), **para que** eu entenda em que parte estou.

#### WEB-EP-06-FT-02-US-02
**Como** usuário, **quero** ver confirmação visual quando conectado + última noite disponível, **para que** eu queira ir direto para o resultado.

#### WEB-EP-06-FT-02-US-03
**Como** usuário que falhou no pareamento, **quero** ver troubleshooting acionável (Bluetooth, distância, permissões), **para que** eu resolva sem suporte.

### WEB-EP-06-FT-03 · Gestão do dispositivo (em curso · ADR-023)

> Telas e atalhos para o paciente ver e gerenciar o relógio depois do pareamento. Reflete o modelo de "relógio sempre conectado em segundo plano".

#### WEB-EP-06-FT-03-US-01 · Tela `/dispositivo` com hero de status
**Como** paciente, **quero** uma tela única que mostre nome do meu relógio, bateria e quando foi a última sincronização, **para que** eu saiba se o app está recebendo dados em dia.

**Critério de aceite:**
- Hero com nome (ex.: Galaxy Watch 6) + modelo + chip de status (Conectado / Offline / Sincronizando)
- Bateria com cor por faixa (>30 menta, 10-30 laranja, <10 vermelho)
- Última sync em linguagem relativa ("12 min atrás")

#### WEB-EP-06-FT-03-US-02 · Forçar sincronização
**Como** paciente, **quero** clicar em "Sincronizar agora" e ver feedback claro de progresso, **para que** eu force atualização quando precisar.

**Critério de aceite:**
- CTA primária com estado `Sincronizando...` por ~1.5s
- Ao concluir: atualiza timestamp da última sync para "agora"
- Bloqueia cliques duplicados durante sync

#### WEB-EP-06-FT-03-US-03 · Reconectar / trocar dispositivo
**Como** paciente que perdeu conexão, **quero** um CTA para reconectar, e um link para trocar de dispositivo, **para que** eu resolva sem precisar de suporte.

**Critério de aceite:**
- Quando status = Offline, CTA "Tentar reconectar" aparece no lugar de "Sincronizar"
- Link "Trocar de dispositivo" → fluxo `/pairing/select` existente

#### WEB-EP-06-FT-03-US-04 · Permissões granulares
**Como** paciente, **quero** ver quais dados o app lê do meu relógio (FC, SpO₂, sono, passos) e o estado de cada permissão, **para que** eu tenha controle e transparência.

**Critério de aceite:**
- Lista com ícone + label + chip "Liberado / Negado"
- "Negado" é visual de aviso (sem botão de toggle real na PoC — é mock)

#### WEB-EP-06-FT-03-US-05 · Atalhos da PatientHome
**Como** paciente, **quero** ver o status do relógio direto na home (sem precisar abrir menu), **para que** eu identifique problemas no glance.

**Critério de aceite:**
- Ícone no header (canto superior direito da Home) com mini-bateria + ponto colorido
- Mini-card horizontal acima do "Sua última noite" com nome + status + sync relativo + atalho "Sincronizar"
- Ambos navegam para `/dispositivo`

#### WEB-EP-06-FT-03-US-06 · `ResultScreen` força-sync
**Como** paciente vendo o relatório, **quero** poder atualizar os dados sem voltar tela, **para que** eu refresque o resultado se sentir que está antigo.

**Critério de aceite:**
- Substitui o antigo "Fazer nova análise" no rodapé do `ResultScreen`
- Novo label: "Atualizar dados do relógio"
- Mesmo feedback do `/dispositivo` (`Sincronizando...` → `Atualizado há instantes`)

---

## WEB-EP-07 · Sono AI (Figma — 2ª onda, futura)
**Goal:** Assistente IA flutuante acessível em todas as telas pós-onboarding.

> **Status:** definido em alto nível. Telas Figma em onda futura. [[ADR-008]] cobre a estratégia de mock por enquanto.

- Floating Action Button Menta com ícone de chat
- Bottom sheet de chat (preview) com 40% da altura
- Tela cheia expandida
- Mensagens com cards interativos (sugestões de ação)

---

## WEB-EP-08 · Polissonografia móvel (Figma — 3ª onda, futura)
**Goal:** Kit de polissonografia em casa quando paciente opta por modalidade móvel.

> **Status:** definido em alto nível. Telas Figma em onda futura. [[ADR-009]] cobre a fronteira de responsabilidade app vs. operação AFIP.

- Sugestão de exame (banner no Result em risco alto)
- Escolha de modalidade (presencial vs. móvel) — agora vive em `/exame/confirmar` ([[WEB-EP-12]]),
  **após** pré-diagnóstico + recomendação + aprovação (ver ADR-019). A modalidade de exame é
  independente da modalidade de atendimento.
- **Móvel** (só quando o paciente escolhe "receber em casa" na confirmação):
  - Confirmação do envio
  - Tracking dos equipamentos (timeline status)
  - Recebimento + agendamento de orientação técnica
  - Videochamada com técnico AFIP
  - Stream em tempo real durante o sono
  - Resultado preliminar

### WEB-EP-08-FT-04 · Exame multi-noite com canais clínicos (em curso · ADR-025)

> Polissonografia em casa pode estender até 7 noites para acurácia. Janela parametrizável; canais clínicos extras; acompanhamento dedicado.

#### WEB-EP-08-FT-04-US-01 · Canais clínicos no LiveStream
**Como** paciente em exame, **quero** ver os canais clínicos sendo coletados (não só vitais genéricos), **para que** eu confie que estou fazendo um exame de verdade.

**Critério de aceite:**
- Grid 2×4 com 8 canais: FC, SpO₂, movimento, temp + fluxo aéreo, esforço respiratório, posição, ronco
- Cada card com unidade própria e mini visual quando aplicável
- SOS técnico e botão Minimizar mantidos

#### WEB-EP-08-FT-04-US-02 · Tela de acompanhamento (`/polisso-movel/acompanhamento`)
**Como** paciente no meio de uma janela de 7 noites, **quero** uma tela que mostre em que noite estou, o que já foi coletado e o que vem, **para que** eu mantenha rotina sem perder referência.

**Critério de aceite:**
- Hero com noite N/total + status + início + devolução
- Timeline com cards por noite (concluída, atual, pendente), com AHI/SpO₂ por noite concluída
- Pré-resultado consolidado (AHI parcial, classificação provável, % de coleta)
- Saúde do equipamento (bateria + sinal) com atalho "Ver dados ao vivo"
- Instruções operacionais + "Chamar técnico"
- Bloco devolução + próximos passos (análise IA → laudo médico)

#### WEB-EP-08-FT-04-US-03 · Card de exame na Home
**Como** paciente em exame, **quero** ver o status do exame na Home, **para que** eu acompanhe sem precisar lembrar de abrir tela específica.

**Critério de aceite:**
- Aparece apenas quando `EXAM.state ∈ {in_progress, returning}`
- Posicionado abaixo do alerta de pré-diagnóstico
- Kicker + "Noite N de Y" + progress bar + CTA "Acompanhar exame"

#### WEB-EP-08-FT-04-US-05 · Tela do kit PSG (ADR-027)
**Como** paciente com o kit em casa, **quero** uma tela dedicada do equipamento que mostre canais ativos, onde os sensores vão e como pedir ajuda, **para que** eu use o aparelho com confiança.

**Critério de aceite:**
- Rota `/polisso-movel/dispositivo` com hero (modelo, status, bateria, sinal)
- 8 canais clínicos com indicador ativo/sem leitura
- Diagrama SVG dos sensores no corpo (faixa torácica, cânula, oxímetro, módulo central)
- Bloco devolução + suporte (chamar técnico)
- Acessada via `/dispositivo` (do relógio) — card "Também em uso" quando exame ativo

#### WEB-EP-08-FT-04-US-04 · Janela parametrizável
**Como** PO/dev, **quero** configurar a janela do exame (1 a 7 noites) num único ponto, **para que** apresentações cubram cenários diferentes sem refactor.

**Critério de aceite:**
- `src/data/examMock.js` expõe `EXAM.totalNights` e `EXAM.currentNight`
- Default da PoC: 7 noites
- Todas as telas (Home, Tracking, LiveStream) leem do mesmo mock

---

## WEB-EP-09 · Acompanhamento + Sleep Score (Figma — 4ª onda, em curso)
**Goal:** Camada de gamificação e engajamento pós-resultado. Conecta o app diário do paciente ao ciclo clínico AFIP via aderência a hábitos e tratamento.

> **Status:** construída em React. **Renomeada de "Sleep Coins" para "Sleep Score"** e **sem loja/moeda gastável** — gamificação por **pontos + níveis + ranking** (ver ADR-020).

> **Espelha:** Funcionalidade 05 (Acompanhamento) do mapa Instituto.

### WEB-EP-09-FT-01 · Sleep Score (gamificação)

#### WEB-EP-09-FT-01-US-01
**Como** paciente engajado, **quero** ver meu saldo de Sleep Coins em destaque, **para que** eu visualize meu progresso de aderência (atende [[ADR-010]]).

**Critério de aceite:**
- Hero card com saldo + delta semanal + chip de nível (Bronze/Prata/Ouro/Platina)
- Progress bar para próximo nível
- Moeda visual identitária (token `SunMoon`)

#### WEB-EP-09-FT-01-US-02
**Como** paciente, **quero** receber um insight do dia derivado dos meus dados, **para que** eu entenda padrões e ganhe coins ao aplicá-los.

**Critério de aceite:**
- Card destacado com tag de reward `+N ☾`
- Body explicativo com link causa→efeito (ex.: "FC noturna baixou porque…")
- 2 ações: "Aceitar desafio" (vira desafio ativo) + "Agora não"

#### WEB-EP-09-FT-01-US-03
**Como** paciente, **quero** ver até 3 desafios ativos com progresso e reward, **para que** eu saiba o que está em curso.

**Critério de aceite:**
- Cards com ícone + título + hint + progress bar colorida + tag de reward
- Até 3 visíveis na home Sleep Coins, com link "VER TODOS"

#### WEB-EP-09-FT-01-US-04
**Como** paciente, **quero** ver minhas conquistas recentes, **para que** eu sinta o progresso acumulado.

**Critério de aceite:**
- Timeline com data + descrição + valor ganho
- Reward sempre em SunMoon com símbolo ☾

#### WEB-EP-09-FT-01-US-05 — ~~Loja de recompensas~~ → **REMOVIDA** (ADR-020)
~~Como paciente, quero acessar uma loja de recompensas…~~ Descopada da PoC: a gamificação não tem mais moeda gastável nem loja. Substituída pela US-06 (Ranking).

#### WEB-EP-09-FT-01-US-06 · Ranking (leaderboard)
**Como** paciente engajado, **quero** ver minha posição num ranking semanal, **para que** eu tenha um eixo competitivo de engajamento (ADR-020).

**Critério de aceite:**
- Hero com posição (#N) + pontos + liga atual (ex.: Prata)
- Lista classificada com top participantes **anonimizados**, destacando "Você"
- Regra de subida de liga (ex.: top 3 sobem) + nota de privacidade (sem dados clínicos)

### WEB-EP-09-FT-02 · Régua WhatsApp + material educativo (futuro)

#### WEB-EP-09-FT-02-US-01
**Como** paciente, **quero** receber mensagens em D+0, D+5, D+30, D+90 com conteúdo relevante por etapa, **para que** eu mantenha aderência ao tratamento.

#### WEB-EP-09-FT-02-US-02
**Como** paciente em CPAP, **quero** acessar material educativo dentro do app, **para que** eu não perca o conteúdo quando precisar revisitar.

### WEB-EP-09-FT-03 · Histórico de tendências (em curso · ADR-021)

> Evolução da `NightsHistoryScreen` (rota `/score/historico`). Vira central de tendências com múltiplas métricas clínicas + histórico de desafios.

#### WEB-EP-09-FT-03-US-01 · Tabs de métrica
**Como** paciente, **quero** alternar entre métricas (Sono, Apneia, FC noturna, SpO2 mínima) num único histórico, **para que** eu compare dimensões clínicas sem trocar de tela.

**Critério de aceite:**
- Segmented control no topo com 4 tabs; ativa em laranja; demais em surface-2
- Trocar de tab mantém o range selecionado e a janela atual
- Cada métrica tem unidade própria (0-100, AHI, bpm, %)

#### WEB-EP-09-FT-03-US-02 · Range selecionável
**Como** paciente, **quero** escolher o range (Noite anterior · 7d · 15d · 30d), **para que** eu olhe a janela de tempo que faz sentido para mim.

**Critério de aceite:**
- Chips de range; 7d default
- Card comparativo mostra média do período + delta vs período anterior do mesmo tamanho
- "Noite anterior" colapsa para comparação 2 noites (ontem vs anteontem)

#### WEB-EP-09-FT-03-US-03 · Janela navegável de 7 dias
**Como** paciente, **quero** que o gráfico mostre 7 dias por vez mesmo em ranges maiores e eu navegar com setas, **para que** as barras não fiquem ilegíveis no celular.

**Critério de aceite:**
- Gráfico sempre renderiza ≤ 7 dias
- Setas `‹ ›` deslocam a janela de 7 em 7 quando range > 7d
- Indicador "dia X-Y de N" abaixo do gráfico
- Setas desabilitadas quando atinge as bordas (mais recente / mais antigo)

#### WEB-EP-09-FT-03-US-04 · Apneia com bandas de severidade
**Como** paciente, **quero** ver minha classificação de apneia por noite com referência visual de Normal/Leve/Moderada/Grave, **para que** eu entenda onde estou caindo na escala clínica.

**Critério de aceite:**
- Linha de AHI por noite com bandas horizontais coloridas (RiskLow/Mod/High/Critical)
- Legenda dos limiares (5/15/30 AHI) visível
- Mock representa apneia moderada (AHI entre 18-26 na maioria das noites)

#### WEB-EP-09-FT-03-US-05 · Histórico de desafios
**Como** paciente, **quero** ver o histórico dos meus desafios (concluídos, em curso, abandonados) com período e % final, **para que** eu reconheça meu padrão de aderência ao longo do tempo.

**Critério de aceite:**
- Seção "Desafios" abaixo do gráfico
- Cada linha: ícone + título + período (ex.: "01-13 jun") + status badge + %
- Estados: concluído (menta), em curso (laranja), abandonado (text-secondary/50)

### WEB-EP-09-FT-04 · Pré-diagnóstico algorítmico (em curso · ADR-024)

> Triagem automática feita pelo algoritmo só com dados do relógio (antes da consulta). Distinto do pós-consulta em `/exame/pre-diagnostico`.

#### WEB-EP-09-FT-04-US-01 · Card de alerta na Home
**Como** paciente que monitora pelo relógio, **quero** ver na Home um alerta quando o algoritmo detecta padrão compatível com apneia, **para que** eu não precise abrir relatórios para perceber o sinal.

**Critério de aceite:**
- Card logo após o header, com tom acolhedor (menta + laranja suave, sem alarmismo)
- Kicker "Pré-diagnóstico" + título "Detectamos sinais de apneia leve a moderada"
- 3 bullets com métricas (SpO₂ mínima, FC noturna vs baseline, duração média)
- Botão "Agendar atendimento" → `/agenda/atendimento`
- Link "Entender o pré-diagnóstico" → `/pre-diagnostico`

#### WEB-EP-09-FT-04-US-02 · Tela /pre-diagnostico
**Como** paciente, **quero** uma tela dedicada onde eu entenda o que o algoritmo detectou, com aviso de que não é diagnóstico, **para que** eu tome decisão informada de procurar especialista.

**Critério de aceite:**
- Aviso preliminar destacado: "isto não é diagnóstico, é triagem automática"
- Hero com gravidade detectada (apneia leve-moderada)
- Bloco de sinais detectados (métricas com cor semântica)
- Bloco "Por que isso importa" (educacional)
- Bloco "Próximos passos sugeridos" (consulta · triagem · exame)
- CTA primária "Agendar atendimento" + link "Tirar dúvidas com Sono AI"

#### WEB-EP-09-FT-04-US-03 · Distinção do pós-consulta
**Como** dev, **quero** que `/pre-diagnostico` (algorítmico, pré-consulta) e `/exame/pre-diagnostico` (pós-consulta) coexistam sem confusão, **para que** o paciente sempre veja o contexto certo.

**Critério de aceite:**
- Rotas distintas, telas diferentes
- Copy diferente: o algorítmico fala em "sinais", o pós-consulta fala em "achados consolidados"
- ADR-024 registra a distinção

---

## WEB-EP-10 · Triagem clínica detalhada (Figma — 5ª onda, futura)
**Goal:** Substituir o Questionnaire simplificado (EP-03) por triagem clínica completa: Epworth · STOP-BANG · ISI · Pittsburgh.

> **Status:** definido em alto nível. Telas Figma em onda futura.

> **Espelha:** Funcionalidade 02 (Triagem & Risco) do mapa Instituto — sub-jornada do paciente.

- Apresentação dos instrumentos (por que cada um)
- Epworth — 8 perguntas, escala 0-3
- STOP-BANG — 8 perguntas, sim/não
- ISI (Insomnia Severity Index) — 7 perguntas, escala 0-4
- Pittsburgh — qualidade subjetiva
- Score por instrumento + classificação automática
- Resumo enviado ao médico via cross-link [[WEB-EP-13]]

---

## WEB-EP-11 · Agenda de clínicas (Figma — 5ª onda, futura)
**Goal:** Paciente escolhe clínica, exame e horário; reserva bloqueia slot real-time no portal médico.

> **Status:** definido em alto nível. Telas Figma em onda futura.

> **Espelha:** Funcionalidade 03 (Agenda) do mapa Instituto — sub-jornada do paciente.

- Lista/mapa de clínicas com filtros (convênio · distância · disponibilidade)
- Detalhe da clínica (foto, equipe, exames oferecidos)
- Calendário de slots
- Confirmação com integração WhatsApp (D+0)
- Cross-link com agenda médica [[WEB-EP-13]] — slot fica indisponível imediatamente

---

## WEB-EP-12 · Atendimento, Exame & Laudo (Figma — 5ª onda, futura)
**Goal:** Da consulta à entrega do laudo: pós-atendimento (pré-diagnóstico → recomendação →
aprovação → confirmação do exame), exame presencial/móvel e pipeline IA + condutas.

> **Status:** fluxo pós-consulta **implementado em React** (ver ADR-019). Telas Figma em onda futura.

> **Espelha:** Funcionalidade 04 (Exame & Laudo) do mapa Instituto — sub-jornada do paciente.

- **Pós-atendimento (ADR-019), independente da modalidade de atendimento:**
  - Consulta agendada/realizada (bridge — converge teleconsulta e presencial)
  - Pré-diagnóstico (resumo dos achados da triagem + consulta + wearable — não é laudo)
  - Recomendação (médico + algoritmo convergindo na polissonografia)
  - Aprovação (assinatura médica sempre + cobertura Convênio/Particular)
  - Confirmação do exame + modalidade (Instituto / clínica parceira / casa) — kit só em "casa"
- Preparo detalhado pré-exame
- Status do exame (agendado → realizado → em laudo IA → laudo médico → liberado)
- Pipeline IA staging (transparência para o paciente)
- Diagnóstico final + condutas recomendadas
- Cross-link com [[WEB-EP-13]] — laudo só fica visível quando médico assina (FHIR R4)

### WEB-EP-12-FT-05 · Card pós-exame na Home + laudo enriquecido (em curso · ADR-026)

> Continuidade visual entre fim do exame e laudo final + laudo com visualizações clínicas e ações de follow-up.

#### WEB-EP-12-FT-05-US-01 · Card multi-estado na Home
**Como** paciente que terminou o exame, **quero** ver na Home o estado atual (IA analisando · pré-laudo com médico · laudo pronto), **para que** eu não perca o acompanhamento.

**Critério de aceite:**
- Card lê `EXAM.state`; 3 variantes pós-exame (`analyzing`, `reviewing`, `signed`)
- Cada variante: cor própria, ícone próprio, copy específica
- Click navega para a tela correspondente (`/exame/em-laudo-ia`, `/exame/em-revisao-medica`, `/exame/resultado`)

#### WEB-EP-12-FT-05-US-02 · Gráficos visuais no laudo
**Como** paciente lendo o laudo, **quero** ver visualmente IAH, eficiência, fases do sono e SpO₂, **para que** eu compreenda o exame sem ser médico.

**Critério de aceite:**
- IAH com bandas de severidade (5/15/30) e marcador do valor do paciente
- Gauge de eficiência (78%) com referência alvo 85%
- Hipnograma simplificado (N1/N2/N3/REM/Wake ao longo da noite)
- Curva SpO₂ com limiar 90% destacado

#### WEB-EP-12-FT-05-US-03 · Análise da IA distinta da médica
**Como** paciente, **quero** entender que o pré-laudo é gerado pelo algoritmo e depois validado pelo médico + Instituto, **para que** eu confie na qualidade do processo.

**Critério de aceite:**
- Seção "Análise gerada pela IA" antes da "Validação médica"
- Badge explicando o fluxo: pré-laudo (IA) → assinatura médico → validação Instituto

#### WEB-EP-12-FT-05-US-04 · Seção educacional
**Como** paciente leigo, **quero** uma seção que explique IAH, eficiência, fases e SpO₂ em linguagem clara, **para que** eu entenda o que cada número significa.

**Critério de aceite:**
- Bloco "O que cada número significa" com 4 sub-itens
- Cada item: definição curta + valores de referência clínicos
- Material base fornecido pela equipe clínica

#### WEB-EP-12-FT-05-US-05 · 3 ações de follow-up
**Como** paciente com laudo em mãos, **quero** acionar o médico para tratamento, **para que** eu não fique sem direcionamento.

**Critério de aceite:**
- 3 CTAs no rodapé: "Mensagem para Dr. Marcos" · "Agendar retorno" · "Tirar dúvidas com Sono AI"
- Cada CTA navega para destino próprio (mensagem mock, `/agenda/atendimento`, `/sono-ai/full`)

#### WEB-EP-12-FT-05-US-06 · Modal de preview do PDF
**Como** paciente, **quero** ver como o PDF do laudo fica antes de baixar, **para que** eu confirme o que estou compartilhando.

**Critério de aceite:**
- Botão "Baixar PDF" abre modal com preview estilizado
- 2 ações: "Baixar (window.print)" + "Enviar por email" (toast)
- Modal fecha com X ou clique fora

---

## WEB-EP-13 · Portal Médico C2 (Figma — 6ª onda, futura)
**Goal:** Espelhar **toda a jornada do médico prescritor** (5 sub-jornadas) num portal web responsivo.

> **Status:** definido em alto nível. [[ADR-011]] cobre a estratégia de escopo (Figma sim, React não).

> **Espelha:** Linha inferior completa do mapa Instituto — Médico Prescritor.

- M-01 Cadastro CRM/RQE/CNES + validação CFM
- M-02 Revisão de score do paciente + sugestão de CID-10
- M-03 Configuração de slots + Google Calendar + convênios aceitos
- M-04 Recebe EDF processado · IA staging 94% · HITL validation · assina laudo FHIR R4
- M-05 Dashboard KPIs · laudos pendentes · follow-up CPAP · registrar orientação

---

## Resumo

| Épico | Features | Stories | Prioridade | Fase |
|---|---|---|---|---|
| WEB-EP-01 Infraestrutura | 2 | 4 | Must | 1-2 |
| WEB-EP-02 Primitivos | 2 | 6 | Must | 3 |
| WEB-EP-03 Telas/Fluxo | 6 | 11 | Must | 4 |
| WEB-EP-04 Animações | 2 | 4 | Should | 5 |
| WEB-EP-05 Onboarding (Figma) | 4 | 8 | Should | Figma 1ª onda ✅ |
| WEB-EP-06 Pairing wearable (Figma) | 2 | 6 | Should | Figma 1ª onda ✅ |
| WEB-EP-07 Sono AI (Figma) | 1 | 4 | Could | Figma 2ª onda ✅ |
| WEB-EP-08 Polissonografia móvel (Figma) | 1 | 7 | Could | Figma 3ª onda ✅ |
| WEB-EP-09 Acompanhamento + Sleep Coins | 3 | 8 | Should | Figma 4ª onda ✅ |
| WEB-EP-10 Triagem clínica detalhada | — | TBD | Could | Figma 5ª onda |
| WEB-EP-11 Agenda clínicas | — | TBD | Could | Figma 5ª onda |
| WEB-EP-12 Exame & Laudo presencial | — | TBD | Could | Figma 5ª onda |
| WEB-EP-13 Portal Médico C2 | — | TBD | Could | Figma 6ª onda |
| **TOTAL implementado/em design** | **23+** | **47+** | | |

## Ordem de implementação sugerida

1. **WEB-EP-01** completo (setup + tokens + tema) ✅
2. **WEB-EP-02-FT-01-US-01** (PrimaryButton — primeiro componente arquétipo) ✅
3. **WEB-EP-03-FT-01** (máquina de estados + mock repo) ✅
4. **WEB-EP-03-FT-02** (Home — primeira tela end-to-end como prova de conceito) ✅
5. **WEB-EP-02 restante** (paralelo com WEB-EP-03) ✅
6. **WEB-EP-03-FT-03 a FT-05** (Loading, Questionnaire, Result) ✅
7. **WEB-EP-03-FT-06** (errors) ✅
8. **WEB-EP-04** (animações como camada final de polish) ✅
9. **WEB-EP-05 + WEB-EP-06** (Figma — 1ª onda) ✅
10. **WEB-EP-09** (Figma — 4ª onda, Sleep Coins + 4 telas adicionais) ✅
11. **WEB-EP-07** (Sono AI — 2ª onda) ✅
12. **WEB-EP-08** (Polissonografia móvel — 3ª onda) ✅
13. **WEB-EP-10 + WEB-EP-11 + WEB-EP-12** (jornada paciente clínica — 5ª onda) 🟨 ← AGORA
14. **WEB-EP-13** (Portal Médico C2 — 6ª onda) 🟨 ← AGORA
15. Implementação React das novas telas após validação Figma

> A Onda 4 (Sleep Coins) foi priorizada cedo porque conecta o app diário ao Acompanhamento clínico — fecha o loop de valor sem precisar do fluxo clínico completo já implementado.
