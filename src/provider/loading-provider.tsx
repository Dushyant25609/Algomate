import { FC, ReactNode } from 'react';
import { Loader } from '@/components/ui/loader';
import { useAppSelector } from '@/store';

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: FC<LoadingProviderProps> = ({ children }) => {
  const isLoading = useAppSelector(state => state.user.loading);
  return <>{isLoading ? <Loader type="skeleton" fullScreen /> : children}</>;
};
