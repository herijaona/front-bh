import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class DealResolverIdService implements Resolve<any> {
  constructor(public prService: ProjectsService, private r: Router) {}
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {
      console.log(route.params);
      const result = await this.prService.getDetailsDealBYID(route.params.idDeal);
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
