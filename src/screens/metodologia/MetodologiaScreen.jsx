import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ShieldCheck,
  Watch,
  ScanFace,
  FlaskConical,
  BookOpen,
} from 'lucide-react';
import {
  DISCLAIMER,
  VALIDATION,
  WEARABLE_NOTE,
  FACIAL_NOTE,
} from '@/lib/positioning.js';
import { REF_ALL } from '@/lib/references.js';

/**
 * Como funciona / Metodologia.
 * Casa do posicionamento científico: triagem ≠ diagnóstico, requisito de
 * sensores, papel auxiliar da análise facial, status de validação e as
 * referências dos instrumentos/parâmetros. (Feedback Dr. Gustavo.)
 */
export default function MetodologiaScreen() {
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
          Como funciona
        </span>
        <span className="h-10 w-10" aria-hidden />
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <p className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
          Metodologia
        </p>
        <h1 className="mt-1.5 text-[26px] font-bold leading-tight">
          Triagem assistida, com método e transparência
        </h1>

        {/* Validação clínica */}
        <section
          className="mt-5 rounded-card border p-5"
          style={{
            backgroundColor: 'hsl(var(--menta) / 0.10)',
            borderColor: 'hsl(var(--menta) / 0.35)',
          }}
        >
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-menta" />
            <span className="rounded-pill bg-menta/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-kicker text-menta">
              {VALIDATION.badge}
            </span>
          </div>
          <p className="mt-2.5 text-[13px] leading-[1.5] text-text-primary/85">
            {VALIDATION.note}
          </p>
        </section>

        {/* Triagem ≠ diagnóstico */}
        <Card icon={FlaskConical} title="Triagem, não diagnóstico" color="laranja">
          {DISCLAIMER.inline} O diagnóstico definitivo vem do médico após
          polissonografia.
        </Card>

        {/* Requisito do wearable */}
        <Card icon={Watch} title="O que o relógio precisa medir" color="menta">
          {WEARABLE_NOTE} Sem esses sinais, a triagem de apneia fica limitada.
        </Card>

        {/* Análise facial */}
        <Card icon={ScanFace} title="Papel da análise facial" color="sun-moon">
          {FACIAL_NOTE} Por isso a captura inclui frontal e perfil.
        </Card>

        {/* Referências */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <div className="flex items-center gap-2">
            <BookOpen size={15} className="text-baunilha/70" />
            <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
              Referências científicas
            </p>
          </div>
          <ul className="mt-3 flex flex-col gap-2">
            {REF_ALL.map((ref, i) => (
              <li
                key={i}
                className="text-[11.5px] leading-[1.45] text-baunilha/70 border-l-2 border-surface-2 pl-3"
              >
                {ref}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function Card({ icon: Icon, title, color, children }) {
  return (
    <section className="mt-4 rounded-card bg-surface p-5">
      <div className="flex items-center gap-2.5">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
          style={{ backgroundColor: `hsl(var(--${color}) / 0.18)` }}
        >
          <Icon size={16} style={{ color: `hsl(var(--${color}))` }} />
        </span>
        <h2 className="text-[15px] font-bold text-text-primary/95">{title}</h2>
      </div>
      <p className="mt-2.5 text-[13px] leading-[1.5] text-baunilha/75">{children}</p>
    </section>
  );
}
