import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Building2, Stethoscope, Video } from 'lucide-react';

/**
 * Como o paciente quer ser atendido (consulta com o médico do sono).
 * 3 formas — a modalidade do ATENDIMENTO é independente da do EXAME:
 *   A — Presencial no Hospital do Sono   → /exame/consulta (consulta agendada)
 *   B — Presencial em clínica parceira    → /exame/consulta (consulta agendada)
 *   C — Online (teleconsulta)             → /agenda/teleconsulta (agenda o vídeo)
 * Após a consulta: pré-diagnóstico → recomendação → aprovação → confirmar exame.
 */
const TYPES = [
  {
    id: 'hospital',
    icon: Building2,
    color: 'menta',
    tag: 'Atendimento completo',
    title: 'Presencial · Hospital do Sono',
    desc: 'Consulta na unidade do Instituto do Sono, com toda a estrutura no mesmo lugar.',
    to: '/exame/consulta',
    state: { mode: 'presencial' },
  },
  {
    id: 'clinica',
    icon: Stethoscope,
    color: 'sun-moon',
    tag: 'Perto de você',
    title: 'Presencial · Clínica parceira',
    desc: 'Consulta numa clínica credenciada mais próxima do seu endereço.',
    to: '/exame/consulta',
    state: { mode: 'clinica' },
  },
  {
    id: 'online',
    icon: Video,
    color: 'laranja',
    tag: 'Sem sair de casa',
    title: 'Online · Teleconsulta',
    desc: 'Consulta por vídeo com um médico do sono. Se um exame for indicado, você escolhe onde fazê-lo — inclusive em casa.',
    to: '/agenda/teleconsulta',
  },
];

export default function ConsultTypeScreen() {
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
          Tipo de atendimento
        </span>
        <span className="h-10 w-10" aria-hidden />
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="pt-2 pb-1">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
            Consulta com médico do sono
          </p>
          <h1 className="mt-2 text-[24px] font-bold leading-tight">
            Como você quer ser atendido?
          </h1>
          <p className="mt-2 text-[13px] leading-[1.5] text-baunilha/65">
            A forma da consulta não decide o exame: você pode ser atendido por vídeo e mesmo
            assim fazer o exame presencial, ou o contrário.
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          {TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => navigate(t.to, t.state ? { state: t.state } : undefined)}
              className="w-full rounded-card bg-surface p-4 text-left transition hover:bg-surface/80 border border-surface-2/40"
            >
              <div className="flex items-start gap-3.5">
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px]"
                  style={{ backgroundColor: `hsl(var(--${t.color}) / 0.16)` }}
                >
                  <t.icon size={22} style={{ color: `hsl(var(--${t.color}))` }} />
                </span>
                <div className="flex-1 min-w-0">
                  <span
                    className="text-[9px] font-semibold uppercase tracking-[0.12em] px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: `hsl(var(--${t.color}) / 0.16)`, color: `hsl(var(--${t.color}))` }}
                  >
                    {t.tag}
                  </span>
                  <h2 className="mt-1.5 text-[16px] font-semibold text-text-primary/95">
                    {t.title}
                  </h2>
                  <p className="mt-1 text-[12.5px] leading-[1.45] text-baunilha/60">{t.desc}</p>
                </div>
                <ChevronRight className="mt-1 shrink-0 text-baunilha/35" size={18} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
