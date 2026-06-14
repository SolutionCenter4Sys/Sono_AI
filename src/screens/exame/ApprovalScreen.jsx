import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check, ShieldCheck, FileSignature, Wallet, BadgeCheck } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';

/**
 * Aprovação da indicação — gate antes do paciente confirmar o exame.
 * A assinatura do médico é sempre necessária. A cobertura é escolha do
 * paciente: Convênio (precisa de autorização da operadora, mockada como
 * aprovada) ou Particular (sem autorização do convênio).
 * Próximo: /exame/confirmar.
 */
const COVERAGE = [
  {
    id: 'convenio',
    icon: ShieldCheck,
    title: 'Pelo convênio',
    hint: 'Amil Saúde · plano com cobertura',
  },
  {
    id: 'particular',
    icon: Wallet,
    title: 'Particular',
    hint: 'Pagamento direto, sem autorização do convênio',
  },
];

export default function ApprovalScreen() {
  const navigate = useNavigate();
  const [coverage, setCoverage] = useState('convenio');
  const isConvenio = coverage === 'convenio';

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
          Aprovação
        </span>
        <span className="h-10 w-10" aria-hidden />
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {/* Hero */}
        <div className="flex flex-col items-center pt-3 text-center">
          <span
            className="grid h-[88px] w-[88px] place-items-center rounded-full"
            style={{ backgroundColor: 'hsl(var(--risk-low) / 0.16)' }}
          >
            <BadgeCheck size={42} className="text-risk-low" />
          </span>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-kicker text-risk-low">
            Indicação liberada
          </p>
          <h1 className="mt-1.5 text-[24px] font-bold leading-tight">Está tudo aprovado</h1>
          <p className="mt-2 max-w-[300px] text-[13px] leading-[1.5] text-baunilha/65">
            A indicação foi assinada pelo médico. Agora é só você escolher como quer fazer.
          </p>
        </div>

        {/* Cobertura */}
        <h2 className="mt-6 mb-2.5 text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
          Como você quer cobrir o exame?
        </h2>
        <div className="flex flex-col gap-2.5">
          {COVERAGE.map((c) => {
            const active = coverage === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCoverage(c.id)}
                className="flex items-center gap-3.5 rounded-card p-4 text-left transition border"
                style={{
                  backgroundColor: active ? 'hsl(var(--laranja) / 0.12)' : 'hsl(var(--surface))',
                  borderColor: active ? 'hsl(var(--laranja))' : 'hsl(var(--surface-2) / 0.5)',
                }}
              >
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px]"
                  style={{
                    backgroundColor: active ? 'hsl(var(--laranja) / 0.18)' : 'hsl(var(--surface-2) / 0.6)',
                    color: active ? 'hsl(var(--laranja))' : 'hsl(var(--baunilha) / 0.6)',
                  }}
                >
                  <c.icon size={20} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold text-text-primary/95">{c.title}</span>
                  <span className="block text-[12px] text-baunilha/60">{c.hint}</span>
                </span>
                <span
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-full border"
                  style={{
                    backgroundColor: active ? 'hsl(var(--laranja))' : 'transparent',
                    borderColor: active ? 'hsl(var(--laranja))' : 'hsl(var(--surface-2))',
                  }}
                >
                  {active ? <Check size={14} className="text-text-on-brand" /> : null}
                </span>
              </button>
            );
          })}
        </div>

        {/* Timeline de aprovação */}
        <section className="mt-6 rounded-card bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Status da aprovação
          </p>
          <ol className="mt-4 flex flex-col gap-0">
            <Step
              icon={FileSignature}
              title="Indicação assinada"
              sub="Dr. Marcos Rocha · CRM 117892-SP"
              done
              last={false}
            />
            {isConvenio ? (
              <Step
                icon={ShieldCheck}
                title="Convênio aprovou a polissonografia"
                sub="Amil Saúde · autorização nº 4421-AOS"
                done
                last
              />
            ) : (
              <Step
                icon={Wallet}
                title="Pagamento particular"
                sub="Sem necessidade de autorização do convênio"
                done
                last
              />
            )}
          </ol>
        </section>

        <div
          className="mt-3 flex items-start gap-2.5 rounded-card p-3.5"
          style={{ backgroundColor: 'hsl(var(--risk-low) / 0.10)', border: '1px solid hsl(var(--risk-low) / 0.3)' }}
        >
          <Check size={16} className="mt-0.5 shrink-0 text-risk-low" />
          <p className="text-[12px] leading-[1.45] text-text-primary/85">
            {isConvenio
              ? 'Autorização válida por 30 dias. Você pode agendar quando preferir.'
              : 'Sem fila de autorização — você pode marcar o exame imediatamente.'}
          </p>
        </div>
      </div>

      <footer className="flex flex-col items-center gap-3 px-6 pb-5 pt-3">
        <PrimaryButton trailingIcon="→" onClick={() => navigate('/exame/confirmar')}>
          Confirmar realização do exame
        </PrimaryButton>
        <TextLink onClick={() => navigate('/inicio')}>Agora não</TextLink>
      </footer>
    </div>
  );
}

function Step({ icon: Icon, title, sub, done, last }) {
  return (
    <li className="flex gap-3">
      <div className="flex flex-col items-center">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
          style={{
            backgroundColor: done ? 'hsl(var(--risk-low) / 0.18)' : 'hsl(var(--surface-2) / 0.6)',
            color: done ? 'hsl(var(--risk-low))' : 'hsl(var(--baunilha) / 0.5)',
          }}
        >
          <Icon size={17} />
        </span>
        {!last ? <span className="my-1 w-px flex-1 bg-surface-2" /> : null}
      </div>
      <div className={last ? 'pb-0 pt-1' : 'pb-5 pt-1'}>
        <p className="text-[13.5px] font-semibold leading-snug text-text-primary/95">{title}</p>
        <p className="mt-0.5 text-[11.5px] text-baunilha/60">{sub}</p>
      </div>
    </li>
  );
}
