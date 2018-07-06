import { Component, OnInit } from '@angular/core';
import { Globals } from './../../globals/globals';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.scss'],
})
export class ProfileAdminComponent implements OnInit {
  public img_avatar: string;
  constructor(public g: Globals) {
    this.img_avatar = this.g.base_href + 'assets/img/profile.JPG';
  }

  ngOnInit() {}
}
