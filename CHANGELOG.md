# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato segue [Keep a Changelog](https://keepachangelog.com/) e este projeto adere a [Semantic Versioning](https://semver.org/).

## [0.1.1] — 2026-06-14

### ✨ Features

- tela /polisso-movel/dispositivo simétrica à do relógio (ADR-027) (`13319d6`)
- card multi-estado na Home + laudo enriquecido (ADR-026) (`72e4130`)
- exame multi-noite com canais clínicos + tracking + card na Home (ADR-025) (`bf4998d`)
- alerta na Home + tela /pre-diagnostico (ADR-024) (`1a17281`)
- modelo "relógio sempre conectado" + tela /dispositivo (ADR-023) (`7fb4ec1`)
- histórico vira central de tendências (ADR-021) (`4f9e098`)
- assistente flutuante (FAB + chat) + scripts npm dev/prototipo (`e3218cb`)
- remove loja e moeda; renomeia Sleep Coins -> Sleep Score; adiciona Ranking (ADR-020) (`be1f7e6`)

### ♻️ Refactor

- /coins/* → /score/* (ADR-022) (`674b43f`)

### 🔧 Chore

- script de release versionada (semver + changelog + tag + zip) (`e823cc1`)
- ignora backups versionados do pptx (backup-*.pptx) (`b8b6137`)
- ignora binários do TechDay + modo ?capture e ajuste de chat (`ccb2d27`)
- organiza raiz - docs em docs/, screenshots em docs/screenshots/ (`f414ff1`)
- estado inicial do protótipo Instituto do Sono (fluxo atendimento->exame, ADR-019) (`25e2aef`)

