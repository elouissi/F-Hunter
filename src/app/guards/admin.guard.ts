import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const adminGuard = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getRole()=="ADMIN") {
    return true;
  }

  return router.parseUrl('/');
};
