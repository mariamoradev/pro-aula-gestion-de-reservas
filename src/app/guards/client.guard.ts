import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

export const clientGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = await authService.isLoggedIn();
  const userRole = await authService.getUserRole();

  if (isLoggedIn && userRole === 'client') {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
