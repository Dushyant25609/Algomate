/**
 * Routes enum for the application
 * This provides a centralized place to manage all route paths
 * Use this enum instead of hardcoded strings throughout the application
 */
export enum AppRoutes {
  // Public routes
  HOME = '/',
  AUTH_CONNECT = '/auth/connect',
  DASHBOARD = '/dashboard/:username',
  DASHBOARD_WITH_PARAM = '/dashboard/', // For concatenation with username
  WILDCARD = '/*',

  // Auth required routes
  LEADERBOARD = '/leaderboard',
  SHEETS = '/sheets',
  AVATAR_CREATE = '/avatar/create',
  FRIENDS = '/friends',
  BASE_SETTINGS = '/settings/',
  SETTINGS = '/settings/basic',
  SETTINGS_DETAIL = '/settings/:tab',
  PROFILE = 'PROFILE',
}

/**
 * Helper function to replace route parameters with actual values
 * @param route The route with parameters
 * @param params Object containing parameter values
 * @returns The route with parameters replaced
 */
export const generatePath = (route: string, params: Record<string, string>): string => {
  let path = route;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Object.entries(params).forEach(([_key, value]) => {
    path = path.concat(`${value}`);
  });
  return path;
};

/**
 * Example usage:
 *
 * // Instead of hardcoded strings:
 * <Route path="/dashboard/:username" element={<Dashboard />} />
 *
 * // Use the enum:
 * <Route path={AppRoutes.DASHBOARD} element={<Dashboard />} />
 *
 * // For routes with parameters:
 * const username = 'john';
 * const path = generatePath(AppRoutes.DASHBOARD, { username });
 * // Result: '/dashboard/john'
 */
