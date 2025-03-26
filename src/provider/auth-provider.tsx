import { useAppSelector } from '@/store';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthProviderProps {
  children: ReactNode;
}
const AuthProvider = ({ children }: AuthProviderProps) => {
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate('/auth/connect');
  }
  return <>{children}</>;
};

export default AuthProvider;
