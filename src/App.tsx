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
import { Analytics } from '@vercel/analytics/react';
import { User } from './interface/user';
import { Footer } from './components/layout/footer';

function App() {
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);
  const user = useAppSelector(state => state.user) as User;
  const updated = useAppSelector(state => state.profile.updated);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (
      !updated &&
      isAuthenticated &&
      user &&
      user.username &&
      (user.githubToken || (user.platforms && user.platforms.leetcode))
    ) {
      dispatch(updateProfileRequest(user.username));
    }
  });
  return (
    <LoadingProvider>
      <Navbar />
      <div className="flex mx-auto justify-center items-center max-w-11/12 md:max-w-full  xl:max-w-11/12 ">
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
      <Analytics />
      <Footer />
    </LoadingProvider>
  );
}

export default App;
