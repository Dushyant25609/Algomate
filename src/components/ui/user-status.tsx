import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/store';
import { useNavigate } from 'react-router-dom';

interface UserStatusProps {
  className?: string;
  onClick?: () => void;
}

export const UserStatus: FC<UserStatusProps> = ({ className, onClick }) => {
  const { isAuthenticated } = useAppSelector(state => state.user);
  const navigate = useNavigate();
  return (
    <div className={className}>
      {!isAuthenticated && (
        <Button
          variant="backdrop"
          size="sm"
          className="w-full"
          onClick={() => {
            onClick?.();
            navigate('/auth/connect');
          }}
        >
          Login
        </Button>
      )}
    </div>
  );
};
