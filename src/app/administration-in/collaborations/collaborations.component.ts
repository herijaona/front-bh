import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Globals } from './../../globals/globals';
import { ProjectsService } from '../../services/projects/projects.service';
import {
  Router,
  ActivatedRoute,
  Event,
  NavigationStart,
  ResolveStart,
  NavigationEnd,
  ResolveEnd,
} from '@angular/router';

@Component({
  selector: 'app-collaborations',
  templateUrl: './collaborations.component.html',
  styleUrls: ['./collaborations.component.scss'],
})
export class CollaborationsComponent implements OnInit {
  public isIn: boolean = false;
  public dp: boolean = true;
  public tab = ['apply-to'];
  constructor(public g: Globals, private pr: ProjectsService, private router: Router, public el: ElementRef) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        let urlAfterredirects = event.urlAfterRedirects.trim().split('/');
        this.isIn = this.inArray(this.tab, urlAfterredirects);
        if (this.isIn) {
          this.dp = false;
        } else {
          this.dp = true;
        }
      }
    });
  }
  public collabTypes: any = [];
  inArray(needle, haystack) {
    var length = haystack.length;
    for (let o of needle) {
      for (var i = 0; i < length; i++) {
        if (haystack[i].toString() == o.toString()) return true;
      }
    }
    return false;
  }
  ngOnInit() {
    this.getAllCollabT();
  }

  getAllCollabT() {
    this.collabTypes = this.g.getConfig('collab_types');
  }

  collablinks() {
    this.router.navigateByUrl('/login');
  }
  toggleCollapse2() {
    this.el.nativeElement.querySelector('.ns').classList.toggle('ln');
    this.el.nativeElement.querySelector('.float-r').classList.toggle('ln');
  }
}
