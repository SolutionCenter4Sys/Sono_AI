import { BrowserRouter } from 'react-router-dom';
import { SleepStateProvider } from './state/SleepStateContext.jsx';
import AppRoutes from './router/routes.jsx';
import ToastHost from './layout/ToastHost.jsx';

export default function App() {
  return (
    <SleepStateProvider>
      <BrowserRouter>
        <AppRoutes />
        <ToastHost />
      </BrowserRouter>
    </SleepStateProvider>
  );
}
