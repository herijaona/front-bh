import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SharedNotificationService } from './../../services/shared-notification/shared-notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthserviceService } from '../../services/authservice/authservice.service';

@Component({
  selector: 'section-edit-button',
  templateUrl: './section-edit-button.component.html',
  styleUrls: ['./section-edit-button.component.scss'],
})
export class SectionEditButtonComponent implements OnInit, OnDestroy {
  @Input('section_') _sect: string;
  public edit_st: boolean = false;
  public editAction: boolean = true;
  private currentCompanySlug: string = '';

  constructor(
    public sh: SharedNotificationService,
    private auth: AuthserviceService,
    private activRoute: ActivatedRoute
  ) {
    this.sh.notifButton$.subscribe((st: any) => {
      if (st.no == 'clck') {
        if (!st.state) {
          this.editAction = true;
        }
        this.edit_st = st.state;
      }
    });
  }

  ngOnInit() {}

  editSectionAct(ev) {
    this.editAction = false;
    this.sh.sectiontoEdit({ section: this._sect, action: 'edit' });
  }

  saveSectionAct(ev) {
    this.editAction = true;
    this.sh.sectiontoEdit({ section: this._sect, action: 'save' });
  }

  ngOnDestroy() {
    this.sh.sectiontoEdit({});
    delete this.sh;
  }
}
