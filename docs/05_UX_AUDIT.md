# Auditoria de UX — Jornada do Paciente

> Produzida por auditoria automatizada (workflow paralelo) em 2026-06-12.
> Avalia a jornada completa do paciente do protótipo React.

## Pontos fortes identificados

- Tom de voz acolhedor e em 1ª pessoa do plural ("Vamos te conhecer", "Pronto pra rodar") — humaniza um tema ansiogênico (apneia/insônia).
- Transparência de privacidade exemplar: ConsentScreen lista pontos LGPD claros ANTES de qualquer coleta; reforço no rodapé da Home.
- Feedback de progresso forte em esperas: LoadingScreen (3 fontes done/loading/pending), ConnectingScreen (checklist de handshake).
- Telas de erro ricas e orientadas a ação: 5 casos distintos, cada um com copy/glifo/CTA + sempre saída "modo demo".
- Continuidade narrativa entre épicos clínicos (Triagem → Agenda → Exame → Laudo) com dados que se repetem (Dr. Marcos Rocha, protocolo, IAH 18.2, CID G47.33).
- Gamificação integrada de forma natural (Sleep Coins, desafios, insights).

## Problemas (severidade) e status da correção

| # | Sev | Onde | Problema | Status |
|---|---|---|---|---|
| 1 | ALTA | Rota `/` + CTAs "voltar para home" | `/` era índice de dev; CTAs do paciente despejavam o usuário numa lista de QA após momentos emocionais | ✅ **Corrigido** — criada `PatientHomeScreen` em `/inicio`; 5 CTAs órfãos (NextSteps, ChatFull, PairedSuccess, PairingError, LiveStream) redirecionados |
| 2 | ALTA | Épico Exame & Laudo | CTAs "mentem" — label diz uma coisa, onClick faz outra (avança/recua tela) | 🟡 **Parcial** — fluxo encadeado mantido; alinhamento label×destino fino pendente (ver Próximo passe) |
| 3 | ALTA | Conexão entre épicos | Épicos eram ilhas só acessíveis pelo índice de dev | ✅ **Corrigido** — Result → "Aprofundar com triagem clínica" → /triagem/intro; NextSteps → "Acompanhar meu tratamento" → /score; PatientHome conecta tudo |
| 4 | MÉDIA | DiagnosisScreen | Diagnóstico de AOS entregue sem amortecimento emocional | ✅ **Corrigido** — card empático "Respire fundo: você está no caminho certo. A apneia moderada é comum e tem tratamento eficaz" + atalho Sono AI |
| 5 | MÉDIA | Onboarding "Etapa X de 5" | Contagem inconsistente (1,2,3 → 5/5, sem 4) | 🟡 **Pendente** — quick win para próximo passe |
| 6 | MÉDIA | Sono AI transições | ChatFull fechava em `/`; InsightCard inalcançável pelo fluxo | ✅ **Parcial** — ChatFull agora fecha em /app/result (volta ao contexto) |
| 7 | BAIXA | TriagemScore CTA morto | "Ver meu laudo completo" tinha onClick vazio | ✅ **Corrigido** — vira "Tirar dúvidas com o Sono AI" → /sono-ai/full |
| 8 | BAIXA | PairingError órfã | Só alcançável pelo índice de dev | 🟡 **Pendente** — adicionar gatilho em DevicesFound para demo |
| 9 | BAIXA | CTAs fantasma (PDF, compartilhar) | Botões sem efeito real dão impressão de app quebrado | 🟡 **Parcial** — removido "Compartilhar" fantasma do Result; toasts "em breve" pendentes |

## Correções aplicadas nesta rodada (2026-06-12)

1. **`PatientHomeScreen` (`/inicio`)** — hub da jornada: saudação, card da última noite (62/100), 5 atalhos (Nova análise, Triagem, Sono AI, Sleep Coins, Agendar exame).
2. **Redirect dos 5 CTAs órfãos** de `/` (índice dev) para `/inicio` ou destino contextual.
3. **Botão Home do PhoneShell** → `/inicio` (paciente), não mais o índice de dev. Debug menu ganhou grupo "Navegação" com ambos.
4. **Costura Result → Triagem** — encadeia a jornada clínica.
5. **Humanização do DiagnosisScreen** — enquadramento empático + atalho Sono AI.
6. **CTA morto resolvido** no TriagemScore.
7. **Bug corrigido** — `ensureResult()` chamava setState durante render (warning React); agora é função pura.

## Segundo passe (aplicado 2026-06-12) — todas as pendências resolvidas

- ✅ **#2** Label×destino alinhados nos CTAs do exame: DiagnosisScreen ("Ver próximos passos" primário, "Baixar PDF" → toast), ScheduledScreen ("Acompanhar meu exame"), BookingConfirm ("Continuar para o preparo"). CTAs de download/compartilhar viram toast "em breve".
- ✅ **#5** Contador Onboarding normalizado: 1→2→3→4 de 4 (captura facial = 1 etapa em 2 telas); barra de progresso reflete o mesmo total.
- ✅ **#8** PairingError demonstrável: tocar no dispositivo desconhecido ("GW-A23F1") em DevicesFound leva ao erro de pareamento.
- ✅ **#9** Toasts "em breve" nos CTAs sem backend (Baixar PDF, Exportar PDF, Compartilhar, Pareamento manual, Adicionar ao calendário) via toast próprio event-based ([[ADR-016]]).

### Pendências remanescentes (menores)
- Estados vazios/primeira-vez em NightsHistory e Coins (paciente novo sem histórico) — baixa prioridade para a demo.

## Top recomendações priorizadas (do auditor)

1. ✅ Home do paciente real + redirecionar "voltar para home" — **feito**.
2. 🟡 Alinhar label×destino dos CTAs (Exame, PDF, compartilhar) — parcial.
3. ✅ Costurar épicos numa jornada-mestre encadeada — **feito** (Result→Triagem, NextSteps→Coins, hub).
4. ✅ Humanizar o diagnóstico + traduzir jargão — **feito** (card empático).
5. 🟡 Corrigir inconsistências de confiança (contador, CTA morto, falha demonstrável) — CTA morto feito; resto pendente.
