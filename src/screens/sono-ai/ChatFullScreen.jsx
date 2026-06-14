import { useNavigate } from 'react-router-dom';
import { X, ArrowUp } from 'lucide-react';
import TextLink from '@/components/primitives/TextLink.jsx';

// barras: menta = baseline, laranja = acima do baseline
const CHART = [
  { h: 38, hot: false },
  { h: 42, hot: false },
  { h: 70, hot: true },
  { h: 66, hot: true },
  { h: 80, hot: true },
  { h: 72, hot: true },
  { h: 76, hot: true },
];

export default function ChatFullScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      <ChatHeader onClose={() => navigate('/app/result')} />

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-4 space-y-3.5">
        <UserBubble>Por que minha FC noturna está alta?</UserBubble>

        <AiBubble>
          Sua FC média ficou em 68 bpm — 9 acima do seu baseline. Vou checar o
          padrão das últimas noites.
        </AiBubble>
        <AiBubble>
          Encontrei: 4 noites com cafeína detectada após 16h. Quer ver o gráfico?
        </AiBubble>

        <UserBubble>Sim, quero</UserBubble>

        {/* Chart card */}
        <div className="rounded-card-lg bg-surface-2/50 p-4">
          <p className="text-[13px] text-text-primary/90">Aqui está o padrão:</p>

          <div className="mt-3 rounded-card bg-surface p-4">
            <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
              FC noturna · 7 dias
            </p>
            <div className="mt-3 flex h-[120px] items-end justify-between gap-2">
              {CHART.map((bar, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md"
                  style={{
                    height: `${bar.h}%`,
                    backgroundColor: bar.hot ? 'hsl(var(--laranja))' : 'hsl(var(--menta))',
                  }}
                />
              ))}
            </div>
            <p className="mt-3 text-[12px] font-semibold text-laranja">
              ↑ +9 bpm vs baseline
            </p>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              className="rounded-pill bg-menta/20 px-4 py-2 text-[13px] font-semibold text-menta transition hover:bg-menta/30"
            >
              Ver detalhes
            </button>
            <TextLink>Não agora</TextLink>
          </div>
        </div>
      </div>

      <ChatInput />
    </div>
  );
}

function ChatHeader({ onClose }) {
  return (
    <header className="flex items-center justify-between px-4 pt-4 pb-3">
      <button
        type="button"
        onClick={onClose}
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
  );
}

function UserBubble({ children }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[78%] rounded-2xl rounded-br-md bg-laranja px-4 py-2.5 text-[14px] font-medium leading-[1.4] text-text-on-brand">
        {children}
      </div>
    </div>
  );
}

function AiBubble({ children }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[82%] rounded-2xl rounded-bl-md bg-surface px-4 py-2.5 text-[14px] leading-[1.45] text-text-primary/90">
        {children}
      </div>
    </div>
  );
}

function ChatInput() {
  return (
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
  );
}
