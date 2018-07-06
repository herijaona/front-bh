import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class DealApplicationIdDealService implements Resolve<any> {
  constructor(public prService: ProjectsService, private r: Router) {}
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {
      console.log('Arivariva');
      console.log(route.parent.params);
      const result = await this.prService.getApplicationFirstInDeal(route.parent.params.idDeal);
      if (result['status'] === 'OK') {
        console.log(result);
        return result['data'];
      }
    } catch (error) {
      console.log('Error');
      this.r.navigateByUrl('/');
      return null;
    }
  }
}
