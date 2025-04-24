import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/provider/theme-provider';
import { FC } from 'react';
import { Button } from './button';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: FC<ThemeToggleProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  return (
    <Button className={className} onClick={toggleTheme}>
      {theme == 'dark' ? (
        <Sun className="transition-transform duration-500 ${theme === 'dark' ? 'scale-0 rotate-90' : 'scale-100 rotate-0'}" />
      ) : (
        <Moon className="transition-transform duration-500 ${theme === 'dark' ? 'scale-100 rotate-0' : 'scale-0 rotate-90'}" />
      )}
    </Button>
  );
};
