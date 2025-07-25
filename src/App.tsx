import Navbar from '@/components/layout/navbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthPage } from '@/pages/auth/auth-page';
import { AuthRoutes } from './Routes/authRoutes';
import { PublicRoutes } from './Routes/publicRoutes';
import { Toaster } from './components/ui/sonner';
import { useAppSelector } from './store';
import { AppRoutes } from './lib/routes';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import Home from './pages/home/home';
import { Footer } from './components/layout/footer';

function App() {
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);
  const url = useLocation();
  return (
    <>
      <Navbar />
      <div className="flex mx-auto justify-center items-center max-w-11/12 md:max-w-full  xl:max-w-11/12 ">
        {isAuthenticated && <AuthRoutes />}
        <PublicRoutes />
        <Routes>
          <Route path={AppRoutes.HOME} element={<Home />} />

          <Route path={AppRoutes.AUTH_CONNECT} element={<AuthPage />} />
          {!isAuthenticated && <Route path={AppRoutes.WILDCARD} element={<AuthPage />} />}
        </Routes>
      </div>
      <Toaster />
      <SpeedInsights />
      <Analytics />
      {url.pathname === '/' && <Footer />}
    </>
  );
}

export default App;
