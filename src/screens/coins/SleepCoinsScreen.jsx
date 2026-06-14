import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, HelpCircle, Sparkles, CheckSquare, Moon, Wind, Trophy } from 'lucide-react';
import TextLink from '@/components/primitives/TextLink.jsx';

/**
 * 08.1 Sleep Score — pontuação, insight do dia, desafios ativos.
 * Gamificação por pontos + níveis + ranking (sem loja/moeda gastável — ver ADR-020).
 * Figma 40:3.
 */
export default function SleepCoinsScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      <TopBar navigate={navigate} />

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        {/* Saldo */}
        <section className="relative mt-1 overflow-hidden rounded-card-lg bg-surface p-6 text-center">
          <div className="flex flex-col items-center">
            <div
              className="grid h-[64px] w-[64px] place-items-center rounded-full"
              style={{
                backgroundColor: 'hsl(var(--sun-moon) / 0.22)',
                boxShadow: '0 0 28px hsl(var(--sun-moon) / 0.35)',
              }}
            >
              <Moon size={30} className="text-sun-moon" fill="hsl(var(--sun-moon))" />
            </div>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
              Seus pontos
            </p>
            <div className="mt-1 flex items-end justify-center gap-2">
              <span className="text-[52px] font-bold leading-none tracking-tight">1.250</span>
              <span className="mb-1.5 text-sm text-baunilha/60">pts</span>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              <span
                className="rounded-pill px-3 py-1.5 text-[11px] font-semibold"
                style={{
                  backgroundColor: 'hsl(var(--menta) / 0.16)',
                  color: 'hsl(var(--menta))',
                }}
              >
                ↑ +180 esta semana
              </span>
              <span className="rounded-pill bg-surface-2/70 px-3 py-1.5 text-[11px] font-semibold text-baunilha/80">
                ★ Nível Prata
              </span>
            </div>

            <div className="mt-5 w-full">
              <div className="mb-1.5 flex items-center justify-between text-[11px]">
                <span className="text-baunilha/60">250 para nível Ouro</span>
                <span className="font-semibold text-menta">83%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-pill bg-surface-2">
                <div className="h-full rounded-pill bg-menta" style={{ width: '83%' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Insight do dia */}
        <section className="mt-4 rounded-card border border-menta/25 bg-surface p-5">
          <div className="flex items-center gap-2">
            <span
              className="grid h-6 w-6 place-items-center rounded-lg"
              style={{ backgroundColor: 'hsl(var(--menta) / 0.16)' }}
            >
              <Sparkles size={13} className="text-menta" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
              Insight do dia
            </span>
            <span className="rounded-pill bg-sun-moon/15 px-2 py-0.5 text-[10px] font-bold text-sun-moon">
              +30 pts
            </span>
          </div>
          <h2 className="mt-3 text-[18px] font-bold leading-snug">
            Sua FC noturna baixou 4 bpm
          </h2>
          <p className="mt-2 text-[13px] leading-[1.5] text-baunilha/65">
            Provavelmente porque você dormiu sem cafeína à tarde nas últimas 3 noites.
            Manter esse hábito vale 30 pontos por semana.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/score/challenge/sem-cafeina')}
              className="inline-flex items-center gap-1.5 rounded-button px-4 py-2.5 text-[13px] font-semibold text-menta"
              style={{ backgroundColor: 'hsl(var(--menta) / 0.16)' }}
            >
              Aceitar desafio →
            </button>
            <button
              type="button"
              className="text-[13px] font-medium text-baunilha/55"
            >
              Agora não
            </button>
          </div>
        </section>

        {/* Desafios ativos */}
        <div className="mt-7 flex items-center justify-between">
          <h3 className="text-[17px] font-bold">Desafios ativos</h3>
          <TextLink onClick={() => navigate('/score/historico')}>Ver todos</TextLink>
        </div>

        <div className="mt-3 flex flex-col gap-2.5">
          <ChallengeRow
            icon={<CheckSquare size={18} className="text-baunilha/80" />}
            iconBg="hsl(var(--surface-2))"
            title="Dormir 8h por 5 noites seguidas"
            subtitle="3 noites concluídas · 2 restantes"
            reward="+150"
            footLabel="Faltam 2 noites"
            percent={60}
            color="menta"
            onClick={() => navigate('/score/challenge/sem-cafeina')}
          />
          <ChallengeRow
            icon={<Moon size={18} className="text-sun-moon" />}
            iconBg="hsl(var(--sun-moon) / 0.18)"
            title="Sem cafeína após 14h por 7 dias"
            subtitle="Hábito que reduz FC noturna"
            reward="+200"
            footLabel="3 de 7 dias"
            percent={42}
            color="risk-moderate"
            onClick={() => navigate('/score/challenge/sem-cafeina')}
          />
          <ChallengeRow
            icon={<Wind size={18} className="text-laranja" />}
            iconBg="hsl(var(--laranja) / 0.18)"
            title="Usar CPAP > 4h em 14 noites"
            subtitle="Aderência ao tratamento"
            reward="+500"
            footLabel="11 de 14 noites"
            percent={78}
            color="laranja"
            onClick={() => navigate('/score/challenge/sem-cafeina')}
          />
        </div>

        {/* Conquistas */}
        <h3 className="mt-7 text-[17px] font-bold">Conquistas recentes</h3>
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {['Primeira semana', '7 noites > 60', 'Madrugador'].map((label, i) => (
            <div
              key={label}
              className="flex min-w-[110px] flex-col items-center gap-2 rounded-card bg-surface p-4"
            >
              <span
                className="grid h-11 w-11 place-items-center rounded-full text-lg"
                style={{ backgroundColor: 'hsl(var(--sun-moon) / 0.16)' }}
              >
                {['🌙', '🔥', '🌅'][i]}
              </span>
              <span className="text-center text-[11px] font-medium text-baunilha/75">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <footer className="px-5 pb-5 pt-3">
        <button
          type="button"
          onClick={() => navigate('/score/ranking')}
          className="flex w-full items-center justify-center gap-2 rounded-button bg-surface-2/70 py-3.5 text-sm font-semibold text-text-primary/90"
        >
          <Trophy size={16} className="text-sun-moon" /> Ver ranking →
        </button>
      </footer>
    </div>
  );
}

function TopBar({ navigate }) {
  return (
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
        Sleep Score
      </span>
      <button
        type="button"
        aria-label="Ajuda"
        className="grid h-10 w-10 place-items-center rounded-full bg-surface-2/60 text-text-primary/80 transition hover:bg-surface-2"
      >
        <HelpCircle size={18} />
      </button>
    </header>
  );
}

function ChallengeRow({ icon, iconBg, title, subtitle, reward, footLabel, percent, color, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.985 }}
      className="w-full rounded-card bg-surface p-4 text-left"
    >
      <div className="flex items-start gap-3">
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
          style={{ backgroundColor: iconBg }}
        >
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-semibold leading-snug text-text-primary/95">{title}</p>
          <p className="mt-0.5 text-[12px] text-baunilha/55">{subtitle}</p>
        </div>
        <span className="shrink-0 rounded-pill bg-surface-2/80 px-2.5 py-1 text-[11px] font-semibold text-baunilha/85">
          {reward} pts
        </span>
      </div>
      <div className="mt-3">
        <div className="mb-1.5 flex items-center justify-between text-[11px]">
          <span className="text-baunilha/60">{footLabel}</span>
          <span className="font-semibold" style={{ color: `hsl(var(--${color}))` }}>
            {percent}%
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-pill bg-surface-2">
          <div
            className="h-full rounded-pill"
            style={{ width: `${percent}%`, backgroundColor: `hsl(var(--${color}))` }}
          />
        </div>
      </div>
    </motion.button>
  );
}
