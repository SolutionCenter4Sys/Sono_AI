/** Assinatura institucional — "Powered by Foursys". Usada nos shells e no dashboard. */
export default function BrandFooter({ className = '' }) {
  return (
    <footer
      className={`py-3 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-baunilha/35 ${className}`}
    >
      Powered by <span className="text-baunilha/60 font-semibold">Foursys</span>
    </footer>
  );
}
