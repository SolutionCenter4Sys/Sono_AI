import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Stethoscope, Sparkles, BedDouble, Check } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';

/**
 * Recomendação (médico + algoritmo) — a indicação do exame.
 * Duas fontes independentes convergem na polissonografia.
 * Próximo: /exame/aprovacao.
 */
const SOURCES = [
  {
    id: 'medico',
    icon: Stethoscope,
    color: 'menta',
    who: 'Dr. Marcos Rocha',
    role: 'Avaliação médica',
    text: 'Os achados indicam investigar apneia. Recomendo polissonografia tipo III (portátil), feita em casa com vídeo de orientação, para confirmar e medir a gravidade.',
  },
  {
    id: 'algoritmo',
    icon: Sparkles,
    color: 'laranja',
    who: 'Sono AI',
    role: 'Análise algorítmica',
    text: 'STOP-BANG 5 e 3 quedas de SpO₂ na noite monitorada elevam a probabilidade de AOS. Polissonografia é o exame indicado.',
  },
];

const CONFIRMS = [
  'Quantos eventos de apneia acontecem por hora (IAH)',
  'Quão baixo o oxigênio chega durante a noite',
  'A gravidade e o tipo — para definir o tratamento certo',
];

export default function RecommendationScreen() {
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
          Recomendação
        </span>
        <span className="h-10 w-10" aria-hidden />
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {/* Hero */}
        <div className="flex flex-col items-center pt-3 text-center">
          <span
            className="grid h-[88px] w-[88px] place-items-center rounded-full"
            style={{ backgroundColor: 'hsl(var(--menta) / 0.16)' }}
          >
            <BedDouble size={40} className="text-menta" />
          </span>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-kicker text-menta">
            Indicação de exame
          </p>
          <h1 className="mt-1.5 text-[24px] font-bold leading-tight">
            Indicamos uma polissonografia
          </h1>
          <p className="mt-2 max-w-[300px] text-[13px] leading-[1.5] text-baunilha/65">
            Médico e algoritmo chegaram à mesma conclusão. É o exame que confirma o quadro com
            segurança.
          </p>
        </div>

        {/* Duas fontes */}
        <div className="mt-6 flex flex-col gap-3">
          {SOURCES.map((s) => (
            <section key={s.id} className="rounded-card bg-surface p-4">
              <div className="flex items-center gap-3">
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px]"
                  style={{ backgroundColor: `hsl(var(--${s.color}) / 0.16)` }}
                >
                  <s.icon size={20} style={{ color: `hsl(var(--${s.color}))` }} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-semibold text-text-primary/95">{s.who}</p>
                  <p
                    className="text-[10px] font-semibold uppercase tracking-kicker"
                    style={{ color: `hsl(var(--${s.color}))` }}
                  >
                    {s.role}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-[12.5px] leading-[1.5] text-baunilha/75">{s.text}</p>
            </section>
          ))}
        </div>

        {/* O que o exame confirma */}
        <section className="mt-4 rounded-card bg-marinho p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
            O que a polissonografia confirma
          </p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {CONFIRMS.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-[13px] leading-[1.4] text-text-primary/85">
                <Check size={16} className="mt-0.5 shrink-0 text-menta" />
                {c}
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-5 text-center text-[11px] leading-[1.5] text-baunilha/45">
          A modalidade do exame (em casa ou presencial) você escolhe depois — a recomendação
          não amarra o local.
        </p>
      </div>

      <footer className="flex flex-col items-center gap-3 px-6 pb-5 pt-3">
        <PrimaryButton trailingIcon="→" onClick={() => navigate('/exame/aprovacao')}>
          Continuar
        </PrimaryButton>
        <TextLink onClick={() => navigate('/inicio')}>Decidir depois</TextLink>
      </footer>
    </div>
  );
}
