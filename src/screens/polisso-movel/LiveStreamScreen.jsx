import { useNavigate } from 'react-router-dom';
import { EXAM } from '@/data/examMock.js';

/**
 * 05.7 Stream em tempo real — coletando dados durante a noite.
 * 8 canais clínicos em grid 2x4 (ADR-025). Figma 48:323.
 */
export default function LiveStreamScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-5 pb-4 pt-5">
        {/* Status */}
        <div className="flex items-center justify-center gap-3 pb-4">
          <span className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-kicker text-menta">
            <span className="h-2 w-2 rounded-full bg-menta" />
            Exame em andamento · mantenha conectado
          </span>
          <span className="text-[13px] font-semibold text-baunilha/80">23:14</span>
        </div>

        <p className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
          Sua noite · noite {EXAM.currentNight} de {EXAM.totalNights}
        </p>
        <h1 className="mt-1.5 text-[26px] font-bold leading-tight">Coletando dados...</h1>
        <p className="mt-2 text-[13px] leading-[1.5] text-baunilha/65">
          Dados parciais sendo enviados para análise. Resultado preliminar amanhã pela manhã.
        </p>

        {/* Metric grid */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-card bg-surface p-4">
            <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
              FC
            </p>
            <p className="mt-1">
              <span className="text-[32px] font-bold leading-none">68</span>
              <span className="ml-1 text-sm text-baunilha/55">bpm</span>
            </p>
            <svg viewBox="0 0 120 28" className="mt-3 h-7 w-full" aria-hidden>
              <polyline
                points="0,18 18,14 30,20 44,8 58,16 72,10 88,18 104,12 120,16"
                fill="none"
                stroke="hsl(var(--baunilha) / 0.6)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="rounded-card bg-surface p-4">
            <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
              SpO₂
            </p>
            <p className="mt-1 text-[32px] font-bold leading-none">95%</p>
            <p className="mt-1 text-[11px] text-baunilha/55">saturação</p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-pill bg-surface-2">
              <div className="h-full rounded-pill bg-risk-low" style={{ width: '95%' }} />
            </div>
          </div>

          <div className="rounded-card bg-surface p-4">
            <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
              Movimento
            </p>
            <p className="mt-1 text-[26px] font-bold leading-none">Baixo</p>
            <p className="mt-1.5 text-[11px] text-baunilha/55">5min atrás</p>
            <span
              className="mt-2 inline-block rounded-pill px-2.5 py-1 text-[10px] font-bold tracking-kicker"
              style={{ backgroundColor: 'hsl(var(--menta) / 0.16)', color: 'hsl(var(--menta))' }}
            >
              ESTÁVEL
            </span>
          </div>

          <div className="rounded-card bg-surface p-4">
            <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
              Temp
            </p>
            <p className="mt-1 text-[26px] font-bold leading-none">36.5°C</p>
            <p className="mt-1.5 text-[11px] text-baunilha/55">corporal</p>
            <span
              className="mt-2 inline-block rounded-pill px-2.5 py-1 text-[10px] font-bold tracking-kicker"
              style={{ backgroundColor: 'hsl(var(--menta) / 0.16)', color: 'hsl(var(--menta))' }}
            >
              NORMAL
            </span>
          </div>

          {/* Fluxo aéreo */}
          <div className="rounded-card bg-surface p-4">
            <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
              Fluxo aéreo
            </p>
            <p className="mt-1">
              <span className="text-[28px] font-bold leading-none">12.4</span>
              <span className="ml-1 text-sm text-baunilha/55">L/min</span>
            </p>
            <svg viewBox="0 0 120 28" className="mt-3 h-7 w-full" aria-hidden>
              <polyline
                points="0,14 12,6 22,22 34,8 46,18 58,10 70,16 82,8 94,20 106,12 120,14"
                fill="none"
                stroke="hsl(var(--menta) / 0.7)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Esforço respiratório */}
          <div className="rounded-card bg-surface p-4">
            <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
              Esforço resp.
            </p>
            <p className="mt-1 text-[26px] font-bold leading-none">Regular</p>
            <p className="mt-1.5 text-[11px] text-baunilha/55">tórax + abdômen</p>
            <span
              className="mt-2 inline-block rounded-pill px-2.5 py-1 text-[10px] font-bold tracking-kicker"
              style={{ backgroundColor: 'hsl(var(--menta) / 0.16)', color: 'hsl(var(--menta))' }}
            >
              SINCRONIZADO
            </span>
          </div>

          {/* Posição */}
          <div className="rounded-card bg-surface p-4">
            <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
              Posição
            </p>
            <p className="mt-1 text-[26px] font-bold leading-none">Lateral</p>
            <p className="mt-1.5 text-[11px] text-baunilha/55">esquerdo · 18min</p>
            <span
              className="mt-2 inline-block rounded-pill px-2.5 py-1 text-[10px] font-bold tracking-kicker"
              style={{ backgroundColor: 'hsl(var(--menta) / 0.16)', color: 'hsl(var(--menta))' }}
            >
              IDEAL
            </span>
          </div>

          {/* Ronco */}
          <div className="rounded-card bg-surface p-4">
            <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
              Ronco
            </p>
            <p className="mt-1">
              <span className="text-[28px] font-bold leading-none">7</span>
              <span className="ml-1 text-sm text-baunilha/55">ev/h</span>
            </p>
            <p className="mt-1.5 text-[11px] text-baunilha/55">intensidade leve</p>
            <span
              className="mt-2 inline-block rounded-pill px-2.5 py-1 text-[10px] font-bold tracking-kicker"
              style={{ backgroundColor: 'hsl(var(--risk-moderate) / 0.16)', color: 'hsl(var(--risk-moderate))' }}
            >
              MONITORAR
            </span>
          </div>
        </div>

        {/* Técnico disponível */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Técnico disponível
          </p>
          <p className="mt-2 text-[13px] text-baunilha/65">
            Pressione o botão se precisar de ajuda durante a noite
          </p>
          <button
            type="button"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-button border py-3.5 text-[14px] font-semibold text-sun-moon"
            style={{
              backgroundColor: 'hsl(var(--sun-moon) / 0.1)',
              borderColor: 'hsl(var(--sun-moon) / 0.4)',
            }}
          >
            <span
              className="rounded px-1.5 py-0.5 text-[9px] font-bold text-white"
              style={{ backgroundColor: 'hsl(var(--risk-critical))' }}
            >
              SOS
            </span>
            Chamar técnico
          </button>
        </section>
      </div>

      <footer className="px-5 pb-5 pt-3">
        <button
          type="button"
          onClick={() => navigate('/inicio')}
          className="w-full rounded-button bg-surface-2/70 py-3.5 text-sm font-semibold text-baunilha/70"
        >
          Minimizar · exame em andamento
        </button>
      </footer>
    </div>
  );
}
