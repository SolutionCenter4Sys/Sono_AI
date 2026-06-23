import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, Moon, Watch } from 'lucide-react';
import { getPersona } from '@/data/personasMock.js';
import { useSleepScoreAdmin } from '@/lib/sleepScoreService.jsx';

/**
 * /medico/pacientes · Lista de pacientes do consultório (Portal Médico C2).
 * Busca, filtro por etapa do tratamento e ativação do Sleep Score por paciente.
 *
 * Posicionamento: usa "perfil de atenção" e etapa de tratamento, nunca "risco".
 * Diagnóstico aparece só para quem já tem laudo (PSG + médico).
 */

/** Etapas do tratamento — cor + label. */
const STAGE = {
  triagem: { label: 'Triagem', token: 'menta' },
  exame: { label: 'Em exame', token: 'sun-moon' },
  laudo: { label: 'Laudo pendente', token: 'risk-moderate' },
  tratamento: { label: 'Em tratamento', token: 'risk-low' },
  acompanhamento: { label: 'Acompanhamento', token: 'menta' },
};

/**
 * Pacientes do consultório. Os que têm `personaId` espelham as personas de demo
 * (e integram o Sleep Score real). Os demais são registros mock estáticos.
 */
const PATIENTS = [
  { personaId: 'joao', name: 'João Silva', age: 38, occupation: 'Executivo', stage: 'triagem', last: 'Triagem há 2 dias', condition: null },
  { personaId: 'maria', name: 'Maria Souza', age: 52, occupation: 'Professora', stage: 'exame', last: 'PSG em andamento', condition: null },
  { personaId: 'carlos', name: 'Carlos Rocha', age: 45, occupation: 'Motorista', stage: 'tratamento', last: 'CPAP · 120 dias', condition: 'Apneia obstrutiva — moderada' },
  { personaId: 'roberto', name: 'Roberto Mendes', age: 60, occupation: 'Aposentado', stage: 'acompanhamento', last: 'Retorno antecipado', condition: 'Apneia obstrutiva — grave' },
  { personaId: 'ana', name: 'Ana Lima', age: 29, occupation: 'Designer', stage: 'acompanhamento', last: 'Sem queixas', condition: null },
  { name: 'Helena Ramos', age: 48, occupation: 'Advogada', stage: 'laudo', last: 'PSG 09 Jun · aguardando assinatura', condition: null },
  { name: 'Pedro Lima', age: 57, occupation: 'Comerciante', stage: 'tratamento', last: 'CPAP · 90 dias', condition: 'Apneia obstrutiva — moderada' },
  { name: 'Luiza Mendes', age: 41, occupation: 'Enfermeira', stage: 'triagem', last: 'Triagem há 5 dias', condition: null },
];

const FILTERS = [
  { key: 'todos', label: 'Todos' },
  { key: 'triagem', label: 'Triagem' },
  { key: 'exame', label: 'Em exame' },
  { key: 'laudo', label: 'Laudo pendente' },
  { key: 'tratamento', label: 'Em tratamento' },
  { key: 'acompanhamento', label: 'Acompanhamento' },
];

export default function PacientesScreen() {
  const navigate = useNavigate();
  const sleepScore = useSleepScoreAdmin();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('todos');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PATIENTS.filter((p) => {
      const matchStage = filter === 'todos' || p.stage === filter;
      const matchQuery = !q || p.name.toLowerCase().includes(q);
      return matchStage && matchQuery;
    });
  }, [query, filter]);

  const activeCount = PATIENTS.filter((p) => {
    if (!p.personaId) return false;
    return sleepScore.isActive(getPersona(p.personaId));
  }).length;

  return (
    <div className="px-8 py-8">
      <header className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-kicker text-baunilha/55">
          Portal Médico
        </p>
        <h1 className="mt-1 text-[28px] font-bold leading-tight">Pacientes</h1>
        <p className="mt-1 text-[14px] text-baunilha/65">
          {PATIENTS.length} pacientes ·{' '}
          <span className="text-menta font-semibold">{activeCount} com Sleep Score ativo</span>
        </p>
      </header>

      {/* Busca */}
      <div className="mb-4 flex items-center gap-2 rounded-card bg-surface px-4 py-3">
        <Search size={16} className="text-baunilha/50" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nome…"
          className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-baunilha/40 outline-none"
        />
      </div>

      {/* Filtros por etapa */}
      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={
                'rounded-pill px-3.5 py-1.5 text-[12px] font-semibold transition ' +
                (active
                  ? 'bg-laranja text-text-on-brand'
                  : 'bg-surface text-baunilha/70 hover:bg-surface-2/60')
              }
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Lista */}
      <div className="space-y-2.5">
        {filtered.map((p) => (
          <PatientRow
            key={p.personaId ?? p.name}
            patient={p}
            sleepScore={sleepScore}
            onOpen={() => navigate('/medico/laudo')}
          />
        ))}
        {filtered.length === 0 && (
          <div className="rounded-card border border-dashed border-baunilha/20 bg-surface/50 px-6 py-10 text-center">
            <p className="text-sm text-baunilha/60">Nenhum paciente encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function PatientRow({ patient, sleepScore, onOpen }) {
  const stage = STAGE[patient.stage] ?? STAGE.triagem;
  const persona = patient.personaId ? getPersona(patient.personaId) : null;
  const canToggle = !!persona;
  const active = canToggle ? sleepScore.isActive(persona) : false;
  const initials = patient.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0].toUpperCase())
    .join('');

  return (
    <div className="flex items-center gap-4 rounded-card bg-surface p-4">
      {/* Avatar */}
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface-2 text-[13px] font-bold text-baunilha">
        {initials}
      </div>

      {/* Identidade */}
      <button type="button" onClick={onOpen} className="min-w-0 flex-1 text-left">
        <div className="flex items-center gap-2">
          <p className="text-[14px] font-semibold text-text-primary">{patient.name}</p>
          <span className="text-[12px] text-baunilha/55">· {patient.age}a · {patient.occupation}</span>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span
            className="rounded-pill px-2 py-0.5 text-[10px] font-bold uppercase tracking-kicker"
            style={{
              backgroundColor: `hsl(var(--${stage.token}) / 0.18)`,
              color: `hsl(var(--${stage.token}))`,
            }}
          >
            {stage.label}
          </span>
          <span className="text-[12px] text-baunilha/55">{patient.last}</span>
        </div>
        {patient.condition && (
          <p className="mt-1 text-[11.5px] text-baunilha/45">{patient.condition}</p>
        )}
      </button>

      {/* Sleep Score */}
      <div className="flex shrink-0 items-center gap-3">
        {canToggle ? (
          <SleepScoreControl
            active={active}
            onToggle={() =>
              active
                ? sleepScore.deactivate(patient.personaId)
                : sleepScore.activate(patient.personaId, 'Dra. Marcela')
            }
          />
        ) : (
          <span className="flex items-center gap-1.5 text-[11px] text-baunilha/40">
            <Watch size={13} /> sem wearable
          </span>
        )}
        <ChevronRight size={18} className="text-baunilha/40" />
      </div>
    </div>
  );
}

function SleepScoreControl({ active, onToggle }) {
  return (
    <div className="flex flex-col items-end gap-1.5">
      <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-kicker text-baunilha/45">
        <Moon size={11} className={active ? 'text-menta' : 'text-baunilha/40'} /> Sleep Score
      </span>
      <button
        type="button"
        onClick={onToggle}
        className="rounded-button px-3 py-1.5 text-[11.5px] font-semibold transition"
        style={{
          backgroundColor: active ? 'hsl(var(--surface-2))' : 'hsl(var(--menta))',
          color: active ? 'hsl(var(--baunilha) / 0.8)' : 'hsl(var(--marinho-deep))',
        }}
      >
        {active ? 'Ativo · desativar' : 'Ativar'}
      </button>
    </div>
  );
}
