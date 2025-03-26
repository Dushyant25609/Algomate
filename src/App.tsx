import Navbar from '@/components/layout/navbar';
import { Routes, Route } from 'react-router-dom';
import { AuthPage } from '@/pages/auth/auth-page';
import { LoadingProvider } from '@/provider/loading-provider';
import { AuthRoutes } from './Routes/authRoutes';
import { PublicRoutes } from './Routes/publicRoutes';
import { Toaster } from './components/ui/sonner';
import LoopingIndex from './components/ui/loop';

function App() {
  return (
    <LoadingProvider>
      <Navbar />
      <div className="flex justify-center items-center w-svw">
        <AuthRoutes />
        <PublicRoutes />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <LoopingIndex />
              </>
            }
          />
          <Route path="/auth/connect" element={<AuthPage />} />
        </Routes>
      </div>
      <Toaster />
    </LoadingProvider>
  );
}

export default App;
