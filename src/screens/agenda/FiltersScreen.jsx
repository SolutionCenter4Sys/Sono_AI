import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check } from 'lucide-react';
import PrimaryButton from '@/components/primitives/PrimaryButton.jsx';
import TextLink from '@/components/primitives/TextLink.jsx';

const CONVENIOS = ['Bradesco Saúde', 'Sul América', 'Amil', 'Particular', 'SUS', 'Outros'];
const EXAMES = [
  'Polissonografia (PSG)',
  'Polissonografia split-night',
  'Actigrafia',
  'MSLT (latência)',
];

export default function FiltersScreen() {
  const navigate = useNavigate();
  const [convenio, setConvenio] = useState('Bradesco Saúde');
  const [distance, setDistance] = useState(5);
  const [exame, setExame] = useState('Polissonografia (PSG)');

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
          Filtros
        </span>
        <span className="h-10 w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {/* Convênio */}
        <section className="mt-2 rounded-card bg-marinho p-5">
          <SectionLabel>Convênio aceito</SectionLabel>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {CONVENIOS.map((c) => {
              const active = c === convenio;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setConvenio(c)}
                  className={`flex items-center justify-center gap-2 rounded-button px-3 py-3.5 text-sm font-medium transition-colors ${
                    active
                      ? 'border border-laranja/60 bg-laranja/15 text-text-primary'
                      : 'bg-surface-2 text-text-primary/90'
                  }`}
                >
                  {active && <span className="h-2.5 w-2.5 rounded-full bg-laranja" />}
                  {c}
                </button>
              );
            })}
          </div>
        </section>

        {/* Distância */}
        <section className="mt-4 rounded-card bg-marinho p-5">
          <SectionLabel>Distância máxima</SectionLabel>
          <div className="mt-3 flex items-end justify-between">
            <span className="text-2xl font-bold text-text-primary">Até {distance} km</span>
            <span className="text-xs text-baunilha/60">1 - 50 km</span>
          </div>
          <input
            type="range"
            min={1}
            max={50}
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="mt-3 w-full accent-laranja"
          />
        </section>

        {/* Tipos de exame */}
        <section className="mt-4 rounded-card bg-marinho p-5">
          <SectionLabel>Tipos de exame</SectionLabel>
          <div className="mt-3 flex flex-col gap-3">
            {EXAMES.map((e) => {
              const active = e === exame;
              return (
                <button
                  key={e}
                  type="button"
                  onClick={() => setExame(e)}
                  className={`flex items-center gap-3 rounded-button px-4 py-3.5 text-left text-sm font-medium transition-colors ${
                    active
                      ? 'border border-laranja/60 bg-laranja/15 text-text-primary'
                      : 'bg-surface-2 text-text-primary/90'
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      active ? 'border-laranja text-laranja' : 'border-baunilha/40'
                    }`}
                  >
                    {active && <Check size={13} />}
                  </span>
                  {e}
                </button>
              );
            })}
          </div>
        </section>

        <div className="mt-6 flex justify-center">
          <TextLink
            onClick={() => {
              setConvenio('');
              setDistance(50);
              setExame('');
            }}
          >
            Limpar filtros
          </TextLink>
        </div>
      </div>

      <footer className="px-6 pb-4 pt-3">
        <PrimaryButton trailingIcon="→" onClick={() => navigate('/agenda/mapa')}>
          Aplicar filtros · 2 ativos
        </PrimaryButton>
      </footer>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-kicker text-baunilha/50">
      {children}
    </span>
  );
}
