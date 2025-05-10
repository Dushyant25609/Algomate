import { FC, ReactNode } from 'react';
import { Loader } from '@/components/ui/loader';
import { useAppSelector } from '@/store';

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: FC<LoadingProviderProps> = ({ children }) => {
  const isLoading = useAppSelector(state => state.loading.isLoading);
  return <>{isLoading ? <Loader type="spinner" fullScreen /> : children}</>;
};
