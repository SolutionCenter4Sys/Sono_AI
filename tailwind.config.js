/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="light"]'],
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'marinho-deep': 'hsl(var(--marinho-deep) / <alpha-value>)',
        marinho: 'hsl(var(--marinho) / <alpha-value>)',
        surface: 'hsl(var(--surface) / <alpha-value>)',
        'surface-2': 'hsl(var(--surface-2) / <alpha-value>)',
        laranja: 'hsl(var(--laranja) / <alpha-value>)',
        baunilha: 'hsl(var(--baunilha) / <alpha-value>)',
        menta: 'hsl(var(--menta) / <alpha-value>)',
        'risk-low': 'hsl(var(--risk-low) / <alpha-value>)',
        'risk-moderate': 'hsl(var(--risk-moderate) / <alpha-value>)',
        'risk-high': 'hsl(var(--risk-high) / <alpha-value>)',
        'risk-critical': 'hsl(var(--risk-critical) / <alpha-value>)',
        'text-primary': 'hsl(var(--text-primary) / <alpha-value>)',
        'text-on-brand': 'hsl(var(--text-on-brand) / <alpha-value>)',
        'sun-moon': 'hsl(var(--sun-moon) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        button: '16px',
        card: '20px',
        'card-lg': '24px',
        pill: '999px',
      },
      boxShadow: {
        cta: '0 8px 24px 0 hsl(var(--laranja) / 0.30)',
      },
      letterSpacing: {
        kicker: '0.10em',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
