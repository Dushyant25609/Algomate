import { NavItem } from '@/interface/navbar';
import { AppRoutes } from '@/lib/routes';

export const defaultNavItems: NavItem[] = [
  { label: 'Home', href: AppRoutes.HOME },
  { label: 'Leaderboard', href: AppRoutes.LEADERBOARD },
  // { label: 'Sheets', href: AppRoutes.SHEETS },
];
