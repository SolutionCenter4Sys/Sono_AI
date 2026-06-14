import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';

const PIPELINE = [
  { label: 'Captura dos sinais EDF', status: 'Concluído', state: 'done' },
  { label: 'Filtragem e artefatos', status: 'Concluído', state: 'done' },
  { label: 'Estagiamento (IA)', status: 'Em curso...', state: 'current' },
  { label: 'Detecção de eventos respiratórios', status: 'Aguarde', state: 'pending' },
  { label: 'Revisão médica (HITL)', status: 'Aguarde', state: 'pending' },
];

export default function AiAnalysisScreen() {
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
        <div className="flex flex-col items-center pt-3 text-center">
          <span className="inline-flex rounded-pill bg-risk-low px-4 py-1.5 text-xs font-bold uppercase tracking-kicker text-marinho-deep">
            ✓ Realizado
          </span>
          <span className="mt-2 text-5xl">🛌</span>
          <h1 className="mt-2 text-2xl font-bold text-text-primary">Exame realizado!</h1>
          <p className="mt-1 text-xs text-baunilha/70">
            12 de Junho · AFIP V.M · 7h 38min monitorados
          </p>
        </div>

        {/* Analysis in progress */}
        <section className="mt-4 rounded-card bg-surface p-4">
          <span className="text-xs font-semibold uppercase tracking-kicker text-menta">
            Análise em andamento
          </span>
          <div className="mt-3 flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-[10px] text-xl"
              style={{ backgroundColor: 'hsl(var(--menta) / 0.2)' }}
            >
              🤖
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">IA AFIP analisando</p>
              <p className="text-xs text-baunilha/70">
                Estagiamento das fases do sono · 94% confiança
              </p>
            </div>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
            <motion.div
              className="h-full rounded-full bg-menta"
              initial={{ width: 0 }}
              animate={{ width: '65%' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-baunilha/70">Etapa 3 de 5</span>
            <span className="font-bold text-menta">65%</span>
          </div>
        </section>

        {/* Pipeline */}
        <section className="mt-3 rounded-card bg-marinho p-4">
          <span className="text-xs font-semibold uppercase tracking-kicker text-baunilha/50">
            Pipeline de análise
          </span>
          <div className="mt-3 space-y-3">
            {PIPELINE.map((p) => (
              <div key={p.label} className="flex items-center gap-2.5">
                <span
                  className="h-3.5 w-3.5 shrink-0 rounded-[7px]"
                  style={{
                    backgroundColor:
                      p.state === 'done'
                        ? 'hsl(var(--risk-low))'
                        : p.state === 'current'
                          ? 'hsl(var(--menta))'
                          : '#666680',
                    boxShadow:
                      p.state === 'current' ? '0 0 10px 0 hsl(var(--menta) / 0.6)' : 'none',
                  }}
                />
                <span
                  className={`flex-1 text-xs ${
                    p.state === 'current'
                      ? 'font-semibold text-menta'
                      : 'font-medium text-text-primary'
                  }`}
                >
                  {p.label}
                </span>
                <span
                  className="text-[10px] font-semibold uppercase tracking-kicker"
                  style={{
                    color:
                      p.state === 'done'
                        ? 'hsl(var(--risk-low))'
                        : p.state === 'current'
                          ? 'hsl(var(--menta))'
                          : 'hsl(var(--baunilha))',
                  }}
                >
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Info note (sun-moon) */}
        <div className="mt-3 flex items-start gap-2 rounded-card bg-sun-moon p-4">
          <span className="text-sm">💡</span>
          <p className="text-xs leading-relaxed text-marinho-deep">
            Resultado preliminar em 24h · laudo final em até 5 dias úteis
          </p>
        </div>
        <div className="h-4" />
      </div>

      <footer className="px-5 pb-4 pt-3">
        <PrimaryButton
          className="bg-surface-2 text-text-on-brand shadow-none"
          onClick={() => navigate('/exame/em-revisao-medica')}
        >
          Ver dados brutos
        </PrimaryButton>
        <div className="mt-1 flex justify-center">
          <TextLink onClick={() => navigate('/exame/em-revisao-medica')}>Falar com médico</TextLink>
        </div>
      </footer>
    </div>
  );
}
