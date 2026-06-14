#!/usr/bin/env node
// scripts/release.mjs
// Gera uma release versionada: bump em package.json, append CHANGELOG,
// commit, build, zipa dist/, cria tag local.
// NÃO faz push — o usuário executa `git push` e `gh release create` manualmente.
//
// Uso:
//   node scripts/release.mjs patch    # 0.1.0 → 0.1.1
//   node scripts/release.mjs minor    # 0.1.0 → 0.2.0
//   node scripts/release.mjs major    # 0.1.0 → 1.0.0

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';

const cwd = process.cwd();
const pkgPath = resolve(cwd, 'package.json');

const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const DIM = '\x1b[2m';

function info(msg) { console.log(`${CYAN}ℹ${RESET} ${msg}`); }
function ok(msg) { console.log(`${GREEN}✓${RESET} ${msg}`); }
function warn(msg) { console.log(`${YELLOW}⚠${RESET} ${msg}`); }
function die(msg) {
  console.error(`${RED}✗${RESET} ${msg}`);
  process.exit(1);
}

function sh(cmd, opts = {}) {
  return execSync(cmd, { stdio: 'pipe', encoding: 'utf8', ...opts }).trim();
}

function shVerbose(cmd) {
  console.log(`${DIM}$ ${cmd}${RESET}`);
  execSync(cmd, { stdio: 'inherit' });
}

// ---------------------------------------------------------- 1. Parse args
const bump = process.argv[2];
if (!['patch', 'minor', 'major'].includes(bump)) {
  die('Uso: node scripts/release.mjs [patch|minor|major]');
}

// ---------------------------------------------------------- 2. Verifica git limpo
const status = sh('git status --porcelain');
if (status) {
  die(`Working tree não está limpo. Commit ou stashe antes:\n${status}`);
}

// ---------------------------------------------------------- 3. Branch atual (aviso se exótico)
const branch = sh('git rev-parse --abbrev-ref HEAD');
if (!['main', 'dev'].includes(branch)) {
  warn(`Você está na branch "${branch}" (não main/dev). Continuando...`);
}

// ---------------------------------------------------------- 4. Bump version
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
const oldVer = pkg.version;
const [maj, min, pat] = oldVer.split('.').map(Number);
let newVer;
if (bump === 'major') newVer = `${maj + 1}.0.0`;
else if (bump === 'minor') newVer = `${maj}.${min + 1}.0`;
else newVer = `${maj}.${min}.${pat + 1}`;
pkg.version = newVer;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
ok(`Versão: ${oldVer} → ${newVer}`);

// ---------------------------------------------------------- 5. CHANGELOG
let lastTag = null;
try { lastTag = sh('git describe --tags --abbrev=0'); } catch { /* sem tag anterior */ }

const range = lastTag ? `${lastTag}..HEAD` : 'HEAD';
const rawLog = sh(`git log ${range} --no-merges --pretty=format:"%s|%h"`);

const entries = rawLog
  .split('\n')
  .filter(Boolean)
  .map(line => {
    const [subject, hash] = line.split('|');
    return { subject: subject.trim(), hash: hash.trim() };
  });

const groups = { feat: [], fix: [], refactor: [], docs: [], chore: [], other: [] };
for (const e of entries) {
  const m = e.subject.match(/^(\w+)(?:\([^)]+\))?:\s*(.+)$/);
  const type = m ? m[1].toLowerCase() : 'other';
  const text = m ? m[2] : e.subject;
  const bucket = groups[type] || groups.other;
  bucket.push({ text, hash: e.hash, fullType: m ? m[1] : null });
}

const today = new Date().toISOString().slice(0, 10);
let entry = `## [${newVer}] — ${today}\n\n`;

const labels = {
  feat: '✨ Features',
  fix: '🐛 Fixes',
  refactor: '♻️ Refactor',
  docs: '📚 Docs',
  chore: '🔧 Chore',
  other: 'Outros',
};

let totalCommits = 0;
for (const [k, label] of Object.entries(labels)) {
  const list = groups[k];
  if (!list.length) continue;
  entry += `### ${label}\n\n`;
  for (const item of list) {
    entry += `- ${item.text} (\`${item.hash}\`)\n`;
    totalCommits++;
  }
  entry += '\n';
}
if (totalCommits === 0) {
  warn('Nenhum commit desde a última tag. Adicionando entry vazia.');
  entry += `_Sem mudanças significativas._\n\n`;
}

const changelogPath = resolve(cwd, 'CHANGELOG.md');
const header = '# Changelog\n\nTodas as mudanças notáveis deste projeto serão documentadas neste arquivo.\n\nO formato segue [Keep a Changelog](https://keepachangelog.com/) e este projeto adere a [Semantic Versioning](https://semver.org/).\n\n';

let prev = '';
if (existsSync(changelogPath)) {
  prev = readFileSync(changelogPath, 'utf8');
  if (prev.startsWith(header)) prev = prev.slice(header.length);
}
writeFileSync(changelogPath, header + entry + prev);
ok(`CHANGELOG.md atualizado (${totalCommits} commits desde ${lastTag || 'início'})`);

// ---------------------------------------------------------- 6. Commit version + changelog
const filesToAdd = ['package.json', 'CHANGELOG.md'];
if (existsSync(resolve(cwd, 'package-lock.json'))) filesToAdd.push('package-lock.json');
shVerbose(`git add ${filesToAdd.join(' ')}`);
shVerbose(`git commit -m "chore(release): v${newVer}"`);

// ---------------------------------------------------------- 7. Build
info('Rodando build...');
shVerbose('npm run build');

// ---------------------------------------------------------- 8. Zip dist/
const distDir = resolve(cwd, 'dist');
if (!existsSync(distDir)) die('dist/ não existe após o build');

const zipName = `sleepscore-v${newVer}.zip`;
const zipPath = resolve(cwd, zipName);
info(`Compactando dist/ → ${zipName}`);
if (process.platform === 'win32') {
  // Windows: usa PowerShell Compress-Archive
  const psCmd = `Compress-Archive -Path 'dist\\*' -DestinationPath '${zipName}' -Force`;
  shVerbose(`powershell -NoProfile -Command "${psCmd}"`);
} else {
  // Unix: usa zip
  shVerbose(`cd dist && zip -r "../${zipName}" . && cd ..`);
}
ok(`Zip criado: ${zipPath}`);

// ---------------------------------------------------------- 9. Tag local
shVerbose(`git tag -a v${newVer} -m "Release v${newVer}"`);
ok(`Tag local: v${newVer}`);

// ---------------------------------------------------------- 10. Próximos passos
console.log(`\n${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`);
console.log(`${GREEN}Release v${newVer} preparada localmente.${RESET}`);
console.log(`${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}\n`);

console.log(`${CYAN}Próximos passos (você executa manualmente):${RESET}\n`);
console.log(`  ${DIM}# 1. Push da branch + tag${RESET}`);
console.log(`  git push origin ${branch}`);
console.log(`  git push origin v${newVer}\n`);
console.log(`  ${DIM}# 2. Criar GitHub release com o zip${RESET}`);
console.log(`  gh release create v${newVer} ${zipName} \\`);
console.log(`    --title "v${newVer}" \\`);
console.log(`    --generate-notes\n`);
console.log(`  ${DIM}# 3. (opcional) Limpar o zip local depois do upload${RESET}`);
console.log(`  rm ${zipName}\n`);
