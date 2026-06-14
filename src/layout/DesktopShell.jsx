import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  FileText,
  Users,
  Settings,
  Home,
} from 'lucide-react';
import { useTheme } from '@/lib/theme.js';
import BrandFooter from './BrandFooter.jsx';

/**
 * Shell desktop para o Portal Médico C2.
 * Sidebar fixa 240px + área de conteúdo flexível.
 */
const NAV_ITEMS = [
  { to: '/medico/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/medico/triagem', label: 'Triagem', icon: ClipboardList },
  { to: '/medico/agenda', label: 'Agenda', icon: Calendar },
  { to: '/medico/laudo', label: 'Laudos', icon: FileText },
  { to: '/medico/pacientes', label: 'Pacientes', icon: Users },
  { to: '/medico/cadastro', label: 'Cadastro', icon: Settings },
];

export default function DesktopShell() {
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-dvh w-full bg-marinho-deep text-text-primary">
      <div className="flex min-h-dvh">
        <aside className="w-60 bg-marinho border-r border-surface-2/40 flex flex-col py-6 px-4">
          {/* Brand */}
          <div className="flex items-center gap-2 mb-6 px-2">
            <span className="block h-2.5 w-2.5 rounded-full bg-laranja" />
            <span className="text-base font-bold tracking-tight">Instituto do Sono</span>
            <span
              className="text-[8px] font-semibold uppercase tracking-[0.16em] px-1 py-0.5 rounded"
              style={{ backgroundColor: 'hsl(var(--laranja) / 0.16)', color: 'hsl(var(--laranja))' }}
            >
              Protótipo
            </span>
          </div>

          <p className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-kicker text-baunilha/40">
            Portal Médico
          </p>

          <nav className="flex flex-col gap-1.5">
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm transition ${
                    isActive
                      ? 'bg-laranja/14 text-laranja font-semibold'
                      : 'text-text-primary/70 hover:bg-surface-2/40 font-medium'
                  }`
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex-1" />

          {/* User card */}
          <div className="rounded-[12px] bg-surface p-2.5 flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-menta text-text-on-brand font-bold text-[11px]">
              MR
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold truncate">Dr. Marcos R.</p>
              <p className="text-[9px] font-medium text-baunilha/55 tracking-wide">CRM 117892-SP</p>
            </div>
          </div>

          {/* Footer controls */}
          <div className="mt-3 flex items-center gap-2">
            <Link
              to="/"
              className="grid h-7 w-7 place-items-center rounded-full bg-surface/85 border border-surface-2/60 text-baunilha/70"
              aria-label="Dashboard"
            >
              <Home size={12} />
            </Link>
            <button
              type="button"
              onClick={toggle}
              className="flex-1 rounded-full bg-surface/60 border border-surface-2/60 px-2 py-1 text-[10px] font-medium uppercase tracking-kicker text-baunilha/75"
            >
              {theme === 'dark' ? '☾ Dark' : '☀ Light'}
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-auto flex flex-col">
          <div className="flex-1">
            <Outlet />
          </div>
          <BrandFooter className="border-t border-surface-2/30" />
        </main>
      </div>
    </div>
  );
}
