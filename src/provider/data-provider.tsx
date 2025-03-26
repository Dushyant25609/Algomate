import { createContext, useContext, useEffect, useState } from 'react';
import { useAppSelector } from '@/store';
import { User } from '@/interface/user';
import { Profile } from '@/interface/profile';
import { Platform } from '@/interface/platform';
import { Friend } from '@/interface/friend';

interface UserContextType extends User, Profile {
  isAuthenticated: boolean;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
  const user = useAppSelector(state => state.user);
  const [userData, setUserData] = useState<User | null>(null);
  const profile = useAppSelector(state => state.profile);

  useEffect(() => {
    if (user.isAuthenticated) {
      setUserData({
        name: user.name || '',
        email: user.email || '',
        username: user.username || '',
        platforms: (user.platforms as Platform) || [],
        social: user.social || {},
        friends: (user.friends as Friend) || [],
        // Add any other required User properties with appropriate null checks
      });
    } else {
      setUserData(null);
    }
  }, [user, user.isAuthenticated]);

  // Create a properly typed context value by explicitly constructing the object
  const value = {
    ...(userData as User),
    ...(profile as Profile),
    isAuthenticated: user.isAuthenticated,
  } as UserContextType;

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  return context;
};
