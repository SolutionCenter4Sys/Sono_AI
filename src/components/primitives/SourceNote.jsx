/**
 * Nota de fonte/referência discreta, em rodapé de tela ou card.
 * Aceita uma string ou um array de citações.
 */
export default function SourceNote({ sources, label = 'Referências', className = '' }) {
  const list = (Array.isArray(sources) ? sources : [sources]).filter(Boolean);
  if (!list.length) return null;
  return (
    <div className={'text-[10px] leading-[1.45] text-baunilha/45 ' + className}>
      <span className="font-semibold uppercase tracking-kicker">{label}</span>
      <ul className="mt-1 flex flex-col gap-0.5">
        {list.map((s, i) => (
          <li key={i}>· {s}</li>
        ))}
      </ul>
    </div>
  );
}
