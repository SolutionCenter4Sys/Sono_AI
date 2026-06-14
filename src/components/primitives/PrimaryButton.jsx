import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils.js';

/**
 * CTA primário Laranja com texto sempre branco (TextOnBrand).
 * Atende WEB-EP-02-FT-01-US-01.
 *
 * Props:
 * - children: label do botão
 * - leadingIcon / trailingIcon: nodes opcionais (ex.: setas, ícones lucide)
 * - disabled: opacity reduzida + sem shadow + cursor not-allowed
 * - block: ocupa 100% da largura disponível (default true)
 */
const PrimaryButton = forwardRef(function PrimaryButton(
  {
    children,
    leadingIcon = null,
    trailingIcon = null,
    disabled = false,
    block = true,
    className,
    onClick,
    type = 'button',
    ...rest
  },
  ref
) {
  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 600, damping: 32 }}
      className={cn(
        'inline-flex items-center justify-center gap-2.5',
        'rounded-button bg-laranja px-6 py-3.5',
        'text-base font-semibold text-text-on-brand',
        'shadow-cta transition-shadow',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-laranja',
        block && 'w-full',
        disabled && 'cursor-not-allowed opacity-50 shadow-none',
        className
      )}
      {...rest}
    >
      {leadingIcon ? <span aria-hidden>{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? <span aria-hidden>{trailingIcon}</span> : null}
    </motion.button>
  );
});

export default PrimaryButton;
