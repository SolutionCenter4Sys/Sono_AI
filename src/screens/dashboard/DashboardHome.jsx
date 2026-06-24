import { Link } from 'react-router-dom';
import { ArrowRight, Plane, MapPin } from 'lucide-react';

/**
 * Casos de uso · personas com jornadas personalizadas (UC1-UC6).
 * Cada caso aponta para a 1ª tela e mostra um stepper de até 5 passos.
 */
const USE_CASES = [
  {
    id: 'joao',
    badge: 'Paciente com sintomas',
    name: 'João',
    age: 38,
    persona: 'Executivo · ronco frequente · sonolência diurna',
    quote: 'Acho que ronco e tenho sonolência diurna — vale investigar?',
    color: 'laranja',
    initials: 'JS',
    start: '/onboarding/welcome',
    steps: [
      { path: '/onboarding/welcome', label: 'Onboarding' },
      { path: '/pairing/select', label: 'Parear' },
      { path: '/app/questionnaire', label: 'Queixa (multi)' },
      { path: '/triagem/intro', label: 'Triagem dir.' },
      { path: '/pre-diagnostico', label: 'Indícios' },
      { path: '/agenda/atendimento', label: 'Agendar' },
    ],
  },
  {
    id: 'maria',
    badge: 'Paciente em jornada de exame',
    name: 'Maria',
    age: 52,
    persona: 'HAS controlada · médico indicou PSG',
    quote: 'Meu cardiologista pediu polissonografia. E agora?',
    color: 'sun-moon',
    initials: 'MS',
    start: '/exame/recomendacao',
    steps: [
      { path: '/exame/recomendacao', label: 'Recomendação' },
      { path: '/exame/aprovacao', label: 'Aprovação' },
      { path: '/agenda/calendar/afip-vm', label: 'Agendar' },
      { path: '/exame/em-revisao-medica', label: 'Em revisão' },
      { path: '/exame/resultado', label: 'Laudo' },
    ],
  },
  {
    id: 'carlos',
    badge: 'Paciente em terapia',
    name: 'Carlos',
    age: 45,
    persona: 'AOS moderada · 120 dias em CPAP',
    quote: 'Quero ver como meu tratamento está evoluindo.',
    color: 'menta',
    initials: 'CR',
    start: '/inicio',
    steps: [
      { path: '/inicio', label: 'Home' },
      { path: '/score', label: 'Sleep Score' },
      { path: '/score/historico', label: 'Histórico' },
      { path: '/acompanhamento', label: 'Acompanhamento' },
      { path: '/acompanhamento/retorno/r-d90', label: 'Retorno D+90' },
    ],
  },
  {
    id: 'ana',
    badge: 'Paciente saudável',
    name: 'Ana',
    age: 29,
    persona: 'Sem queixas · usa wearable por curiosidade',
    quote: 'Quero monitorar e melhorar minha qualidade de sono.',
    color: 'sun-moon',
    initials: 'AL',
    start: '/inicio?profile=novo',
    steps: [
      { path: '/inicio?profile=novo', label: 'Home (novo)' },
      { path: '/score?profile=novo', label: 'Score (vazio)' },
      { path: '/metodologia', label: 'Como funciona' },
      { path: '/score/challenge/sem-cafeina', label: 'Hábito' },
      { path: '/sono-ai/full', label: 'Sono AI' },
      { path: '/score/historico?profile=novo', label: 'Histórico' },
    ],
  },
  {
    id: 'roberto',
    badge: 'Antecipação clínica',
    name: 'Roberto',
    age: 60,
    persona: 'AOS grave · 150 dias pós-laudo · piora detectada',
    quote: 'Por que fui chamado antes do retorno programado?',
    color: 'laranja',
    initials: 'RM',
    start: '/inicio',
    steps: [
      { path: '/inicio', label: 'Home + alerta' },
      { path: '/acompanhamento', label: 'Timeline' },
      { path: '/acompanhamento/retorno/r-d150', label: 'D+150 antecipado' },
      { path: '/medico/retornos', label: 'Visão médica' },
      { path: '/exame/consulta', label: 'Próxima consulta' },
    ],
  },
  {
    id: 'marcela',
    badge: 'Médica do sono',
    name: 'Dra. Marcela',
    age: 41,
    persona: 'Especialista AFIP · CRM/RQE/CNES',
    quote: 'Quero revisar laudos pendentes e ver minha agenda.',
    color: 'menta',
    initials: 'DM',
    start: '/medico/cadastro',
    desktop: true,
    steps: [
      { path: '/medico/cadastro', label: 'Cadastro CRM' },
      { path: '/medico/triagem', label: 'Triagem' },
      { path: '/medico/agenda', label: 'Agenda' },
      { path: '/medico/laudo', label: 'Laudo HITL' },
      { path: '/medico/dashboard', label: 'Dashboard' },
    ],
  },
];

/**
 * Casos geográficos · telemedicina por barreira de distância.
 * Interior BR + lusofonia internacional + fronteira LATAM (ADR-031 + Fase G).
 */
const GEO_USE_CASES = [
  {
    id: 'paraiba_sertao',
    badge: 'BR · Sertão / SUS',
    name: 'João Bezerra',
    age: 54,
    persona: 'Agricultor familiar · Sousa-PB',
    quote: 'Especialista do sono mais perto fica a 440 km — fila SUS de mais de 1 ano.',
    color: 'laranja',
    initials: 'JB',
    flag: '🇧🇷',
    region: 'Sousa, PB',
    distanceKm: 440,
    partner: 'Correios SEDEX → AFIP-SP',
    start: '/inicio',
    steps: [
      { path: '/inicio', label: 'Home + alerta' },
      { path: '/pre-diagnostico', label: 'Indícios' },
      { path: '/polisso-movel/sugestao', label: 'Pedir kit' },
      { path: '/polisso-movel/tracking', label: 'Rastreio' },
      { path: '/agenda/teleconsulta', label: 'Tele AFIP' },
    ],
  },
  {
    id: 'amazonia_ribeirinho',
    badge: 'BR · Amazônia',
    name: 'Raimundo Costa',
    age: 47,
    persona: 'Ribeirinho · Tefé-AM',
    quote: 'Pra ir a Manaus levo 1 dia de barco. O kit veio pelo avião da FAB.',
    color: 'sun-moon',
    initials: 'RC',
    flag: '🇧🇷',
    region: 'Tefé, AM',
    distanceKm: 530,
    partner: 'AFIP × DSEI-MAJ · FAB Logística',
    start: '/inicio',
    steps: [
      { path: '/inicio', label: 'Home' },
      { path: '/polisso-movel/acompanhamento', label: 'Exame 4/7' },
      { path: '/polisso-movel/dispositivo', label: 'Kit · sinal fraco' },
      { path: '/polisso-movel/stream', label: 'Stream offline' },
      { path: '/dispositivo', label: 'Galaxy Watch' },
    ],
  },
  {
    id: 'angola_luanda',
    badge: 'AO · Lusofonia',
    name: 'Pedro Mendes',
    age: 38,
    persona: 'Expatriado BR · Luanda',
    quote: '5 médicos do sono em todo Angola. Faço o follow-up por vídeo com SP.',
    color: 'menta',
    initials: 'PM',
    flag: '🇦🇴',
    region: 'Luanda',
    distanceKm: 6800,
    partner: 'Sagrada Esperança × AFIP',
    start: '/inicio',
    steps: [
      { path: '/inicio', label: 'Home' },
      { path: '/exame/resultado', label: 'Laudo INT' },
      { path: '/acompanhamento', label: 'D+30 · D+90' },
      { path: '/score', label: 'Sleep Score' },
      { path: '/dispositivo', label: 'Dispositivo' },
    ],
  },
  {
    id: 'portugal_porto',
    badge: 'PT · Diáspora',
    name: 'Sofia Almeida',
    age: 45,
    persona: 'Luso-brasileira · Porto',
    quote: 'O SNS demora — minha família confia na AFIP. Kit chegou em 3 dias.',
    color: 'sun-moon',
    initials: 'SA',
    flag: '🇵🇹',
    region: 'Porto, V.N. Gaia',
    distanceKm: 7900,
    partner: 'CINTESIS / CHUP × AFIP',
    start: '/inicio',
    steps: [
      { path: '/inicio', label: 'Home' },
      { path: '/polisso-movel/acompanhamento', label: 'Em revisão HITL' },
      { path: '/agenda/teleconsulta', label: 'Tele · pt-PT' },
      { path: '/exame/em-revisao-medica', label: 'Revisão' },
      { path: '/dispositivo', label: 'Dispositivo' },
    ],
  },
  {
    id: 'mocambique_maputo',
    badge: 'MZ · CPLP-Sono',
    name: 'Sr. Joaquim',
    age: 56,
    persona: 'Funcionário público · Maputo',
    quote: '1 médico do sono em todo Moçambique. Antecipei consulta porque a aderência caiu.',
    color: 'laranja',
    initials: 'JM',
    flag: '🇲🇿',
    region: 'Maputo',
    distanceKm: 7400,
    partner: 'HCM × AFIP × Gulbenkian',
    start: '/inicio',
    steps: [
      { path: '/inicio', label: 'Home + alerta' },
      { path: '/acompanhamento', label: 'Antecipado' },
      { path: '/acompanhamento/retorno/r-d150', label: 'D+120 antec.' },
      { path: '/exame/resultado', label: 'Laudo grave' },
      { path: '/medico/laudo', label: 'Revisão AFIP' },
    ],
  },
  {
    id: 'bolivia_fronteira',
    badge: 'BO · Fronteira BR',
    name: 'Marcos Quispe',
    age: 41,
    persona: 'Comerciante · Cobija · Pando',
    quote: 'Cruzo a ponte BR-MAP-024 e retiro o kit em Rio Branco no mesmo dia.',
    color: 'menta',
    initials: 'MQ',
    flag: '🇧🇴',
    region: 'Cobija (BO) · Rio Branco (BR)',
    distanceKm: 1100,
    partner: 'UFAC × AFIP',
    start: '/inicio',
    steps: [
      { path: '/inicio', label: 'Home + alerta' },
      { path: '/pre-diagnostico', label: 'Indícios' },
      { path: '/polisso-movel/retirada', label: 'Retirar Rio Branco' },
      { path: '/agenda/teleconsulta', label: 'Tele bi-língue' },
      { path: '/dispositivo', label: 'Dispositivo' },
    ],
  },
];

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
    subtitle: 'Higiene do sono · insights · hábitos · histórico (ativado pelo médico)',
    color: 'sun-moon',
    screens: [
      ['/score', '08.1 Sleep Score (pontos)'],
      ['/score?profile=novo', '08.1b Sleep Score (paciente novo · vazio)'],
      ['/score/challenge/sem-cafeina', '08.2 Hábito (detalhe)'],
      ['/score/historico', '08.4 Histórico de noites'],
      ['/score/historico?profile=novo', '08.4b Histórico (paciente novo · vazio)'],
      ['/score/regua-whatsapp', '08.5 Régua WhatsApp'],
      ['/pre-diagnostico', '08.6 Triagem assistida (indícios)'],
      ['/acompanhamento', '08.7 Acompanhamento (hub)'],
      ['/acompanhamento/retorno/r-d150', '08.8 Próximo retorno (antecipado)'],
      ['/acompanhamento/retorno/r-d90', '08.9 Retorno concluído (D+90)'],
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
    subtitle: 'Consulta → avaliação → recomendação → aprovação → exame → laudo',
    color: 'sun-moon',
    screens: [
      ['/exame/consulta', '09.0a Consulta agendada/realizada'],
      ['/exame/pre-diagnostico', '09.0b Resumo dos achados'],
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
      ['/medico/retornos', '10.6 Retornos do dia'],
      ['/medico/pacientes', '10.7 Pacientes'],
    ],
  },
];

/** Anexa `?uc=<id>` ao path preservando query params/hash já existentes. */
function withUc(path, id) {
  if (!path) return path;
  const [pathPart, hash] = path.split('#');
  const [pathname, search] = pathPart.split('?');
  const params = new URLSearchParams(search || '');
  params.set('uc', id);
  return `${pathname}?${params.toString()}${hash ? `#${hash}` : ''}`;
}

function UseCaseCard({ useCase }) {
  const { id, badge, name, age, persona, quote, color, initials, start, steps, desktop } = useCase;
  const startWithUc = withUc(start, id);

  return (
    <Link
      to={startWithUc}
      className="group rounded-card bg-surface border border-surface-2/40 p-5 flex flex-col gap-3 hover:bg-surface/80 transition relative"
      style={{ borderColor: `hsl(var(--${color}) / 0.30)` }}
    >
      {/* Header: badge + desktop chip + avatar */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <span
            className="text-[10px] font-semibold uppercase tracking-kicker px-2 py-0.5 rounded-full self-start"
            style={{
              backgroundColor: `hsl(var(--${color}) / 0.16)`,
              color: `hsl(var(--${color}))`,
            }}
          >
            {badge}
          </span>
          {desktop ? (
            <span className="text-[9px] font-semibold uppercase tracking-kicker text-baunilha/45">
              Desktop 1440×900
            </span>
          ) : null}
        </div>
        <div
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-bold"
          style={{
            backgroundColor: `hsl(var(--${color}) / 0.18)`,
            color: `hsl(var(--${color}))`,
          }}
        >
          {initials}
        </div>
      </div>

      {/* Identidade */}
      <div>
        <h3 className="text-lg font-bold leading-tight">
          {name}, {age}a
        </h3>
        <p className="text-xs text-baunilha/60 mt-0.5">{persona}</p>
      </div>

      {/* Quote */}
      <blockquote className="text-sm italic text-baunilha/80 border-l-2 pl-3 py-0.5"
        style={{ borderColor: `hsl(var(--${color}) / 0.5)` }}>
        “{quote}”
      </blockquote>

      {/* Stepper visual mini */}
      <div className="mt-1 pt-2">
        <div className="text-[10px] uppercase tracking-kicker text-baunilha/40 mb-2">
          Jornada · {steps.length} passos
        </div>
        <div className="relative">
          {/* Linha de conexão */}
          <div
            className="absolute top-1.5 left-1.5 right-1.5 h-px"
            style={{ backgroundColor: `hsl(var(--${color}) / 0.3)` }}
          />
          {/* Dots + labels */}
          <ol className="relative grid gap-1" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
            {steps.map((step, idx) => (
              <li key={step.path} className="flex flex-col items-center text-center">
                <span
                  className="block h-3 w-3 rounded-full ring-2 ring-surface"
                  style={{ backgroundColor: `hsl(var(--${color}))` }}
                />
                <span className="mt-1.5 text-[9.5px] leading-tight text-baunilha/65 line-clamp-2">
                  {idx + 1}. {step.label}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* CTA */}
      <div
        className="mt-2 flex items-center justify-between rounded-md px-3 py-2 text-sm font-semibold transition group-hover:px-4"
        style={{
          backgroundColor: `hsl(var(--${color}) / 0.14)`,
          color: `hsl(var(--${color}))`,
        }}
      >
        <span>Iniciar jornada</span>
        <ArrowRight size={16} className="transition group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

function GeoUseCaseCard({ useCase }) {
  const { id, badge, name, age, persona, quote, color, initials, flag, region, distanceKm, partner, start, steps } = useCase;
  const startWithUc = withUc(start, id);

  return (
    <Link
      to={startWithUc}
      className="group rounded-card bg-surface border border-surface-2/40 p-5 flex flex-col gap-3 hover:bg-surface/80 transition relative"
      style={{ borderColor: `hsl(var(--${color}) / 0.30)` }}
    >
      {/* Bandeira gigante + meta geográfico */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <span
            className="text-[10px] font-semibold uppercase tracking-kicker px-2 py-0.5 rounded-full self-start"
            style={{
              backgroundColor: `hsl(var(--${color}) / 0.16)`,
              color: `hsl(var(--${color}))`,
            }}
          >
            {badge}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-baunilha/55 mt-0.5">
            <MapPin size={10} /> {region} · {distanceKm.toLocaleString('pt-BR')} km do especialista
          </span>
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-2xl leading-none" aria-hidden>{flag}</span>
          <span
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[11px] font-bold"
            style={{
              backgroundColor: `hsl(var(--${color}) / 0.18)`,
              color: `hsl(var(--${color}))`,
            }}
          >
            {initials}
          </span>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold leading-tight">{name}, {age}a</h3>
        <p className="text-xs text-baunilha/60 mt-0.5">{persona}</p>
      </div>

      <blockquote
        className="text-sm italic text-baunilha/80 border-l-2 pl-3 py-0.5"
        style={{ borderColor: `hsl(var(--${color}) / 0.5)` }}
      >
        “{quote}”
      </blockquote>

      <div
        className="rounded-md border border-dashed px-2.5 py-1.5 text-[10.5px] text-baunilha/70"
        style={{ borderColor: `hsl(var(--${color}) / 0.35)` }}
      >
        <span className="block text-[9px] uppercase tracking-kicker text-baunilha/45 mb-0.5">
          Parceiro de telemedicina
        </span>
        {partner}
      </div>

      {/* Stepper */}
      <div className="mt-1 pt-2">
        <div className="text-[10px] uppercase tracking-kicker text-baunilha/40 mb-2">
          Jornada · {steps.length} passos
        </div>
        <div className="relative">
          <div
            className="absolute top-1.5 left-1.5 right-1.5 h-px"
            style={{ backgroundColor: `hsl(var(--${color}) / 0.3)` }}
          />
          <ol className="relative grid gap-1" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
            {steps.map((step, idx) => (
              <li key={step.path} className="flex flex-col items-center text-center">
                <span
                  className="block h-3 w-3 rounded-full ring-2 ring-surface"
                  style={{ backgroundColor: `hsl(var(--${color}))` }}
                />
                <span className="mt-1.5 text-[9.5px] leading-tight text-baunilha/65 line-clamp-2">
                  {idx + 1}. {step.label}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div
        className="mt-2 flex items-center justify-between rounded-md px-3 py-2 text-sm font-semibold transition group-hover:px-4"
        style={{
          backgroundColor: `hsl(var(--${color}) / 0.14)`,
          color: `hsl(var(--${color}))`,
        }}
      >
        <span>Iniciar jornada</span>
        <ArrowRight size={16} className="transition group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

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
          Escolha um <strong className="text-baunilha">caso de uso</strong> para
          percorrer a jornada de uma persona específica, comece pelo onboarding
          padrão, ou abra qualquer tela avulsa nos épicos abaixo.
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

      {/* Casos de uso · personas e jornadas */}
      <section className="mb-12">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-kicker text-baunilha/50">
            Casos de uso · {USE_CASES.length} personas com jornadas personalizadas
          </h2>
          <span className="text-[10px] uppercase tracking-kicker text-baunilha/35">
            Clique no caso para iniciar a jornada
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {USE_CASES.map((uc) => (
            <UseCaseCard key={uc.id} useCase={uc} />
          ))}
        </div>
      </section>

      {/* Telemedicina · alcance geográfico */}
      <section className="mb-12">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-kicker text-baunilha/50 flex items-center gap-2">
            <Plane size={14} className="text-laranja" />
            Telemedicina · barreira de distância · {GEO_USE_CASES.length} cenários
          </h2>
          <span className="text-[10px] uppercase tracking-kicker text-baunilha/35">
            Interior BR · Lusofonia · Fronteira LATAM
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {GEO_USE_CASES.map((uc) => (
            <GeoUseCaseCard key={uc.id} useCase={uc} />
          ))}
        </div>
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
