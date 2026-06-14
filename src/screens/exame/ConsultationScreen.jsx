import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Video, Building2, Stethoscope, CalendarCheck, Check } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';

/**
 * Consulta agendada → realizada (bridge pós-atendimento).
 *
 * Convergência de TODAS as formas de atendimento (teleconsulta e presencial).
 * A modalidade de atendimento NÃO decide a modalidade do exame — aqui apenas
 * confirmamos a consulta e, depois que ela "acontece" (mockado), seguimos para
 * o pré-diagnóstico. O envio do kit só é decidido bem mais adiante, em
 * /exame/confirmar, após recomendação + aprovação.
 *
 * Modo recebido via location.state.mode: 'tele' | 'presencial'.
 */
const MODES = {
  tele: {
    icon: Video,
    color: 'laranja',
    kicker: 'Teleconsulta por vídeo',
    place: 'Online · por vídeo',
    note: 'No horário marcado, você receberá o link da sala de vídeo por WhatsApp.',
  },
  presencial: {
    icon: Building2,
    color: 'menta',
    kicker: 'Consulta presencial',
    place: 'Hospital do Sono · Vila Mariana',
    note: 'Chegue 15 minutos antes. Leve um documento com foto e a carteirinha do convênio.',
  },
  clinica: {
    icon: Stethoscope,
    color: 'sun-moon',
    kicker: 'Consulta presencial',
    place: 'Clínica parceira · mais perto de você',
    note: 'Chegue 15 minutos antes. Leve um documento com foto e a carteirinha do convênio.',
  },
};

export default function ConsultationScreen() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const mode = MODES[state?.mode] ?? MODES.tele;

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
          Atendimento
        </span>
        <span className="h-10 w-10" aria-hidden />
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {/* Hero */}
        <div className="flex flex-col items-center pt-3 text-center">
          <span
            className="grid h-[88px] w-[88px] place-items-center rounded-full"
            style={{ backgroundColor: `hsl(var(--${mode.color}) / 0.16)` }}
          >
            <CalendarCheck size={40} style={{ color: `hsl(var(--${mode.color}))` }} />
          </span>
          <p
            className="mt-4 text-[11px] font-semibold uppercase tracking-kicker"
            style={{ color: `hsl(var(--${mode.color}))` }}
          >
            {mode.kicker}
          </p>
          <h1 className="mt-1.5 text-[24px] font-bold leading-tight">Consulta agendada</h1>
          <p className="mt-2 max-w-[300px] text-[13px] leading-[1.5] text-baunilha/65">
            Sua avaliação com o médico do sono está confirmada. Depois dela, montamos seu
            pré-diagnóstico.
          </p>
        </div>

        {/* Detalhes */}
        <section className="mt-6 rounded-card bg-surface p-4">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/50">
            Detalhes da consulta
          </p>
          <div className="mt-3 flex items-center gap-3.5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-menta text-text-on-brand font-bold">
              MR
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold text-text-primary/95">Dr. Marcos Rocha</p>
              <p className="text-[11px] text-baunilha/55">Pneumologista do sono · CRM 117892-SP</p>
            </div>
            <span
              className="grid h-9 w-9 place-items-center rounded-full"
              style={{ backgroundColor: `hsl(var(--${mode.color}) / 0.16)`, color: `hsl(var(--${mode.color}))` }}
            >
              <mode.icon size={17} />
            </span>
          </div>
          <div className="mt-3 space-y-2.5 border-t border-surface-2/50 pt-3">
            <Row label="Quando" value="Hoje · 20h30" />
            <Row label="Como" value={mode.place} />
            <Row label="Duração" value="20 minutos" />
          </div>
        </section>

        {/* Nota da modalidade */}
        <div
          className="mt-3 flex items-start gap-2.5 rounded-card p-3.5"
          style={{ backgroundColor: `hsl(var(--${mode.color}) / 0.10)`, border: `1px solid hsl(var(--${mode.color}) / 0.3)` }}
        >
          <Check size={16} className="mt-0.5 shrink-0" style={{ color: `hsl(var(--${mode.color}))` }} />
          <p className="text-[12px] leading-[1.45] text-text-primary/85">{mode.note}</p>
        </div>

        {/* O que vem depois */}
        <section className="mt-3 rounded-card bg-marinho p-4">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
            Depois da consulta
          </p>
          <p className="mt-2 text-[12.5px] leading-[1.5] text-baunilha/75">
            Reunimos os achados da triagem e da avaliação do médico em um pré-diagnóstico. Só
            então decidimos juntos se um exame é necessário — e onde fazê-lo.
          </p>
        </section>
      </div>

      <footer className="flex flex-col items-center gap-3 px-6 pb-5 pt-3">
        <PrimaryButton trailingIcon="→" onClick={() => navigate('/exame/pre-diagnostico')}>
          Consulta realizada · ver pré-diagnóstico
        </PrimaryButton>
        <TextLink onClick={() => navigate('/inicio')}>Voltar ao início</TextLink>
      </footer>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[13px] text-baunilha/65">{label}</span>
      <span className="text-[13px] font-semibold text-text-primary/95 text-right">{value}</span>
    </div>
  );
}
