# Releases — Manual rápido

Como gerar, testar e publicar uma release versionada do protótipo Sono AI.

---

## TL;DR

```bash
# 1. gerar release local (bump + changelog + tag + zip)
npm run release:patch

# 2. testar o zip (descompacta numa pasta e roda):
cd <pasta-do-zip>
npx http-server@latest . -p 8080
# abre http://127.0.0.1:8080

# 3. se OK, pushar pro GitHub:
git push origin main
git push origin v<versao>
gh release create v<versao> sleepscore-v<versao>.zip --generate-notes
```

---

## O que o script de release faz

`scripts/release.mjs` executa, em ordem:

1. **Verifica working tree limpo** — aborta se tem mudanças não-commitadas
2. **Bumpa a versão** em `package.json` (e `package-lock.json` se existir)
3. **Gera entrada no `CHANGELOG.md`** agrupando commits desde a última tag por tipo (`feat` ✨, `fix` 🐛, `refactor` ♻️, `docs` 📚, `chore` 🔧)
4. **Commit** `chore(release): vX.Y.Z` com `package.json` + `CHANGELOG.md`
5. **Build** (`npm run build` — gera `dist/`)
6. **Zipa** `dist/` em `sleepscore-vX.Y.Z.zip`
7. **Cria tag local** `vX.Y.Z` (annotated)
8. **Imprime** os comandos manuais que você precisa rodar pra publicar

> O script **NÃO faz push**. Você executa manualmente — controle direto de quando o histórico aparece no remoto.

---

## Comandos npm

| Comando | Quando usar | Bump |
|---|---|---|
| `npm run release:patch` | Correção, ajuste de copy, fix de UX | `0.1.0` → `0.1.1` |
| `npm run release:minor` | Nova tela, nova feature compatível | `0.1.0` → `0.2.0` |
| `npm run release:major` | Quebra de compatibilidade, mudança grande | `0.1.0` → `1.0.0` |

---

## Passo a passo completo

### 1. Antes de tudo, working tree limpo

```bash
git status
# nada non-staged. Se tem, commita ou stash.
```

### 2. Roda o release

```bash
npm run release:patch
```

Saída esperada:

```
✓ Versão: 0.1.1 → 0.1.2
✓ CHANGELOG.md atualizado (3 commits desde v0.1.1)
$ git add package.json CHANGELOG.md package-lock.json
$ git commit -m "chore(release): v0.1.2"
... build ...
✓ Zip criado: C:\...\sleepscore-v0.1.2.zip
✓ Tag local: v0.1.2

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Release v0.1.2 preparada localmente.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Próximos passos (você executa manualmente):
  git push origin main
  git push origin v0.1.2
  gh release create v0.1.2 sleepscore-v0.1.2.zip --title "v0.1.2" --generate-notes
  rm sleepscore-v0.1.2.zip
```

### 3. Testar o zip antes de publicar

Antes de subir pro GitHub, abre o zip e testa que ele realmente funciona:

```powershell
# Windows PowerShell — extrai e roda
Expand-Archive -Path sleepscore-v0.1.2.zip -DestinationPath C:\Users\<voce>\Downloads\sleepscore-v0.1.2
cd C:\Users\<voce>\Downloads\sleepscore-v0.1.2
npx http-server@latest . -p 8080
```

Abre `http://127.0.0.1:8080` no browser e clica na jornada toda — Home → Pré-diag → Score → Exame → Laudo. Se algo der erro 404 ou tela branca, **NÃO publica** — debug primeiro.

> ⚠️ **Não abre `index.html` direto via `file://`.** SPA com React Router não funciona assim — você verá tela branca e erros 404 dos assets no console. Precisa de servidor HTTP.

### 4. Publicar

Se o teste passou:

```bash
git push origin main           # commit do bump + changelog
git push origin v0.1.2          # tag
gh release create v0.1.2 sleepscore-v0.1.2.zip \
  --title "v0.1.2" \
  --generate-notes
```

`gh release create` cria a release no GitHub, anexa o zip como asset e gera notas automáticas a partir dos commits.

### 5. Limpar local

```bash
rm sleepscore-v0.1.2.zip
```

---

## Servir o zip localmente — opções

Qualquer servidor HTTP funciona, mas precisa de **SPA fallback** (servir `index.html` em rotas profundas):

| Comando | Porta padrão | SPA fallback? |
|---|---|---|
| `npx http-server@latest . -p 8080` | 8080 | ✅ automático |
| `npx serve@latest -s .` | 3000 | ✅ com `-s` |
| `python -m http.server 8000` | 8000 | ❌ rotas profundas dão 404 |
| `npx vite preview` (na raiz do repo) | 4173 | ✅ |

`vite preview` é o que usei pra testar — mas precisa rodar dentro do repo, não dentro do zip.

---

## Gotchas

| Sintoma | Causa | Fix |
|---|---|---|
| Tela branca abrindo `index.html` via `file://` | Browsers traduzem `/` pra raiz do disco | Use servidor HTTP (`http-server` ou `serve -s`) |
| 404 em rotas profundas (`/exame/resultado`) | Sem SPA fallback | Use `serve -s` ou `http-server` (que já faz fallback) |
| `npm error could not determine executable` ao rodar `npx server@latest` | Pacote chama-se `serve`, não `server` | `npx serve@latest -s .` |
| `Working tree não está limpo` no release | Tem mudança não-commitada | `git status`, commit ou stash, tenta de novo |
| Tag já existe (release rodou 2x) | Tag local não foi removida | `git tag -d v0.1.2` antes de re-rodar |
| Build quebra com import error | Asset path errado, falta dependência | `rm -rf node_modules && npm install && npm run build` |

---

## Onde mora cada coisa

```
scripts/release.mjs          # o script
package.json                 # versão atual + scripts npm
CHANGELOG.md                 # histórico de releases (gerado pelo script)
dist/                        # output do build (gitignored)
sleepscore-v*.zip            # artefato (gitignored)
public/staticwebapp.config.json  # SPA fallback config (pro Azure SWA)
docs/deploy_azure.md         # como hospedar no Azure (gitignored)
```

---

## Próximos passos sugeridos

- **Automatizar o push** num GitHub Action (gatilho: pushar tag `v*` → cria release automaticamente)
- **Validar o zip** rodando smoke tests automáticos antes do `gh release create`
- **Atrelar deploy automático** pro Azure SWA quando uma release nova for criada
