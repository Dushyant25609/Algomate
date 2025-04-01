import Dashboard from '@/pages/dashboard/dashboard';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from '@/lib/routes';

export const PublicRoutes: FC = () => {
  return (
    <Routes>
      <Route path={AppRoutes.DASHBOARD} element={<Dashboard />} />
    </Routes>
  );
};
