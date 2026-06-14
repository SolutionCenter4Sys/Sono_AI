/**
 * Toast leve baseado em eventos (sem dependência externa).
 * `comingSoon()` dispara um evento que o <ToastHost> escuta e renderiza.
 *
 * Substituiu o sonner, que lançava "Invalid hook call" com React 19.2.
 */
export const DEMO_TOAST_EVENT = 'demo-toast';

export function showToast(title, description) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(DEMO_TOAST_EVENT, { detail: { title, description } })
  );
}

/** Feedback padrão para ações sem backend no protótipo. */
export function comingSoon(label = 'Esta ação') {
  showToast(
    `${label} estará disponível na versão final 🚧`,
    'Protótipo — sem backend nesta fase.'
  );
}
