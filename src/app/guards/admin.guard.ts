import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = await authService.isLoggedIn();
  const userRole = await authService.getUserRole();

  if (isLoggedIn && userRole === 'admin') {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};