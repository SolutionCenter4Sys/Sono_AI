import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DEMO_TOAST_EVENT } from '@/lib/demoToast.js';

/**
 * Host de toasts leve (event-based). Escuta DEMO_TOAST_EVENT e exibe um
 * cartão no topo, auto-dismiss em 2.8s. Sem dependência externa.
 */
let counter = 0;

export default function ToastHost() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    function onToast(e) {
      const id = ++counter;
      const { title, description } = e.detail ?? {};
      setToasts((prev) => [...prev, { id, title, description }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 2800);
    }
    window.addEventListener(DEMO_TOAST_EVENT, onToast);
    return () => window.removeEventListener(DEMO_TOAST_EVENT, onToast);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="pointer-events-auto w-full max-w-[360px] rounded-card bg-surface border border-surface-2/60 px-4 py-3 shadow-xl"
          >
            <p className="text-sm font-semibold text-text-primary">{t.title}</p>
            {t.description ? (
              <p className="mt-0.5 text-xs text-baunilha/60">{t.description}</p>
            ) : null}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
