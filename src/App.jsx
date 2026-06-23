import { BrowserRouter } from 'react-router-dom';
import { SleepStateProvider } from './state/SleepStateContext.jsx';
import { UseCaseProvider } from './lib/useCaseContext.jsx';
import { SleepScoreServiceProvider } from './lib/sleepScoreService.jsx';
import AppRoutes from './router/routes.jsx';
import ToastHost from './layout/ToastHost.jsx';

export default function App() {
  return (
    <SleepStateProvider>
      <SleepScoreServiceProvider>
        <BrowserRouter>
          <UseCaseProvider>
            <AppRoutes />
            <ToastHost />
          </UseCaseProvider>
        </BrowserRouter>
      </SleepScoreServiceProvider>
    </SleepStateProvider>
  );
}
