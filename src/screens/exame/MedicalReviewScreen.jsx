import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';

const PREVIEW = [
  { label: 'IAH (eventos/h)', value: '18.2', tone: 'risk-moderate' },
  { label: 'SpO₂ mínima', value: '84%', tone: 'risk-moderate' },
  { label: 'Eficiência do sono', value: '78%', tone: 'menta' },
  { label: 'Diagnóstico IA preliminar', value: 'AOS moderada', tone: 'sun-moon' },
];

export default function MedicalReviewScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      {/* TopBar */}
      <div className="flex items-center justify-between px-4 py-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2/60 text-text-primary"
          aria-label="Voltar"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-xs font-semibold uppercase tracking-kicker text-baunilha/60">
          Meu exame
        </span>
        <span className="h-10 w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {/* Hero */}
        <div className="flex flex-col items-center pt-5 text-center">
          <span className="inline-flex rounded-pill bg-sun-moon px-4 py-2 text-xs font-bold uppercase tracking-kicker text-marinho-deep">
            ● Em revisão médica
          </span>
          <span className="mt-2 text-5xl">🩺</span>
          <h1 className="mt-2 text-2xl font-bold text-text-primary">Seu médico está revisando</h1>
          <p className="mt-2 text-sm text-baunilha/80">
            Dr. Marcos Rocha está validando os achados da IA.
          </p>
        </div>

        {/* Doctor card */}
        <section className="mt-4 rounded-card bg-surface p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-menta text-base font-bold text-text-on-brand">
              MR
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-text-primary">Dr. Marcos Rocha</p>
              <p className="text-xs text-baunilha/70">Pneumologista · CRM 117892-SP</p>
            </div>
            <span className="rounded-pill bg-risk-low/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-kicker text-risk-low">
              Online
            </span>
          </div>
        </section>

        {/* IA preview */}
        <section className="mt-3 rounded-card bg-marinho p-4">
          <span className="text-xs font-semibold uppercase tracking-kicker text-sun-moon">
            Preview do laudo IA
          </span>
          <div className="mt-3 space-y-3">
            {PREVIEW.map((p) => (
              <div key={p.label} className="flex items-center justify-between">
                <span className="text-xs text-baunilha/80">{p.label}</span>
                <span
                  className="text-sm font-bold"
                  style={{ color: `hsl(var(--${p.tone}))` }}
                >
                  {p.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Info note (menta) */}
        <div className="mt-3 flex items-start gap-2 rounded-card bg-menta p-4">
          <span className="text-sm">💡</span>
          <p className="text-xs leading-relaxed text-text-primary">
            O médico pode confirmar, ajustar ou solicitar revisão dos achados.
          </p>
        </div>
      </div>

      <footer className="px-5 pb-4 pt-3">
        <PrimaryButton
          className="bg-menta text-text-on-brand shadow-none"
          onClick={() => navigate('/exame/resultado')}
        >
          Enviar pergunta
        </PrimaryButton>
        <div className="mt-1 flex justify-center">
          <TextLink onClick={() => navigate('/exame/resultado')}>Previsão: amanhã 18h</TextLink>
        </div>
      </footer>
    </div>
  );
}
