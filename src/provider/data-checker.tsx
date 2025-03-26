import { ReactNode, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { loginRequest } from '@/store/slices/userSlice';
import { getAvatarRequest } from '@/store/slices/avatarSlice';
import { useNavigate } from 'react-router-dom';

interface DataProviderProps {
  children: ReactNode;
}

const DataProvider = ({ children }: DataProviderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(state => state.user);
  const avatar = useAppSelector(state => state.avatar);
  const [hasSessionCookie, setHasSessionCookie] = useState<string | null>(null);

  // Get session cookie on mount
  useEffect(() => {
    try {
      const cookie = localStorage.getItem('cookie');
      setHasSessionCookie(cookie);
    } catch (error) {
      // Handle localStorage errors (e.g., in private browsing mode)
      console.error('Error accessing localStorage:', error);
    }
  }, []);

  // Handle authentication check
  useEffect(() => {
    if (hasSessionCookie || user.isAuthenticated || user.username) {
      return;
    }
    dispatch(loginRequest());
  }, [dispatch, hasSessionCookie, navigate, user.isAuthenticated, user.username]);

  useEffect(() => {
    if (avatar.avatarConfig != null) {
      return;
    }
    if (avatar.create) {
      navigate('/avatar/create');
      return;
    }
    dispatch(getAvatarRequest());
  }, [avatar.avatarConfig, avatar.create, dispatch, navigate]);

  return <>{children}</>;
};

export default DataProvider;
