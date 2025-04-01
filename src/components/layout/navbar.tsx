import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { UserStatus } from '@/components/ui/user-status';
import { defaultNavItems } from '@/constants/nav-items';
import { NavItem } from '@/interface/navbar';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { navbarAnimationProps, navItemUnderlineProps } from '@/motion/navbar-animations';
import { FC, memo, useState } from 'react';
import { Menu, X, User, Settings, LogOut, Bell } from 'lucide-react';
import UserAvatar from '../ui/avatar/user-avatar';
import { useAppSelector, useAppDispatch } from '@/store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { logout } from '@/store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { AppRoutes, generatePath } from '@/lib/routes';
import NotificationDropdown from '../ui/notification-dropdown';

interface NavbarProps {
  items?: NavItem[];
  className?: string;
}

const Navbar: FC<NavbarProps> = ({ items = defaultNavItems }) => {
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const user = useAppSelector(state => state.user);
  const pendingRequests = user?.friends?.pending?.filter(req => req.type === 'received') || [];
  const pendingCount = pendingRequests.length;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate(AppRoutes.HOME);
  };

  // Mobile menu animation variants
  const menuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: { opacity: 1, x: 0 },
  };

  return (
    <>
      <motion.nav
        className="h-12 w-full bg-secondary border-b-1 border-foreground/10"
        {...navbarAnimationProps}
      >
        <div className="h-full flex gap-6 items-center justify-between md:gap-10 px-4">
          <div className="h-full flex gap-6 items-center md:gap-10">
            <NavLink
              to={AppRoutes.HOME}
              className={({ isActive }) =>
                `font-medium text-lg hover:text-primary transition-colors ${isActive ? 'text-foreground' : 'text-foreground/60'}`
              }
            >
              LBP
            </NavLink>
            {/* Desktop Navigation */}
            <div className="hidden md:flex h-full gap-6 items-center">
              {items.map(item => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `relative h-full flex items-center text-sm font-medium transition-colors hover:text-foreground/80 ${isActive ? 'text-foreground' : 'text-foreground/60'}`
                  }
                >
                  {({ isActive }) => (
                    <div className="flex items-center justify-center h-full w-full">
                      {item.label}
                      {isActive && (
                        <motion.div
                          className="absolute bottom-0 left-0 w-full h-[1px] bg-foreground"
                          {...navItemUnderlineProps}
                          initial={false}
                        />
                      )}
                    </div>
                  )}
                </NavLink>
              ))}
              <div className="flex items-center gap-2">
                <Button onClick={() => navigate(AppRoutes.FRIENDS)} variant="ghost" size="sm">
                  Add Friend +
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated && <NotificationDropdown pendingRequests={pendingRequests} />}
            <ThemeToggle />
            <div className="md:flex items-center hidden">
              {isAuthenticated && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="cursor-pointer">
                      <UserAvatar />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() =>
                        navigate(
                          generatePath(AppRoutes.DASHBOARD_WITH_PARAM, {
                            user: user?.username || '',
                          })
                        )
                      }
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(AppRoutes.SETTINGS)}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <UserStatus className="hidden md:block" />
            </div>
            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
          >
            <motion.div
              className="fixed right-0 top-0 h-full w-3/4 max-w-xs bg-secondary p-6 shadow-lg"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex flex-col space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Menu</span>
                  <Button variant="ghost" size="icon" onClick={toggleMenu}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex flex-col space-y-4">
                  <NavLink
                    to={generatePath(AppRoutes.DASHBOARD_WITH_PARAM, {
                      user: user?.username || '',
                    })}
                    className={({ isActive }) =>
                      `text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-foreground' : 'text-foreground/60'}`
                    }
                    onClick={toggleMenu}
                  >
                    Profile
                  </NavLink>
                  {items.map(item => (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      className={({ isActive }) =>
                        `text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-foreground' : 'text-foreground/60'}`
                      }
                      onClick={toggleMenu}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => {
                        navigate(AppRoutes.FRIENDS);
                        toggleMenu();
                      }}
                      variant="ghost"
                      size="sm"
                      className="justify-start px-0"
                    >
                      Add Friend +
                    </Button>
                    {isAuthenticated && pendingCount > 0 && (
                      <div className="flex items-center gap-1">
                        <Bell className="h-4 w-4" />
                        <span className="bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                          {pendingCount}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <NavLink
                  to={AppRoutes.SETTINGS_DETAIL}
                  className={({ isActive }) =>
                    `text-sm flex items-center font-medium transition-colors hover:text-primary ${isActive ? 'text-foreground' : 'text-foreground/60'}`
                  }
                  onClick={toggleMenu}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </NavLink>
                {!isAuthenticated && <UserStatus onClick={toggleMenu} className="w-full mt-4" />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(Navbar);
