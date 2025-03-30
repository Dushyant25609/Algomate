import { FC, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthProvider from '@/provider/auth-provider';

// Lazy load components for better performance
const Settings = lazy(() => import('@/pages/settings/settings'));
const FriendSearch = lazy(() => import('@/pages/friends/friend-search'));
const CreateAvatar = lazy(() => import('@/pages/avatar/create'));
const Leaderboard = lazy(() => import('@/pages/leaderboard/leaderboard'));

export const AuthRoutes: FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/sheets" element={<div>Sheets Page</div>} />
        <Route path="/avatar/create" element={<CreateAvatar />} />
        <Route path="/friends" element={<FriendSearch />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AuthProvider>
  );
};
