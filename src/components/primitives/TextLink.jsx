import { cn } from '@/lib/utils.js';

/**
 * Link/botão secundário discreto — usado para Pular, Modo Demo, Cancelar.
 * Atende WEB-EP-02-FT-01-US-02.
 */
export default function TextLink({
  children,
  onClick,
  className,
  as = 'button',
  ...rest
}) {
  const Component = as;
  return (
    <Component
      type={as === 'button' ? 'button' : undefined}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-md',
        'px-3 py-1.5 text-xs font-medium tracking-kicker uppercase',
        'text-baunilha/60 underline decoration-baunilha/35 underline-offset-4',
        'transition-colors hover:text-baunilha/85',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-baunilha',
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
