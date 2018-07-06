import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthserviceService } from "../../services/authservice/authservice.service";

@Injectable()
export class IsActiveGuardService {
	constructor(private auth: AuthserviceService, private router: Router) {}
	async canActivate() {
		if (!this.auth.isLoggedIn()) {
			this.router.navigateByUrl("/login");
			return false;
		}
		try {
			let prfl = await this.auth.profile();
			if (prfl.active === true) {
				this.router.navigateByUrl("/administration-in/desk");
				return false;
			}
			return true;
		} catch (e) {
			console.log(e);
			this.router.navigateByUrl("/error-notification");
			return false;
		}
	}
}
