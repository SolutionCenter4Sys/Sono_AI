import { useNavigate } from 'react-router-dom';
import { X, ArrowUp, Sparkles } from 'lucide-react';

export default function InsightCardScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between px-4 pt-4 pb-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Fechar"
          className="grid h-10 w-10 place-items-center rounded-full bg-surface-2/60 text-text-primary/90 transition hover:bg-surface-2"
        >
          <X size={20} strokeWidth={2.4} />
        </button>
        <span className="text-[13px] font-semibold uppercase tracking-kicker text-baunilha/60">
          Sono AI
        </span>
        <button
          type="button"
          className="rounded-pill bg-surface-2/60 px-3 py-1.5 text-[12px] font-medium text-baunilha/80 transition hover:bg-surface-2"
        >
          Histórico
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-4 space-y-3.5">
        {/* User question */}
        <div className="flex justify-end">
          <div className="max-w-[78%] rounded-2xl rounded-br-md bg-laranja px-4 py-2.5 text-[14px] font-medium leading-[1.4] text-text-on-brand">
            Como está meu progresso?
          </div>
        </div>

        {/* AI intro */}
        <div className="flex justify-start">
          <div className="max-w-[82%] rounded-2xl rounded-bl-md bg-surface px-4 py-2.5 text-[14px] leading-[1.45] text-text-primary/90">
            Você melhorou 5 pontos de qualidade média este mês. Veja onde:
          </div>
        </div>

        {/* Insight card */}
        <div className="rounded-card-lg bg-surface-2/50 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-menta">
                <Sparkles size={15} className="text-marinho-deep" />
              </span>
              <span className="text-[13px] font-semibold text-text-primary">
                Insight da semana
              </span>
            </div>
            <span
              className="rounded-pill px-2 py-1 text-[11px] font-bold text-sun-moon"
              style={{ backgroundColor: 'hsl(var(--sun-moon) / 0.15)' }}
            >
              +30 pts
            </span>
          </div>

          <h3 className="mt-3 text-[18px] font-bold leading-[1.3] text-text-primary">
            Seu padrão de FC tá 4 bpm mais baixo nas noites sem cafeína
          </h3>

          {/* Stat comparison */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <StatCard label="Com cafeína" value="72" color="laranja" fill={72} />
            <StatCard label="Sem cafeína" value="68" color="menta" fill={68} />
          </div>

          {/* Actions */}
          <div className="mt-4 flex items-center gap-2.5">
            <button
              type="button"
              className="rounded-pill bg-menta/20 px-4 py-2 text-[13px] font-semibold text-menta transition hover:bg-menta/30"
            >
              Ver análise completa
            </button>
            <button
              type="button"
              onClick={() => navigate('/score')}
              className="rounded-pill bg-surface px-4 py-2 text-[13px] font-semibold text-text-primary/90 transition hover:bg-surface-2"
            >
              Aceitar desafio +30 pts
            </button>
          </div>
        </div>
      </div>

      {/* Input */}
      <footer className="border-t border-surface-2/40 bg-marinho-deep px-5 pb-6 pt-3">
        <div className="flex items-center gap-2.5 rounded-pill bg-surface-2/60 px-4 py-2">
          <span className="flex-1 text-[14px] text-baunilha/50">Digite sua pergunta...</span>
          <button
            type="button"
            aria-label="Enviar"
            className="grid h-9 w-9 flex-none place-items-center rounded-full bg-laranja text-text-on-brand"
          >
            <ArrowUp size={18} strokeWidth={2.4} />
          </button>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ label, value, color, fill }) {
  return (
    <div className="rounded-card bg-surface p-3.5">
      <p className="text-[10px] font-semibold uppercase tracking-kicker text-baunilha/55">
        {label}
      </p>
      <p className="mt-1.5 flex items-baseline gap-1">
        <span className="text-[28px] font-bold leading-none text-text-primary">{value}</span>
        <span className="text-[12px] text-baunilha/55">bpm</span>
      </p>
      <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-pill bg-surface-2/60">
        <div
          className="h-full rounded-pill"
          style={{ width: `${fill}%`, backgroundColor: `hsl(var(--${color}))` }}
        />
      </div>
    </div>
  );
}
