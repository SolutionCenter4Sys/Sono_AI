import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Building2, PackageOpen, House } from 'lucide-react';

/**
 * Confirmação do exame + escolha da modalidade (pós-aprovação).
 *
 * Este é o ÚNICO ponto em que o paciente decide ONDE fazer o exame — e só a
 * opção "receber em casa" dispara o envio do kit. A modalidade de exame é
 * independente da modalidade de atendimento: quem fez teleconsulta pode optar
 * pelo presencial, e vice-versa.
 *
 * 3 opções (definição do produto):
 *   A — Presencial no Hospital do Sono ou clínica parceira → agenda o local
 *   B — Retirar os equipamentos no hospital e fazer em casa
 *   C — Receber os equipamentos em casa → confirmação de envio do kit
 */
const MODALITIES = [
  {
    id: 'presencial',
    icon: Building2,
    color: 'menta',
    tag: 'Mais assistido',
    title: 'Fazer no Hospital do Sono',
    desc: 'Você dorme no Instituto do Sono ou em uma clínica parceira, com acompanhamento de técnicos a noite toda.',
    bullets: ['Equipe presente o tempo todo', 'Sem precisar instalar sensores', 'Ideal para casos que pedem atenção'],
    to: '/agenda/mapa',
  },
  {
    id: 'retirar',
    icon: PackageOpen,
    color: 'sun-moon',
    tag: 'Mais econômico',
    title: 'Retirar o kit no hospital',
    desc: 'Você passa no Instituto, recebe orientação presencial e leva o kit para dormir em casa na sua própria cama.',
    bullets: ['Orientação cara a cara', 'Dorme no conforto de casa', 'Devolve o kit no dia seguinte'],
    to: '/polisso-movel/retirada',
  },
  {
    id: 'casa',
    icon: House,
    color: 'laranja',
    tag: 'Mais cômodo',
    title: 'Receber o kit em casa',
    desc: 'O kit chega à sua casa em até 48h. Um técnico orienta por videochamada e os dados são enviados em tempo real.',
    bullets: ['Sem sair de casa', 'Vídeo de orientação + preparo guiado', 'Logística de ida e volta inclusa'],
    to: '/polisso-movel/confirmacao-envio',
  },
];

export default function ExamConfirmScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between px-4 pt-4 pb-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Voltar"
          className="grid h-10 w-10 place-items-center rounded-full bg-surface-2/60 text-text-primary/90 transition hover:bg-surface-2"
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>
        <span className="text-[12px] font-semibold uppercase tracking-kicker text-baunilha/70">
          Confirmar exame
        </span>
        <span className="h-10 w-10" aria-hidden />
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="pt-2 pb-1">
          <p className="text-[11px] font-semibold uppercase tracking-kicker text-menta">
            Indicação aprovada · você decide onde
          </p>
          <h1 className="mt-2 text-[24px] font-bold leading-tight">
            Onde você quer fazer o exame?
          </h1>
          <p className="mt-2 text-[13px] leading-[1.5] text-baunilha/65">
            Todas têm a mesma qualidade clínica — a diferença é só o conforto e a logística.
            O kit só é enviado se você escolher fazer em casa.
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          {MODALITIES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => navigate(m.to)}
              className="w-full rounded-card bg-surface p-4 text-left transition hover:bg-surface/80 border border-surface-2/40"
            >
              <div className="flex items-start gap-3.5">
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px]"
                  style={{ backgroundColor: `hsl(var(--${m.color}) / 0.16)` }}
                >
                  <m.icon size={22} style={{ color: `hsl(var(--${m.color}))` }} />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[9px] font-semibold uppercase tracking-[0.12em] px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: `hsl(var(--${m.color}) / 0.16)`, color: `hsl(var(--${m.color}))` }}
                    >
                      {m.tag}
                    </span>
                  </div>
                  <h2 className="mt-1.5 text-[16px] font-semibold text-text-primary/95">
                    {m.title}
                  </h2>
                  <p className="mt-1 text-[12.5px] leading-[1.45] text-baunilha/60">{m.desc}</p>
                </div>
                <ChevronRight className="mt-1 shrink-0 text-baunilha/35" size={18} />
              </div>

              <ul className="mt-3 flex flex-col gap-1.5 pl-[62px]">
                {m.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-[12px] text-text-primary/80">
                    <span
                      className="block h-1 w-1 rounded-full"
                      style={{ backgroundColor: `hsl(var(--${m.color}))` }}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        <p className="mt-5 text-center text-[11px] leading-[1.5] text-baunilha/45">
          Em todas as opções o laudo é assinado por um médico do sono do Instituto.
        </p>
      </div>
    </div>
  );
}
