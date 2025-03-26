import CreateAvatar from '@/pages/avatar/create';
import FriendSearchPage from '@/pages/friends/friend-search';
import Settings from '@/pages/settings/settings';
import AuthProvider from '@/provider/auth-provider';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

export const AuthRoutes: FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/leaderboard" element={<div>Leaderboard Page</div>} />
        <Route path="/sheets" element={<div>Sheets Page</div>} />
        <Route path="/avatar/create" element={<CreateAvatar />} />
        <Route path="/friends" element={<FriendSearchPage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AuthProvider>
  );
};
