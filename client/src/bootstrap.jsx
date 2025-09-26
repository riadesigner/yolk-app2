import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthProvider } from './providers/AuthProvider.jsx';
import { ErrorBoundary } from './components/ErrorBoundary.jsx';
import routes from './routes.jsx';

export const router = createBrowserRouter(routes, {
  future: {
    v7_startTransition: true, // Включаем флаг для v7
    // v7_fetcherPersist: true, // Дополнительный флаг для персистентности
  },
});

function App() {
  return (
    <StrictMode>
      <AuthProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </AuthProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<App />);
