import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ArrowUp } from 'lucide-react';

/**
 * Widget flutuante do Sono AI — vive por cima das telas do paciente (montado no
 * PhoneShell). FAB pulsante no canto inferior direito que abre um bottom-sheet
 * de chat. Mockado, com interação leve (chips de sugestão + envio).
 *
 * Escondido nas telas onde não faz sentido (onboarding/pairing/setup) e nas
 * telas avulsas de demonstração do próprio Sono AI (/sono-ai/*).
 */
const HIDE_PREFIXES = ['/onboarding', '/pairing', '/sono-ai'];

const GREETING = {
  role: 'ai',
  text: 'Oi, João 👋 Sou o Sono AI. Posso te ajudar a entender sua última noite, sua triagem ou o próximo passo do seu tratamento.',
};

const SUGGESTIONS = [
  {
    q: 'Como foi minha última noite?',
    a: 'Sua última noite teve qualidade 62/100, com 3 quedas de SpO₂ e FC média de 68 bpm — um sono moderado. Quer que eu detalhe os eventos?',
  },
  {
    q: 'Por que minha FC subiu?',
    a: 'Nas noites com cafeína após as 16h sua FC noturna ficou ~9 bpm acima do baseline. Reduzir a cafeína à tarde costuma ajudar.',
  },
  {
    q: 'O que é a polissonografia?',
    a: 'É um exame que monitora seu sono a noite toda (respiração, oxigênio, FC) para confirmar apneia. Você pode fazer em casa ou presencial.',
  },
];

const FALLBACK_REPLY =
  'Boa pergunta! Nesta versão de protótipo eu respondo só com exemplos — no app final eu analiso seus dados reais de sono para te responder. 🌙';

export default function SonoAiWidget() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [draft, setDraft] = useState('');

  if (HIDE_PREFIXES.some((p) => pathname.startsWith(p))) return null;

  const ask = (q, a) => {
    setMessages((m) => [...m, { role: 'user', text: q }, { role: 'ai', text: a }]);
  };

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setDraft('');
    ask(text, FALLBACK_REPLY);
  };

  const showSuggestions = messages.length <= 1;

  return (
    <>
      {/* FAB */}
      <AnimatePresence>
        {!open ? (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir Sono AI"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute bottom-6 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-menta"
            style={{ boxShadow: '0 0 28px hsl(var(--menta) / 0.45)' }}
          >
            <motion.span
              className="grid place-items-center"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles size={24} strokeWidth={2} className="text-marinho-deep" />
            </motion.span>
          </motion.button>
        ) : null}
      </AnimatePresence>

      {/* Sheet + backdrop */}
      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              className="absolute inset-0 z-40 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.section
              className="absolute inset-x-0 bottom-0 z-40 flex max-h-[86%] flex-col rounded-t-[28px] bg-marinho-deep border-t border-surface-2/50"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            >
              {/* grabber */}
              <div className="flex justify-center pt-2.5">
                <span className="h-1 w-10 rounded-full bg-surface-2" />
              </div>

              {/* header */}
              <header className="flex items-center justify-between px-5 pt-2 pb-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className="grid h-9 w-9 place-items-center rounded-full bg-menta"
                    style={{ boxShadow: '0 0 18px hsl(var(--menta) / 0.4)' }}
                  >
                    <Sparkles size={17} className="text-marinho-deep" />
                  </span>
                  <div>
                    <p className="text-[14px] font-bold leading-none">Sono AI</p>
                    <p className="mt-1 text-[11px] text-menta">● online</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fechar"
                  className="grid h-9 w-9 place-items-center rounded-full bg-surface-2/60 text-text-primary/90 transition hover:bg-surface-2"
                >
                  <X size={18} strokeWidth={2.4} />
                </button>
              </header>

              {/* messages */}
              <div className="flex-1 space-y-3 overflow-y-auto px-5 py-3">
                {messages.map((m, i) =>
                  m.role === 'user' ? (
                    <div key={i} className="flex justify-end">
                      <div className="max-w-[80%] rounded-2xl rounded-br-md bg-laranja px-4 py-2.5 text-[14px] font-medium leading-[1.4] text-text-on-brand">
                        {m.text}
                      </div>
                    </div>
                  ) : (
                    <div key={i} className="flex justify-start">
                      <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-surface px-4 py-2.5 text-[14px] leading-[1.45] text-text-primary/90">
                        {m.text}
                      </div>
                    </div>
                  ),
                )}

                {showSuggestions ? (
                  <div className="flex flex-col items-start gap-2 pt-1">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s.q}
                        type="button"
                        onClick={() => ask(s.q, s.a)}
                        className="rounded-pill border border-menta/35 bg-menta/10 px-3.5 py-2 text-[13px] font-medium text-menta transition hover:bg-menta/20"
                      >
                        {s.q}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              {/* input */}
              <div className="px-5 pb-6 pt-2">
                <div className="flex items-center gap-2.5 rounded-pill bg-surface-2/60 px-4 py-2">
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && send()}
                    placeholder="Digite sua pergunta..."
                    className="flex-1 bg-transparent text-[14px] text-text-primary placeholder:text-baunilha/50 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={send}
                    aria-label="Enviar"
                    className="grid h-9 w-9 flex-none place-items-center rounded-full bg-laranja text-text-on-brand transition active:scale-95"
                  >
                    <ArrowUp size={18} strokeWidth={2.4} />
                  </button>
                </div>
              </div>
            </motion.section>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
