import { useState } from 'react';
import { Search, Plus } from 'lucide-react';

const WEEK = [
  {
    day: 'Seg 9',
    count: '3 consultas',
    slots: [
      { label: 'Maria L.', tone: 'menta' },
      { label: 'PSG · João S.', tone: 'sun-moon' },
      { label: 'João A.', tone: 'laranja' },
    ],
  },
  {
    day: 'Ter 10',
    count: '2 consultas',
    slots: [
      { label: 'Carlos M.', tone: 'menta' },
      { label: 'Helena R.', tone: 'menta' },
    ],
  },
  {
    day: 'Qua 11',
    count: '1 consulta',
    slots: [{ label: 'PSG · Bruno T.', tone: 'sun-moon' }],
  },
  {
    day: 'Qui 12',
    count: '3 consultas',
    slots: [
      { label: 'Ana P.', tone: 'menta' },
      { label: 'Pedro L.', tone: 'laranja' },
      { label: 'Juliana C.', tone: 'menta' },
    ],
  },
  { day: 'Sex 13', count: '0', slots: [{ label: '+ Add', tone: 'empty' }] },
  {
    day: 'Sáb 14',
    count: '1 plantão',
    slots: [{ label: 'Plantão AFIP', tone: 'menta' }],
  },
  { day: 'Dom 15', count: '0', slots: [{ label: '+ Add', tone: 'empty' }] },
];

const UPCOMING = [
  { initials: 'JS', name: 'João Silva', sub: 'PSG · novo encaminhamento', when: '21:00' },
  { initials: 'MS', name: 'Marcos Silva', sub: 'Retorno CPAP', when: 'Amanhã 14h' },
  { initials: 'AC', name: 'Ana Costa', sub: '1ª consulta', when: '15 Jun' },
  { initials: 'PL', name: 'Pedro Lima', sub: 'Laudo PSG', when: '16 Jun' },
];

export default function AgendaScreen() {
  const [accBradesco, setAccBradesco] = useState(true);
  const [accPsg, setAccPsg] = useState(true);
  const [ferias, setFerias] = useState(false);

  return (
    <div className="min-h-dvh">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5">
        <div>
          <h1 className="text-[22px] font-bold text-text-primary">Minha agenda</h1>
          <p className="text-xs text-baunilha/70">Junho 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-button bg-menta/20 px-4 py-2.5 text-xs text-menta">
            <Search size={14} /> Buscar paciente
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-button bg-laranja px-4 py-2.5 text-xs font-semibold text-text-on-brand shadow-cta"
          >
            <Plus size={14} /> Novo slot
          </button>
        </div>
      </header>

      <div className="space-y-4 px-8 pb-8">
        {/* Weekly grid */}
        <section className="rounded-card-lg bg-surface p-6">
          <span className="text-xs font-semibold uppercase tracking-kicker text-menta">
            Visão semanal · 9–15 jun
          </span>
          <div className="mt-4 grid grid-cols-7 gap-3">
            {WEEK.map((col) => (
              <div key={col.day}>
                <p className="text-sm font-bold text-text-primary">{col.day}</p>
                <p className="text-xs text-baunilha/60">{col.count}</p>
                <div className="mt-3 space-y-2">
                  {col.slots.map((s, i) => (
                    <Slot key={i} label={s.label} tone={s.tone} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom: upcoming + settings */}
        <div className="grid grid-cols-2 gap-4">
          <section className="rounded-card-lg bg-surface p-6">
            <span className="text-xs font-semibold uppercase tracking-kicker text-baunilha/50">
              Próximos pacientes
            </span>
            <div className="mt-3 space-y-3.5">
              {UPCOMING.map((u) => (
                <div key={u.initials} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 text-xs font-bold text-baunilha">
                    {u.initials}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-text-primary">{u.name}</p>
                    <p className="text-xs text-baunilha/60">{u.sub}</p>
                  </div>
                  <span className="text-sm font-semibold text-menta">{u.when}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-card-lg bg-surface p-6">
            <span className="text-xs font-semibold uppercase tracking-kicker text-baunilha/50">
              Configurações
            </span>
            <div className="mt-3 space-y-1">
              <Toggle label="Aceitar pacientes Bradesco" on={accBradesco} set={setAccBradesco} />
              <Toggle label="Aceitar PSG móvel" on={accPsg} set={setAccPsg} />
              <Toggle label="Modo férias (até 30/06)" on={ferias} set={setFerias} />
            </div>
            <button
              type="button"
              className="mt-3 flex items-center gap-1.5 rounded-button bg-surface-2 px-4 py-3 text-xs font-semibold text-text-primary"
            >
              Editar slots padrão →
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

function Slot({ label, tone }) {
  if (tone === 'empty') {
    return (
      <div className="rounded-button border border-dashed border-surface-2 px-3 py-2 text-xs text-baunilha/50">
        {label}
      </div>
    );
  }
  const isLaranja = tone === 'laranja';
  return (
    <div
      className={`rounded-button px-3 py-2 text-xs font-medium ${
        isLaranja ? 'text-text-on-brand' : 'text-marinho-deep'
      }`}
      style={{ backgroundColor: `hsl(var(--${tone}))` }}
    >
      {label}
    </div>
  );
}

function Toggle({ label, on, set }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-text-primary">{label}</span>
      <button
        type="button"
        onClick={() => set(!on)}
        className={`flex h-6 w-11 items-center rounded-full p-0.5 transition-colors ${
          on ? 'bg-menta' : 'bg-surface-2'
        }`}
        aria-pressed={on}
      >
        <span
          className={`h-5 w-5 rounded-full bg-white transition-transform ${
            on ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
