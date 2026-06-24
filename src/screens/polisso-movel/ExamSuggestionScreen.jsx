import { useNavigate } from 'react-router-dom';
import { ChevronLeft, BedDouble } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';

/**
 * 05.1 Sugestão de exame — Polissonografia em casa.
 * Figma 48:3.
 */
const STEPS = [
  'Você assiste a um vídeo de orientação e recebe o kit',
  'Sensores clínicos (FC, oximetria, fluxo e esforço) monitoram uma noite',
  'Resultado preliminar em 24h, laudo médico em 5 dias',
];

export default function ExamSuggestionScreen() {
  const navigate = useNavigate();

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
          Polissonografia
        </span>
        <span className="h-10 w-10" aria-hidden />
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {/* Illustration */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="relative grid h-[160px] w-[160px] place-items-center">
            <span
              className="absolute h-[160px] w-[160px] rounded-full"
              style={{ backgroundColor: 'hsl(var(--menta) / 0.55)' }}
            />
            <span
              className="absolute h-[120px] w-[120px] rounded-full"
              style={{ backgroundColor: 'hsl(var(--menta))' }}
            />
            <BedDouble size={56} className="relative text-marinho-deep" />
          </div>
        </div>

        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
            Exame recomendado
          </p>
          <h1 className="mt-2 text-[28px] font-bold leading-tight">Polissonografia recomendada</h1>
          <p className="mx-auto mt-3 max-w-[300px] text-[14px] leading-[1.5] text-baunilha/65">
            Com os sinais detectados, vale aprofundar a análise com sensores clínicos durante
            uma noite. Você escolhe a forma que for mais confortável.
          </p>
        </div>

        {/* Como funciona */}
        <section className="mt-6 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Como funciona
          </p>
          <ol className="mt-4 flex flex-col gap-4">
            {STEPS.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[13px] font-bold text-menta"
                  style={{ borderColor: 'hsl(var(--menta) / 0.5)' }}
                >
                  {i + 1}
                </span>
                <span className="text-[14px] leading-[1.45] text-text-primary/90">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="mt-4 flex items-start gap-2.5 rounded-card border p-4"
          style={{
            backgroundColor: 'hsl(var(--menta) / 0.10)',
            borderColor: 'hsl(var(--menta) / 0.32)',
          }}
        >
          <span className="text-base">🎥</span>
          <p className="text-[12px] leading-[1.45] text-text-primary/90">
            Um <strong>vídeo de orientação</strong> te guia no preparo, passo a passo. Você não
            monta nada sozinho — e <strong>não desmonte o kit</strong>: é só dormir e devolver no
            dia seguinte.
          </p>
        </section>
      </div>

      <footer className="flex flex-col items-center gap-3 px-6 pb-5 pt-3">
        <PrimaryButton
          trailingIcon="→"
          onClick={() => navigate('/exame/confirmar')}
        >
          Ver opções de exame
        </PrimaryButton>
        <TextLink onClick={() => navigate('/inicio')}>Decidir depois</TextLink>
      </footer>
    </div>
  );
}
