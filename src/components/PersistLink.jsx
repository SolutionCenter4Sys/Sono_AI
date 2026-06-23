/**
 * <PersistLink> — wrapper do `<Link>` do react-router que preserva o
 * parâmetro `?uc=<persona>` automaticamente em qualquer navegação interna
 * do protótipo.
 *
 * Drop-in replacement: aceita as mesmas props do `<Link>` (to, replace,
 * className, children, ...).
 *
 * Aceita `to` como string OU objeto `{ pathname, search }`. Em ambos os
 * casos, `?uc=` da URL atual é mesclado no `search` resultante (não
 * sobrescreve se o destino já especificou `uc` explicitamente).
 *
 * Uso:
 *   <PersistLink to="/inicio">Home</PersistLink>
 *   <PersistLink to="/score?profile=novo">Score vazio</PersistLink>
 */
import { Link, useSearchParams } from 'react-router-dom';

function buildSearch(targetSearch, currentParams) {
  const target = new URLSearchParams(targetSearch || '');
  // Só copia uc se o target não definiu explicitamente
  const uc = currentParams.get('uc');
  if (uc && !target.has('uc')) target.set('uc', uc);
  const s = target.toString();
  return s ? `?${s}` : '';
}

export default function PersistLink({ to, children, ...rest }) {
  const [currentParams] = useSearchParams();

  let resolved;
  if (typeof to === 'string') {
    // Separa pathname?search#hash do string
    const [pathPlus, hash] = to.split('#');
    const [pathname, search] = pathPlus.split('?');
    resolved = {
      pathname,
      search: buildSearch(search, currentParams),
      ...(hash ? { hash: `#${hash}` } : {}),
    };
  } else if (to && typeof to === 'object') {
    resolved = {
      ...to,
      search: buildSearch(to.search, currentParams),
    };
  } else {
    resolved = to;
  }

  return (
    <Link to={resolved} {...rest}>
      {children}
    </Link>
  );
}
