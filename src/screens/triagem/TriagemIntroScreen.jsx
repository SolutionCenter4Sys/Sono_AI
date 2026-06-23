import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ClipboardList } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';

/**
 * 06.1 Intro triagem — visão geral dos 4 instrumentos.
 * Figma 59:3.
 */
const INSTRUMENTS = [
  { n: '1', color: 'menta', title: 'Epworth (ESS)', hint: '8 perguntas · sonolência diurna' },
  { n: '2', color: 'laranja', title: 'STOP-BANG', hint: '8 perguntas SIM/NÃO · indícios de apneia' },
  { n: '3', color: 'risk-moderate', title: 'ISI', hint: '7 perguntas · severidade insônia' },
  { n: '4', color: 'baunilha', title: 'Pittsburgh (PSQI)', hint: 'qualidade subjetiva geral' },
];

export default function TriagemIntroScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between px-4 pt-4 pb-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Voltar"
          className="grid h-10 w-10 place-items-center rounded-full bg-surface-2/60 text-text-primary/90 transition hover:bg-surface-2"
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>
        <span className="text-[12px] font-semibold uppercase tracking-kicker text-baunilha/70">
          Triagem
        </span>
        <span className="h-10 w-10" aria-hidden />
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {/* Glyph */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="relative grid h-[160px] w-[160px] place-items-center">
            <span
              className="absolute h-[160px] w-[160px] rounded-full"
              style={{ backgroundColor: 'hsl(var(--menta) / 0.1)' }}
            />
            <span
              className="absolute h-[140px] w-[140px] rounded-full border"
              style={{ borderColor: 'hsl(var(--menta) / 0.25)' }}
            />
            <span
              className="absolute h-[108px] w-[108px] rounded-full"
              style={{ backgroundColor: 'hsl(var(--menta) / 0.14)' }}
            />
            <ClipboardList size={50} className="relative text-menta" />
          </div>
        </div>

        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
            Triagem clínica
          </p>
          <h1 className="mt-2 text-[26px] font-bold leading-tight">4 questionários · 5 minutos</h1>
          <p className="mx-auto mt-3 max-w-[320px] text-[14px] leading-[1.5] text-baunilha/65">
            Avalia sonolência, indícios de apneia, insônia e qualidade subjetiva do sono.
            Instrumentos validados clinicamente.
          </p>
        </div>

        {/* O que vamos aplicar */}
        <section className="mt-5 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            O que vamos aplicar
          </p>
          <ul className="mt-4 flex flex-col gap-3.5">
            {INSTRUMENTS.map((item) => (
              <li key={item.n} className="flex items-center gap-3">
                <span
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-2xl border text-[14px] font-bold"
                  style={{
                    backgroundColor: `hsl(var(--${item.color}) / 0.18)`,
                    borderColor: `hsl(var(--${item.color}) / 0.45)`,
                    color: `hsl(var(--${item.color}))`,
                  }}
                >
                  {item.n}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-semibold text-text-primary/95">
                    {item.title}
                  </span>
                  <span className="block text-[11px] text-baunilha/60">{item.hint}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Info card */}
        <section
          className="mt-4 flex items-start gap-2.5 rounded-card border p-4"
          style={{
            backgroundColor: 'hsl(var(--menta) / 0.1)',
            borderColor: 'hsl(var(--menta) / 0.35)',
          }}
        >
          <span className="text-base">💡</span>
          <p className="text-[12px] leading-[1.45] text-text-primary/90">
            Suas respostas são enviadas com segurança ao seu médico via Portal C2 (laudo FHIR R4).
          </p>
        </section>
      </div>

      <footer className="flex flex-col items-center gap-3 px-6 pb-5 pt-3">
        <PrimaryButton leadingIcon="→" onClick={() => navigate('/triagem/epworth')}>
          Começar triagem
        </PrimaryButton>
        <TextLink onClick={() => navigate(-1)}>Fazer depois</TextLink>
      </footer>
    </div>
  );
}
