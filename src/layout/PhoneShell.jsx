import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Bug } from 'lucide-react';
import { useTheme } from '@/lib/theme.js';
import BrandFooter from './BrandFooter.jsx';
import SonoAiWidget from '@/components/SonoAiWidget.jsx';

/**
 * Shell mobile compartilhado pelas telas paciente.
 * - Em desktop: phone frame visual centralizado (412×917)
 * - Em mobile: full-width
 * - Theme toggle + debug menu flutuantes no canto superior direito
 * - Botão "Ir pro Dashboard" no canto inferior esquerdo (atalho de navegação na demo)
 */
export default function PhoneShell() {
  const { theme, toggle } = useTheme();
  // ?capture na URL esconde os controles de dev e renderiza um palco fixo
  // 412×917 — para screenshots limpos e determinísticos (deck/demo)
  const capture = new URLSearchParams(useLocation().search).has('capture');

  if (capture) {
    return (
      <div className="min-h-dvh w-full bg-marinho-deep flex justify-center items-start">
        <div className="relative w-[412px] h-[917px] overflow-hidden bg-marinho-deep">
          <Outlet />
          <SonoAiWidget />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh w-full bg-marinho-deep flex flex-col items-center sm:justify-center">
      <div
        className="relative w-full bg-marinho-deep h-dvh overflow-hidden
                   sm:max-w-[412px] sm:mt-4 sm:rounded-[36px] sm:border sm:border-surface-2/40
                   sm:shadow-2xl sm:shadow-black/40 sm:h-[917px]"
      >
        <Outlet />

        {/* Sono AI flutuante — vive por cima das telas do paciente */}
        <SonoAiWidget />

        {/* Floating dev controls */}
        <div className="absolute top-2 right-2 z-50 flex gap-1.5">
          <DebugMenu />
          <button
            type="button"
            onClick={toggle}
            className="rounded-full bg-surface/85 backdrop-blur px-3 py-1.5 text-[10px] font-medium uppercase tracking-kicker text-baunilha/75 border border-surface-2/60 shadow-lg"
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? '☾' : '☀'}
          </button>
        </div>

        <Link
          to="/inicio"
          className="absolute top-2 left-2 z-50 grid h-7 w-7 place-items-center rounded-full bg-surface/85 backdrop-blur border border-surface-2/60 text-baunilha/70 shadow-lg"
          aria-label="Início do paciente"
        >
          <Home size={13} />
        </Link>
      </div>

      <BrandFooter />
    </div>
  );
}

const DEBUG_LINKS = [
  { group: 'Navegação', items: [
    ['/inicio', '🏠 Início do paciente'],
    ['/', '☰ Índice de telas (dev)'],
  ]},
  { group: 'Core Flow', items: [
    ['/app/home', 'Home'],
    ['/app/loading', 'Loading'],
    ['/app/questionnaire', 'Questionnaire'],
    ['/app/result', 'Result'],
    ['/app/error/hcNotInstalled', 'Error · HC ausente'],
  ]},
  { group: 'Onboarding · Pairing', items: [
    ['/onboarding/welcome', 'Welcome'],
    ['/pairing/select', 'Pairing select'],
  ]},
  { group: 'Sono AI · Sleep Score', items: [
    ['/sono-ai/full', 'Chat full'],
    ['/score', 'Sleep Score'],
    ['/score/ranking', 'Ranking'],
  ]},
  { group: 'Polisso · Triagem · Agenda · Exame', items: [
    ['/polisso-movel/sugestao', 'Polisso sugestão'],
    ['/triagem/intro', 'Triagem'],
    ['/agenda/mapa', 'Agenda'],
    ['/exame/preparo', 'Exame'],
  ]},
  { group: 'Médico (desktop)', items: [
    ['/medico/dashboard', 'Dashboard médico'],
  ]},
];

function DebugMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Menu de debug"
        className="grid h-7 w-7 place-items-center rounded-full bg-surface/85 backdrop-blur border border-surface-2/60 text-baunilha/70 shadow-lg"
      >
        <Bug size={13} />
      </button>
      {open ? (
        <div className="absolute right-0 mt-1.5 w-64 rounded-card bg-surface border border-surface-2/60 shadow-xl p-2 text-sm max-h-[80vh] overflow-y-auto">
          <p className="px-2 pt-1 pb-2 text-[10px] font-semibold uppercase tracking-kicker text-baunilha/55">
            Debug · pular para tela
          </p>
          {DEBUG_LINKS.map((g) => (
            <div key={g.group} className="mb-1">
              <p className="px-2 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-kicker text-menta/70">
                {g.group}
              </p>
              {g.items.map(([path, label]) => (
                <button
                  key={path}
                  type="button"
                  onClick={() => { navigate(path); setOpen(false); }}
                  className={`w-full text-left rounded px-2 py-1.5 text-[12px] hover:bg-surface-2/60 transition ${
                    location.pathname === path ? 'text-laranja' : 'text-text-primary/90'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
