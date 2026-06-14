import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * Tela inicial (apenas em demo) — índice de todas as 59 telas do protótipo.
 * Cada épico é um bloco; cada tela é um link clicável.
 */
const EPICS = [
  {
    id: 'WEB-EP-03',
    title: 'Core Flow',
    subtitle: 'App diário do paciente — wearable analisa última noite',
    badge: '✅ React',
    color: 'menta',
    screens: [
      ['/app/home', 'Home (Idle)'],
      ['/app/loading', 'Loading'],
      ['/app/questionnaire', 'Questionnaire'],
      ['/app/result', 'Result'],
      ['/app/error/hcNotInstalled', 'Error · HC ausente'],
      ['/app/error/sdkOutdated', 'Error · SDK desatualizado'],
      ['/app/error/androidTooOld', 'Error · Android <10'],
      ['/app/error/permissionDenied', 'Error · Permissão negada'],
      ['/app/error/sessionNotFound', 'Error · Sessão não encontrada'],
    ],
  },
  {
    id: 'WEB-EP-05',
    title: 'Onboarding clínico',
    subtitle: 'Primeiro acesso · Consent LGPD · Perfil · Captura facial',
    color: 'laranja',
    screens: [
      ['/onboarding/welcome', '05.1 Welcome'],
      ['/onboarding/consent', '05.2 Consent LGPD'],
      ['/onboarding/profile', '05.3 Perfil básico'],
      ['/onboarding/face/instructions', '05.4 Captura · instruções'],
      ['/onboarding/face/camera', '05.5 Captura · câmera'],
      ['/onboarding/done', '05.6 Setup concluído'],
    ],
  },
  {
    id: 'WEB-EP-06',
    title: 'Pairing wearable',
    subtitle: 'Apple Watch · Galaxy Watch · Conexão Bluetooth',
    color: 'menta',
    screens: [
      ['/pairing/select', '06.1 Seleção de plataforma'],
      ['/pairing/searching', '06.2 Buscando dispositivos'],
      ['/pairing/devices', '06.3 Dispositivos encontrados'],
      ['/pairing/connecting', '06.4 Pareando'],
      ['/pairing/success', '06.5 Pareado com sucesso'],
      ['/pairing/error', '06.6 Falha no pareamento'],
      ['/dispositivo', '06.7 Dispositivo (status + sync)'],
    ],
  },
  {
    id: 'WEB-EP-07',
    title: 'Sono AI',
    subtitle: 'Assistente flutuante com insights baseados nos dados',
    color: 'menta',
    screens: [
      ['/sono-ai/fab', '04.1 FAB closed'],
      ['/sono-ai/peek', '04.2 Chat bottom-sheet peek'],
      ['/sono-ai/full', '04.3 Chat full screen'],
      ['/sono-ai/insight', '04.4 Mensagem com card de ação'],
    ],
  },
  {
    id: 'WEB-EP-08',
    title: 'Polissonografia móvel',
    subtitle: 'Kit em casa · entrega · videochamada · stream noturno',
    color: 'sun-moon',
    screens: [
      ['/polisso-movel/sugestao', '05.1 Sugestão de exame'],
      ['/polisso-movel/retirada', '05.1c Retirar no hospital'],
      ['/polisso-movel/confirmacao-envio', '05.2 Confirmação do envio'],
      ['/polisso-movel/tracking', '05.3 Tracking de entrega'],
      ['/polisso-movel/recebido', '05.4 Equipamentos chegaram'],
      ['/polisso-movel/agendamento', '05.5 Agendamento orientação'],
      ['/polisso-movel/videochamada', '05.6 Videochamada em curso'],
      ['/polisso-movel/stream', '05.7 Stream em tempo real'],
      ['/polisso-movel/acompanhamento', '05.8 Acompanhamento (multi-noite)'],
      ['/polisso-movel/dispositivo', '05.9 Kit PSG (status + sensores)'],
    ],
  },
  {
    id: 'WEB-EP-09',
    title: 'Sleep Score · Acompanhamento',
    subtitle: 'Gamificação · insights · desafios · ranking · histórico',
    color: 'sun-moon',
    screens: [
      ['/score', '08.1 Sleep Score (pontos)'],
      ['/score/challenge/sem-cafeina', '08.2 Challenge detail'],
      ['/score/ranking', '08.3 Ranking (leaderboard)'],
      ['/score/historico', '08.4 Histórico de noites'],
      ['/score/regua-whatsapp', '08.5 Régua WhatsApp'],
      ['/pre-diagnostico', '08.6 Pré-diagnóstico algorítmico'],
    ],
  },
  {
    id: 'WEB-EP-10',
    title: 'Triagem clínica',
    subtitle: 'Epworth · STOP-BANG · ISI · Pittsburgh · Score',
    color: 'menta',
    screens: [
      ['/triagem/intro', '06.1 Intro triagem'],
      ['/triagem/epworth', '06.2 Epworth ESS'],
      ['/triagem/stop-bang', '06.3 STOP-BANG'],
      ['/triagem/isi', '06.4 ISI'],
      ['/triagem/pittsburgh', '06.5 Pittsburgh PSQI'],
      ['/triagem/score', '06.6 Score consolidado'],
    ],
  },
  {
    id: 'WEB-EP-11',
    title: 'Agenda de clínicas',
    subtitle: 'Mapa · filtros · slots · confirmação WhatsApp',
    color: 'laranja',
    screens: [
      ['/agenda/atendimento', '07.0 Tipo de atendimento (3 opções)'],
      ['/agenda/teleconsulta', '07.0b Teleconsulta (online)'],
      ['/agenda/mapa', '07.1 Mapa de clínicas'],
      ['/agenda/filtros', '07.2 Filtros'],
      ['/agenda/clinica/afip-vm', '07.3 Detalhe da clínica'],
      ['/agenda/calendar/afip-vm', '07.4 Calendar slots'],
      ['/agenda/confirmacao', '07.5 Confirmação WhatsApp'],
    ],
  },
  {
    id: 'WEB-EP-12',
    title: 'Atendimento, Exame & Laudo',
    subtitle: 'Consulta → pré-diagnóstico → recomendação → aprovação → exame → laudo',
    color: 'sun-moon',
    screens: [
      ['/exame/consulta', '09.0a Consulta agendada/realizada'],
      ['/exame/pre-diagnostico', '09.0b Pré-diagnóstico (achados)'],
      ['/exame/recomendacao', '09.0c Recomendação (médico + IA)'],
      ['/exame/aprovacao', '09.0d Aprovação (assinatura + convênio)'],
      ['/exame/confirmar', '09.0e Confirmar exame (modalidade)'],
      ['/exame/preparo', '09.1 Preparo pré-exame'],
      ['/exame/agendado', '09.2 Status agendado'],
      ['/exame/em-laudo-ia', '09.3 Em laudo IA'],
      ['/exame/em-revisao-medica', '09.4 Em revisão médica'],
      ['/exame/resultado', '09.5 Resultado liberado'],
      ['/exame/proximas-acoes', '09.6 Próximas ações'],
    ],
  },
  {
    id: 'WEB-EP-13',
    title: 'Portal Médico C2',
    subtitle: 'Web desktop · sidebar nav · 1440×900',
    color: 'laranja',
    badge: 'DESKTOP',
    screens: [
      ['/medico/cadastro', '10.1 Cadastro médico'],
      ['/medico/triagem', '10.2 Revisão de triagem'],
      ['/medico/agenda', '10.3 Agenda médica'],
      ['/medico/laudo', '10.4 Laudo HITL + FHIR'],
      ['/medico/dashboard', '10.5 Dashboard KPIs'],
    ],
  },
];

export default function DashboardHome() {
  const total = EPICS.reduce((s, e) => s + e.screens.length, 0);

  return (
    <div className="min-h-dvh w-full overflow-y-auto px-6 py-10">
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="block h-3 w-3 rounded-full bg-laranja" />
          <span className="text-2xl font-bold tracking-tight">Instituto do Sono</span>
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.18em] px-2 py-0.5 rounded-md"
            style={{ backgroundColor: 'hsl(var(--laranja) / 0.16)', color: 'hsl(var(--laranja))' }}
          >
            Protótipo
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Protótipo navegável
        </h1>
        <p className="text-baunilha/70 max-w-2xl">
          Comece pela jornada do paciente para ver o fluxo encadeado, ou abra qualquer
          tela específica nos épicos abaixo. O menu 🐛 (canto superior direito) também
          navega entre telas.
        </p>
      </header>

      {/* Entradas principais — jornada vs telas avulsas */}
      <section className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
        <Link
          to="/onboarding/welcome"
          className="group rounded-card-lg p-5 border transition flex items-start gap-4"
          style={{ backgroundColor: 'hsl(var(--laranja) / 0.12)', borderColor: 'hsl(var(--laranja) / 0.4)' }}
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] bg-laranja text-text-on-brand text-xl font-bold">
            ▶
          </span>
          <span>
            <span className="block text-[11px] font-semibold uppercase tracking-kicker text-laranja mb-1">
              Primeiro acesso
            </span>
            <span className="block text-lg font-bold mb-0.5">Iniciar jornada do paciente</span>
            <span className="block text-sm text-baunilha/65">
              Onboarding → pareamento → análise → resultado → triagem, tudo encadeado.
            </span>
          </span>
        </Link>

        <Link
          to="/inicio"
          className="group rounded-card-lg p-5 border border-surface-2/40 bg-surface transition hover:bg-surface/80 flex items-start gap-4"
        >
          <span
            className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] text-xl"
            style={{ backgroundColor: 'hsl(var(--menta) / 0.16)', color: 'hsl(var(--menta))' }}
          >
            🏠
          </span>
          <span>
            <span className="block text-[11px] font-semibold uppercase tracking-kicker text-menta mb-1">
              Já fez o setup
            </span>
            <span className="block text-lg font-bold mb-0.5">App do dia a dia</span>
            <span className="block text-sm text-baunilha/65">
              Home pessoal com a última noite e atalhos para cada jornada.
            </span>
          </span>
        </Link>
      </section>

      <h2 className="text-sm font-semibold uppercase tracking-kicker text-baunilha/50 mb-4 max-w-3xl">
        Ou abra uma tela específica · {total} telas em {EPICS.length} épicos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {EPICS.map((epic) => (
          <article
            key={epic.id}
            className="rounded-card bg-surface border border-surface-2/40 p-5 flex flex-col"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-semibold uppercase tracking-kicker text-baunilha/55">
                {epic.id}
              </span>
              {epic.badge ? (
                <span className="text-[10px] font-semibold tracking-kicker px-2 py-0.5 rounded-full bg-laranja/14 text-laranja">
                  {epic.badge}
                </span>
              ) : null}
            </div>
            <h2
              className="text-lg font-bold mb-1"
              style={{ color: `hsl(var(--${epic.color}))` }}
            >
              {epic.title}
            </h2>
            <p className="text-xs text-baunilha/60 mb-4">{epic.subtitle}</p>
            <ul className="flex flex-col gap-1 mt-auto">
              {epic.screens.map(([path, label]) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm text-text-primary/85 hover:bg-surface-2/50 transition group"
                  >
                    <span>{label}</span>
                    <ArrowRight
                      size={14}
                      className="text-baunilha/40 group-hover:text-laranja transition"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <footer className="mt-12 flex flex-col items-center gap-1.5 text-center">
        <span className="text-xs text-baunilha/40">
          Protótipo Instituto do Sono (AFIP) — CoCria 2026
        </span>
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-baunilha/45">
          Powered by <span className="text-laranja/80 font-semibold">Foursys</span>
        </span>
      </footer>
    </div>
  );
}
