import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class DealFilesService implements Resolve<any> {
  constructor(public prService: ProjectsService, private r: Router) {}
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {
      const result = await this.prService.getFilesList(route.params.idAppl);
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
