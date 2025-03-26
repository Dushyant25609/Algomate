import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from '@/provider/theme-provider.tsx';
import DataProvider from './provider/data-checker.tsx';
import { LoadingProvider } from './provider/loading-provider.tsx';
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <DataProvider>
          <LoadingProvider>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              <App />
            </ThemeProvider>
          </LoadingProvider>
        </DataProvider>
      </Router>
    </Provider>
  </StrictMode>
);
