import { Navigate, Route, Routes } from 'react-router-dom';
import PhoneShell from '@/layout/PhoneShell.jsx';
import DesktopShell from '@/layout/DesktopShell.jsx';
import DashboardHome from '@/screens/dashboard/DashboardHome.jsx';

// Core flow
import PatientHomeScreen from '@/screens/app/PatientHomeScreen.jsx';
import HomeScreen from '@/screens/app/HomeScreen.jsx';
import LoadingScreen from '@/screens/app/LoadingScreen.jsx';
import QuestionnaireScreen from '@/screens/app/QuestionnaireScreen.jsx';
import ResultScreen from '@/screens/app/ResultScreen.jsx';
import ErrorScreen from '@/screens/app/ErrorScreen.jsx';

// Onboarding
import WelcomeScreen from '@/screens/onboarding/WelcomeScreen.jsx';
import ConsentScreen from '@/screens/onboarding/ConsentScreen.jsx';
import ProfileScreen from '@/screens/onboarding/ProfileScreen.jsx';
import FaceInstructionsScreen from '@/screens/onboarding/FaceInstructionsScreen.jsx';
import FaceCameraScreen from '@/screens/onboarding/FaceCameraScreen.jsx';
import SetupDoneScreen from '@/screens/onboarding/SetupDoneScreen.jsx';

// Pairing
import SelectPlatformScreen from '@/screens/pairing/SelectPlatformScreen.jsx';
import SearchingScreen from '@/screens/pairing/SearchingScreen.jsx';
import DevicesFoundScreen from '@/screens/pairing/DevicesFoundScreen.jsx';
import ConnectingScreen from '@/screens/pairing/ConnectingScreen.jsx';
import PairedSuccessScreen from '@/screens/pairing/PairedSuccessScreen.jsx';
import PairingErrorScreen from '@/screens/pairing/PairingErrorScreen.jsx';

// Sono AI
import FabScreen from '@/screens/sono-ai/FabScreen.jsx';
import ChatPeekScreen from '@/screens/sono-ai/ChatPeekScreen.jsx';
import ChatFullScreen from '@/screens/sono-ai/ChatFullScreen.jsx';
import InsightCardScreen from '@/screens/sono-ai/InsightCardScreen.jsx';

// Sleep Score (gamificação)
import SleepCoinsScreen from '@/screens/coins/SleepCoinsScreen.jsx';
import ChallengeDetailScreen from '@/screens/coins/ChallengeDetailScreen.jsx';
import NightsHistoryScreen from '@/screens/coins/NightsHistoryScreen.jsx';
import WhatsappJourneyScreen from '@/screens/coins/WhatsappJourneyScreen.jsx';

// Polissonografia móvel
import ExamSuggestionScreen from '@/screens/polisso-movel/ExamSuggestionScreen.jsx';
import PickupScreen from '@/screens/polisso-movel/PickupScreen.jsx';
import ShipConfirmScreen from '@/screens/polisso-movel/ShipConfirmScreen.jsx';
import TrackingScreen from '@/screens/polisso-movel/TrackingScreen.jsx';
import KitReceivedScreen from '@/screens/polisso-movel/KitReceivedScreen.jsx';
import ScheduleOrientationScreen from '@/screens/polisso-movel/ScheduleOrientationScreen.jsx';
import VideoCallScreen from '@/screens/polisso-movel/VideoCallScreen.jsx';
import LiveStreamScreen from '@/screens/polisso-movel/LiveStreamScreen.jsx';
import ExamTrackingScreen from '@/screens/polisso-movel/ExamTrackingScreen.jsx';
import KitDeviceScreen from '@/screens/polisso-movel/KitDeviceScreen.jsx';

// Triagem
import TriagemIntroScreen from '@/screens/triagem/TriagemIntroScreen.jsx';
import EpworthScreen from '@/screens/triagem/EpworthScreen.jsx';
import StopBangScreen from '@/screens/triagem/StopBangScreen.jsx';
import IsiScreen from '@/screens/triagem/IsiScreen.jsx';
import PittsburghScreen from '@/screens/triagem/PittsburghScreen.jsx';
import TriagemScoreScreen from '@/screens/triagem/TriagemScoreScreen.jsx';

// Agenda
import ConsultTypeScreen from '@/screens/agenda/ConsultTypeScreen.jsx';
import TeleconsultScreen from '@/screens/agenda/TeleconsultScreen.jsx';
import ClinicMapScreen from '@/screens/agenda/ClinicMapScreen.jsx';
import FiltersScreen from '@/screens/agenda/FiltersScreen.jsx';
import ClinicDetailScreen from '@/screens/agenda/ClinicDetailScreen.jsx';
import CalendarSlotsScreen from '@/screens/agenda/CalendarSlotsScreen.jsx';
import BookingConfirmScreen from '@/screens/agenda/BookingConfirmScreen.jsx';

// Exame & Laudo
import ConsultationScreen from '@/screens/exame/ConsultationScreen.jsx';
import PreDiagnosisScreen from '@/screens/exame/PreDiagnosisScreen.jsx';
import RecommendationScreen from '@/screens/exame/RecommendationScreen.jsx';
import ApprovalScreen from '@/screens/exame/ApprovalScreen.jsx';
import ExamConfirmScreen from '@/screens/exame/ExamConfirmScreen.jsx';
import PrepScreen from '@/screens/exame/PrepScreen.jsx';
import ScheduledScreen from '@/screens/exame/ScheduledScreen.jsx';
import AiAnalysisScreen from '@/screens/exame/AiAnalysisScreen.jsx';
import MedicalReviewScreen from '@/screens/exame/MedicalReviewScreen.jsx';
import DiagnosisScreen from '@/screens/exame/DiagnosisScreen.jsx';
import NextStepsScreen from '@/screens/exame/NextStepsScreen.jsx';

// Dispositivo / relógio
import DeviceScreen from '@/screens/dispositivo/DeviceScreen.jsx';

// Pré-diagnóstico algorítmico (ADR-024)
import PreDiagnosisAlertScreen from '@/screens/pre-diagnostico/PreDiagnosisAlertScreen.jsx';

// Acompanhamento pós-laudo (ADR-028)
import AcompanhamentoScreen from '@/screens/acompanhamento/AcompanhamentoScreen.jsx';
import ReturnDetailScreen from '@/screens/acompanhamento/ReturnDetailScreen.jsx';

// Portal Médico (desktop)
import CadastroScreen from '@/screens/medico/CadastroScreen.jsx';
import RetornosScreen from '@/screens/medico/RetornosScreen.jsx';
import TriagemReviewScreen from '@/screens/medico/TriagemReviewScreen.jsx';
import AgendaScreen from '@/screens/medico/AgendaScreen.jsx';
import LaudoScreen from '@/screens/medico/LaudoScreen.jsx';
import DashboardScreen from '@/screens/medico/DashboardScreen.jsx';
import PacientesScreen from '@/screens/medico/PacientesScreen.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Dashboard index */}
      <Route path="/" element={<DashboardHome />} />

      {/* Mobile (PhoneShell) */}
      <Route element={<PhoneShell />}>
        {/* Home pessoal do paciente (hub da jornada) */}
        <Route path="/inicio" element={<PatientHomeScreen />} />

        {/* Core flow */}
        <Route path="/app" element={<Navigate to="/app/home" replace />} />
        <Route path="/app/home" element={<HomeScreen />} />
        <Route path="/app/loading" element={<LoadingScreen />} />
        <Route path="/app/questionnaire" element={<QuestionnaireScreen />} />
        <Route path="/app/result" element={<ResultScreen />} />
        <Route path="/app/error" element={<ErrorScreen />} />
        <Route path="/app/error/:case" element={<ErrorScreen />} />

        {/* Onboarding */}
        <Route path="/onboarding" element={<Navigate to="/onboarding/welcome" replace />} />
        <Route path="/onboarding/welcome" element={<WelcomeScreen />} />
        <Route path="/onboarding/consent" element={<ConsentScreen />} />
        <Route path="/onboarding/profile" element={<ProfileScreen />} />
        <Route path="/onboarding/face/instructions" element={<FaceInstructionsScreen />} />
        <Route path="/onboarding/face/camera" element={<FaceCameraScreen />} />
        <Route path="/onboarding/done" element={<SetupDoneScreen />} />

        {/* Pairing */}
        <Route path="/pairing" element={<Navigate to="/pairing/select" replace />} />
        <Route path="/pairing/select" element={<SelectPlatformScreen />} />
        <Route path="/pairing/searching" element={<SearchingScreen />} />
        <Route path="/pairing/devices" element={<DevicesFoundScreen />} />
        <Route path="/pairing/connecting" element={<ConnectingScreen />} />
        <Route path="/pairing/success" element={<PairedSuccessScreen />} />
        <Route path="/pairing/error" element={<PairingErrorScreen />} />

        {/* Sono AI */}
        <Route path="/sono-ai/fab" element={<FabScreen />} />
        <Route path="/sono-ai/peek" element={<ChatPeekScreen />} />
        <Route path="/sono-ai/full" element={<ChatFullScreen />} />
        <Route path="/sono-ai/insight" element={<InsightCardScreen />} />

        {/* Polissonografia móvel */}
        <Route path="/polisso-movel/sugestao" element={<ExamSuggestionScreen />} />
        <Route path="/polisso-movel/retirada" element={<PickupScreen />} />
        <Route path="/polisso-movel/confirmacao-envio" element={<ShipConfirmScreen />} />
        <Route path="/polisso-movel/tracking" element={<TrackingScreen />} />
        <Route path="/polisso-movel/recebido" element={<KitReceivedScreen />} />
        <Route path="/polisso-movel/agendamento" element={<ScheduleOrientationScreen />} />
        <Route path="/polisso-movel/videochamada" element={<VideoCallScreen />} />
        <Route path="/polisso-movel/stream" element={<LiveStreamScreen />} />
        <Route path="/polisso-movel/acompanhamento" element={<ExamTrackingScreen />} />
        <Route path="/polisso-movel/dispositivo" element={<KitDeviceScreen />} />

        {/* Sleep Score (gamificação) */}
        <Route path="/score" element={<SleepCoinsScreen />} />
        <Route path="/score/challenge/:id" element={<ChallengeDetailScreen />} />
        <Route path="/score/historico" element={<NightsHistoryScreen />} />
        <Route path="/score/regua-whatsapp" element={<WhatsappJourneyScreen />} />

        {/* Triagem */}
        <Route path="/triagem/intro" element={<TriagemIntroScreen />} />
        <Route path="/triagem/epworth" element={<EpworthScreen />} />
        <Route path="/triagem/stop-bang" element={<StopBangScreen />} />
        <Route path="/triagem/isi" element={<IsiScreen />} />
        <Route path="/triagem/pittsburgh" element={<PittsburghScreen />} />
        <Route path="/triagem/score" element={<TriagemScoreScreen />} />

        {/* Agenda */}
        <Route path="/agenda/atendimento" element={<ConsultTypeScreen />} />
        <Route path="/agenda/teleconsulta" element={<TeleconsultScreen />} />
        <Route path="/agenda/mapa" element={<ClinicMapScreen />} />
        <Route path="/agenda/filtros" element={<FiltersScreen />} />
        <Route path="/agenda/clinica/:id" element={<ClinicDetailScreen />} />
        <Route path="/agenda/calendar/:id" element={<CalendarSlotsScreen />} />
        <Route path="/agenda/confirmacao" element={<BookingConfirmScreen />} />

        {/* Dispositivo / relógio */}
        <Route path="/dispositivo" element={<DeviceScreen />} />

        {/* Pré-diagnóstico algorítmico (ADR-024) */}
        <Route path="/pre-diagnostico" element={<PreDiagnosisAlertScreen />} />

        {/* Acompanhamento pós-laudo (ADR-028) */}
        <Route path="/acompanhamento" element={<AcompanhamentoScreen />} />
        <Route path="/acompanhamento/retorno/:id" element={<ReturnDetailScreen />} />

        {/* Exame & Laudo */}
        <Route path="/exame/consulta" element={<ConsultationScreen />} />
        <Route path="/exame/pre-diagnostico" element={<PreDiagnosisScreen />} />
        <Route path="/exame/recomendacao" element={<RecommendationScreen />} />
        <Route path="/exame/aprovacao" element={<ApprovalScreen />} />
        <Route path="/exame/confirmar" element={<ExamConfirmScreen />} />
        <Route path="/exame/preparo" element={<PrepScreen />} />
        <Route path="/exame/agendado" element={<ScheduledScreen />} />
        <Route path="/exame/em-laudo-ia" element={<AiAnalysisScreen />} />
        <Route path="/exame/em-revisao-medica" element={<MedicalReviewScreen />} />
        <Route path="/exame/resultado" element={<DiagnosisScreen />} />
        <Route path="/exame/proximas-acoes" element={<NextStepsScreen />} />
      </Route>

      {/* Portal Médico desktop (DesktopShell) */}
      <Route element={<DesktopShell />}>
        <Route path="/medico" element={<Navigate to="/medico/dashboard" replace />} />
        <Route path="/medico/cadastro" element={<CadastroScreen />} />
        <Route path="/medico/triagem" element={<TriagemReviewScreen />} />
        <Route path="/medico/agenda" element={<AgendaScreen />} />
        <Route path="/medico/laudo" element={<LaudoScreen />} />
        <Route path="/medico/laudo/:patientId" element={<LaudoScreen />} />
        <Route path="/medico/pacientes" element={<PacientesScreen />} />
        <Route path="/medico/dashboard" element={<DashboardScreen />} />
        <Route path="/medico/retornos" element={<RetornosScreen />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
