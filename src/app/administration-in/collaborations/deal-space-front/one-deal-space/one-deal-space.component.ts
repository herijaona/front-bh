import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from '../../../../globals/globals';
import { ModalDirective } from 'angular-bootstrap-md';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-one-deal-space',
  templateUrl: './one-deal-space.component.html',
  styleUrls: ['./one-deal-space.component.scss'],
})
export class OneDealSpaceComponent implements OnInit {
  public img_avatar: string;
  public idCurrentApplication = '';
  data_: any;
  public userList = [];
  public currentDealID = '';
  @ViewChild('modalHist') public myModalHist: ModalDirective;
  constructor(public g: Globals, private activRoute: ActivatedRoute, private router: Router) {
    this.img_avatar = this.g.base_href + 'assets/img/profile.JPG';
  }
  ngOnInit() {
    this.data_ = this.activRoute.snapshot.data.dealDetails;
    console.log(this.data_);
    this.userList = this.data_.users;
    this.idCurrentApplication = this.userList[0].application;
  }

  public insertObservation() {
    setTimeout(() => {
      this.myModalHist.show();
    }, 330);
  }
  public hideModal() {
    setTimeout(() => {
      this.myModalHist.hide();
    }, 330);
  }

  selectUserInDeal(item) {
    this.idCurrentApplication = item.application;
    this.router.navigateByUrl(
      '/administration-in/collaborations/deal-space/deal/' + this.data_._id + '/application/' + item.application
    );
  }
}
