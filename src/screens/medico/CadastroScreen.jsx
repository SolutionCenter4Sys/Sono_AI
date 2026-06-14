import { useNavigate } from 'react-router-dom';
import { Check, FileText } from 'lucide-react';

const ESPECIALIDADES = [
  { label: 'Pneumologia', active: true },
  { label: 'Medicina do sono', active: true },
  { label: 'Cardiologia', active: false },
  { label: 'Otorrino', active: false },
];

const DOCS = [
  { name: 'Diploma_CRM.pdf', size: '2.4MB' },
  { name: 'RQE_Pneumo.pdf', size: '1.8MB' },
  { name: 'Termo_Adesao.pdf', size: '312KB' },
];

export default function CadastroScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5">
        <div>
          <h1 className="text-[22px] font-bold text-text-primary">
            Cadastro de médico prescritor
          </h1>
          <p className="text-xs text-baunilha/70">Validação CRM · RQE · CNES</p>
        </div>
      </header>

      <div className="space-y-4 px-8 pb-8">
        {/* Professional data card */}
        <section className="rounded-card-lg bg-surface p-6">
          <Label className="text-menta">Dados profissionais</Label>
          <div className="mt-3 grid grid-cols-4 gap-4">
            <Field label="Nome completo" value="Marcos Rocha" />
            <Field label="CPF" value="123.456.789-00" />
            <Field label="E-mail" value="marcos.rocha@email.com" />
            <Field label="Telefone" value="(11) 9 9876-5432" />
          </div>

          <Label className="mt-6">Registros</Label>
          <div className="mt-3 grid grid-cols-3 gap-4">
            <Field label="CRM" value="117892-SP" verified="ok" />
            <Field label="RQE Pneumologia" value="8743" verified="pending" />
            <Field label="CNES" value="7654321" />
          </div>

          <Label className="mt-6">Especialidades</Label>
          <div className="mt-3 flex flex-wrap gap-3">
            {ESPECIALIDADES.map((e) => (
              <span
                key={e.label}
                className={`rounded-pill px-4 py-2.5 text-sm font-medium ${
                  e.active
                    ? 'bg-laranja text-text-on-brand'
                    : 'bg-surface-2 text-text-primary'
                }`}
              >
                {e.label}
              </span>
            ))}
          </div>
        </section>

        {/* Documents */}
        <section className="rounded-card-lg bg-surface p-6">
          <Label>Documentos uploadados</Label>
          <div className="mt-3 grid grid-cols-3 gap-4">
            {DOCS.map((d) => (
              <div
                key={d.name}
                className="flex items-center gap-3 rounded-card bg-surface-2 p-4"
              >
                <FileText size={20} className="shrink-0 text-baunilha/70" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-text-primary">{d.name}</p>
                  <p className="text-xs text-baunilha/60">{d.size}</p>
                </div>
                <span className="flex items-center gap-1 rounded-pill bg-risk-low/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-kicker text-risk-low">
                  <Check size={11} /> Validado
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/medico/dashboard')}
            className="rounded-button bg-surface-2 px-6 py-3.5 text-sm font-semibold text-text-primary"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => navigate('/medico/dashboard')}
            className="flex items-center gap-2 rounded-button bg-laranja px-6 py-3.5 text-sm font-semibold text-text-on-brand shadow-cta"
          >
            Salvar alterações <Check size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Label({ children, className = '' }) {
  return (
    <span
      className={`text-xs font-semibold uppercase tracking-kicker text-baunilha/50 ${className}`}
    >
      {children}
    </span>
  );
}

function Field({ label, value, verified }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-kicker text-baunilha/60">
          {label}
        </span>
        {verified === 'ok' && (
          <span className="rounded-pill bg-risk-low/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-kicker text-risk-low">
            Verificado
          </span>
        )}
        {verified === 'pending' && (
          <span className="rounded-pill bg-risk-moderate/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-kicker text-risk-moderate">
            Pendente
          </span>
        )}
      </div>
      <div className="mt-1.5 rounded-button bg-surface-2 px-4 py-3 text-sm text-text-primary">
        {value}
      </div>
    </div>
  );
}
