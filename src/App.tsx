import Navbar from '@/components/layout/navbar';
import { Routes, Route } from 'react-router-dom';
import { AuthPage } from '@/pages/auth/auth-page';
import { LoadingProvider } from '@/provider/loading-provider';
import { AuthRoutes } from './Routes/authRoutes';
import { PublicRoutes } from './Routes/publicRoutes';
import { Toaster } from './components/ui/sonner';
import LoopingIndex from './components/ui/loop';
import { useAppDispatch, useAppSelector } from './store';
import { AppRoutes } from './lib/routes';
import { useEffect } from 'react';
import { updateProfileRequest } from './store/slices/profileSlices';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isAuthenticated && user && user.platforms.leetcode) {
      dispatch(updateProfileRequest());
    }
  }, [dispatch, isAuthenticated, user]);
  return (
    <LoadingProvider>
      <Navbar />
      <div className="flex justify-center items-center w-svw">
        {isAuthenticated && <AuthRoutes />}
        <PublicRoutes />
        <Routes>
          <Route
            path={AppRoutes.HOME}
            element={
              <>
                <LoopingIndex />
              </>
            }
          />
          <Route path={AppRoutes.AUTH_CONNECT} element={<AuthPage />} />
          {!isAuthenticated && <Route path={AppRoutes.WILDCARD} element={<AuthPage />} />}
        </Routes>
      </div>
      <Toaster />
      <SpeedInsights />
    </LoadingProvider>
  );
}

export default App;
