import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { NAV_URL } from '../utils/constants';

export async function fetchUserData() {
  try {
    const response = await fetch(`/api/user`);
    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

export function redirectToDashboard(router: AppRouterInstance) {
  router.push(NAV_URL.DASHBOARD);
}
