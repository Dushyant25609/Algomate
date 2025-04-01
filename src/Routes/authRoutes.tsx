import { FC, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from '@/lib/routes';

// Lazy load components for better performance
const Settings = lazy(() => import('@/pages/settings/settings'));
const FriendSearch = lazy(() => import('@/pages/friends/friend-search'));
const CreateAvatar = lazy(() => import('@/pages/avatar/create'));
const Leaderboard = lazy(() => import('@/pages/leaderboard/leaderboard'));

export const AuthRoutes: FC = () => {
  return (
    <Routes>
      <Route path={AppRoutes.LEADERBOARD} element={<Leaderboard />} />
      <Route path={AppRoutes.SHEETS} element={<div>Sheets Page</div>} />
      <Route path={AppRoutes.AVATAR_CREATE} element={<CreateAvatar />} />
      <Route path={AppRoutes.FRIENDS} element={<FriendSearch />} />
      <Route path={AppRoutes.SETTINGS} element={<Settings />} />
    </Routes>
  );
};
