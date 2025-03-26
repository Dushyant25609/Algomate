import Dashboard from '@/pages/dashboard/dashboard';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

export const PublicRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/dashboard/:username" element={<Dashboard />} />
    </Routes>
  );
};
