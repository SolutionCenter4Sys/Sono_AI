import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Info } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';

/**
 * Pré-diagnóstico (resumo dos achados) — NÃO é laudo.
 * Reúne triagem (ESS/STOP-BANG/ISI/PSQI), queixa, avaliação da consulta e
 * sinais do wearable. Tom acolhedor e claro de que é preliminar.
 * Próximo: /exame/recomendacao.
 */
const TRIAGEM = [
  { value: '9', label: 'ESS', read: 'Sonolência leve', color: 'menta' },
  { value: '5', label: 'STOP-BANG', read: 'Vários indícios de apneia', color: 'laranja' },
  { value: '11', label: 'ISI', read: 'Sinais moderados de insônia', color: 'risk-moderate' },
  { value: '9', label: 'PSQI', read: 'Sono percebido como razoável', color: 'sun-moon' },
];

const CONSULTA = [
  'Relato de ronco alto e pausas respiratórias presenciadas pela parceira',
  'Sonolência ao longo do dia, sobretudo após o almoço',
  'Despertares frequentes durante a noite',
];

const WEARABLE = [
  { label: 'SpO₂ mínima', value: '87%', tone: 'risk-moderate' },
  { label: 'Quedas de SpO₂ < 90%', value: '3', tone: 'risk-moderate' },
  { label: 'FC média (noite)', value: '68 bpm', tone: 'menta' },
];

export default function PreDiagnosisScreen() {
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
          Resumo dos achados
        </span>
        <span className="h-10 w-10" aria-hidden />
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="pt-1 pb-1">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
            Resumo dos achados
          </p>
          <h1 className="mt-2 text-[24px] font-bold leading-tight">
            O que reunimos até aqui
          </h1>
          <p className="mt-2 text-[13px] leading-[1.5] text-baunilha/65">
            Juntamos sua triagem, a conversa com o médico e os sinais do seu relógio. É uma
            visão preliminar — ainda não é um laudo.
          </p>
        </div>

        {/* Aviso preliminar */}
        <div
          className="mt-4 flex items-start gap-2.5 rounded-card p-3.5"
          style={{ backgroundColor: 'hsl(var(--sun-moon) / 0.10)', border: '1px solid hsl(var(--sun-moon) / 0.3)' }}
        >
          <Info size={16} className="mt-0.5 shrink-0 text-sun-moon" />
          <p className="text-[12px] leading-[1.45] text-text-primary/85">
            Este pré-diagnóstico orienta o próximo passo. O diagnóstico definitivo só vem com
            o exame e o laudo assinado.
          </p>
        </div>

        {/* Triagem */}
        <section className="mt-5 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Sua triagem
          </p>
          <div className="mt-3 flex flex-col gap-3">
            {TRIAGEM.map((t) => (
              <div key={t.label} className="flex items-center gap-3">
                <span
                  className="grid h-10 w-12 shrink-0 place-items-center rounded-[10px] text-[16px] font-bold"
                  style={{ backgroundColor: `hsl(var(--${t.color}) / 0.16)`, color: `hsl(var(--${t.color}))` }}
                >
                  {t.value}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold tracking-wide text-text-primary/95">
                    {t.label}
                  </p>
                  <p className="text-[11.5px] text-baunilha/60">{t.read}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Consulta */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Da conversa com o médico
          </p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {CONSULTA.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-[13px] leading-[1.4] text-text-primary/85">
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-laranja" />
                {c}
              </li>
            ))}
          </ul>
        </section>

        {/* Wearable */}
        <section className="mt-4 rounded-card bg-marinho p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
            Sinais do seu relógio
          </p>
          <div className="mt-3 space-y-2.5">
            {WEARABLE.map((w) => (
              <div key={w.label} className="flex items-center justify-between">
                <span className="text-[12.5px] text-baunilha/75">{w.label}</span>
                <span className="text-[14px] font-bold" style={{ color: `hsl(var(--${w.tone}))` }}>
                  {w.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Síntese */}
        <section
          className="mt-4 rounded-card border p-5"
          style={{ backgroundColor: 'hsl(var(--menta) / 0.12)', borderColor: 'hsl(var(--menta) / 0.45)' }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
            Síntese preliminar
          </p>
          <h2 className="mt-2 text-[17px] font-bold leading-snug">
            Sinais compatíveis com apneia obstrutiva do sono
          </h2>
          <p className="mt-2 text-[12.5px] leading-[1.45] text-baunilha/75">
            O conjunto aponta para apneia de grau leve a moderado, com um componente de insônia.
            Para confirmar e medir a gravidade, há um caminho claro — veja a recomendação.
          </p>
        </section>
      </div>

      <footer className="flex flex-col items-center gap-3 px-6 pb-5 pt-3">
        <PrimaryButton trailingIcon="→" onClick={() => navigate('/exame/recomendacao')}>
          Ver recomendação
        </PrimaryButton>
        <TextLink onClick={() => navigate('/sono-ai/full')}>Tirar dúvidas com o Sono AI</TextLink>
      </footer>
    </div>
  );
}
