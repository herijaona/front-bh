import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthserviceService } from '../../services/authservice/authservice.service';

@Injectable()
export class AuthguardService {
  constructor(private auth: AuthserviceService, private router: Router) {}
  async canActivate() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    try {
      const prfl = await this.auth.profile();
      if (prfl.active === false) {
        this.router.navigateByUrl('/administration-in/account-note');
        return false;
      }
      return true;
    } catch (e) {
      console.log(e);
      this.router.navigateByUrl('/error-notification');
      return false;
    }
  }
}
