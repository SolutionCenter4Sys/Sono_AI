import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Trophy, TrendingUp, TrendingDown, Minus, Shield } from 'lucide-react';
import TextLink from '@/components/primitives/TextLink.jsx';

/**
 * 08.3 Ranking — leaderboard semanal da gamificação (Sleep Score).
 * Substitui a antiga "Loja de recompensas" (ver ADR-020): a gamificação fica
 * só em ranking + desafios + níveis, sem moeda gastável.
 * Nomes anonimizados (privacidade) — dados mockados.
 */
const LEAGUE = { name: 'Liga Prata', daysLeft: 3 };

const PLAYERS = [
  { rank: 1, name: 'Marina S.', pts: 2480, delta: 'up', me: false },
  { rank: 2, name: 'Carlos T.', pts: 2190, delta: 'up', me: false },
  { rank: 3, name: 'Ana P.', pts: 1870, delta: 'down', me: false },
  { rank: 4, name: 'Você', pts: 1250, delta: 'up', me: true },
  { rank: 5, name: 'Rafael M.', pts: 1120, delta: 'same', me: false },
  { rank: 6, name: 'Beatriz L.', pts: 980, delta: 'down', me: false },
  { rank: 7, name: 'Diego F.', pts: 870, delta: 'up', me: false },
];

const DELTA = {
  up: { icon: TrendingUp, color: 'menta' },
  down: { icon: TrendingDown, color: 'risk-moderate' },
  same: { icon: Minus, color: 'baunilha' },
};

function initials(name) {
  if (name === 'Você') return 'EU';
  return name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();
}

export default function RankingScreen() {
  const navigate = useNavigate();
  const me = PLAYERS.find((p) => p.me);

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between px-4 pt-4 pb-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Voltar"
          className="grid h-10 w-10 place-items-center rounded-full bg-surface-2/60 text-text-primary/90 transition hover:bg-surface-2"
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>
        <span className="text-[12px] font-semibold uppercase tracking-kicker text-baunilha/70">
          Ranking
        </span>
        <span className="h-10 w-10" aria-hidden />
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {/* Hero — sua posição */}
        <section className="rounded-card-lg bg-surface p-6 text-center">
          <div className="flex flex-col items-center">
            <span
              className="grid h-[64px] w-[64px] place-items-center rounded-full"
              style={{
                backgroundColor: 'hsl(var(--sun-moon) / 0.22)',
                boxShadow: '0 0 28px hsl(var(--sun-moon) / 0.35)',
              }}
            >
              <Trophy size={28} className="text-sun-moon" />
            </span>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
              Sua posição na semana
            </p>
            <div className="mt-1 flex items-end justify-center gap-2">
              <span className="text-[52px] font-bold leading-none tracking-tight">
                #{me.rank}
              </span>
              <span className="mb-1.5 text-sm text-baunilha/60">de {PLAYERS.length}</span>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              <span
                className="rounded-pill px-3 py-1.5 text-[11px] font-semibold"
                style={{ backgroundColor: 'hsl(var(--menta) / 0.16)', color: 'hsl(var(--menta))' }}
              >
                {me.pts.toLocaleString('pt-BR')} pts
              </span>
              <span className="inline-flex items-center gap-1 rounded-pill bg-surface-2/70 px-3 py-1.5 text-[11px] font-semibold text-baunilha/80">
                <Shield size={12} className="text-baunilha/70" /> {LEAGUE.name}
              </span>
            </div>
          </div>
        </section>

        {/* Regra da liga */}
        <section
          className="mt-4 flex items-start gap-2.5 rounded-card border p-4"
          style={{ backgroundColor: 'hsl(var(--menta) / 0.10)', borderColor: 'hsl(var(--menta) / 0.3)' }}
        >
          <TrendingUp size={16} className="mt-0.5 shrink-0 text-menta" />
          <p className="text-[12.5px] leading-[1.45] text-text-primary/85">
            Os <strong className="font-semibold text-menta">3 primeiros</strong> sobem para a Liga
            Ouro no fim da semana — faltam {LEAGUE.daysLeft} dias.
          </p>
        </section>

        {/* Leaderboard */}
        <h3 className="mt-6 mb-3 text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
          Classificação · {LEAGUE.name}
        </h3>
        <div className="flex flex-col gap-2">
          {PLAYERS.map((p) => {
            const d = DELTA[p.delta];
            const top3 = p.rank <= 3;
            return (
              <div
                key={p.rank}
                className="flex items-center gap-3 rounded-card p-3 border"
                style={{
                  backgroundColor: p.me ? 'hsl(var(--laranja) / 0.10)' : 'hsl(var(--surface))',
                  borderColor: p.me ? 'hsl(var(--laranja) / 0.55)' : 'hsl(var(--surface-2) / 0.4)',
                }}
              >
                <span
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[13px] font-bold"
                  style={{
                    backgroundColor: top3 ? 'hsl(var(--sun-moon) / 0.18)' : 'transparent',
                    color: top3 ? 'hsl(var(--sun-moon))' : 'hsl(var(--baunilha) / 0.6)',
                  }}
                >
                  {p.rank}
                </span>
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[12px] font-bold"
                  style={{
                    backgroundColor: p.me ? 'hsl(var(--laranja))' : 'hsl(var(--surface-2))',
                    color: p.me ? 'hsl(var(--text-on-brand))' : 'hsl(var(--baunilha) / 0.85)',
                  }}
                >
                  {initials(p.name)}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className="block text-[14px] font-semibold"
                    style={{ color: p.me ? 'hsl(var(--laranja))' : 'hsl(var(--text-primary) / 0.95)' }}
                  >
                    {p.name}
                  </span>
                  <span className="block text-[11.5px] text-baunilha/55">
                    {p.pts.toLocaleString('pt-BR')} pts
                  </span>
                </span>
                <d.icon size={16} style={{ color: `hsl(var(--${d.color}))` }} />
              </div>
            );
          })}
        </div>

        <p className="mt-5 text-center text-[11px] leading-[1.5] text-baunilha/45">
          Nomes anonimizados. O ranking reflete seus pontos de hábitos e adesão — não compartilha
          dados clínicos.
        </p>
      </div>

      <footer className="px-5 pb-5 pt-3">
        <div className="flex justify-center">
          <TextLink onClick={() => navigate('/score')}>Voltar para o Sleep Score</TextLink>
        </div>
      </footer>
    </div>
  );
}
