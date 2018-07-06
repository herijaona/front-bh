import { Component, OnInit, Input } from '@angular/core';
import { Globals } from '../../../globals/globals';
@Component({
  selector: 'app-notif-register',
  templateUrl: './notif-register.component.html',
  styleUrls: ['./notif-register.component.scss'],
})
export class NotifRegisterComponent implements OnInit {
  public img_logo: string;
  public _message: string;
  public img_avatar: string;
  @Input('message')
  set message(m) {
    this._message = m;
  }
  constructor(public g: Globals) {
    this.img_avatar = this.g.base_href + 'assets/img/bg-accueil.jpg';
    this.img_logo = this.g.base_href + 'assets/img/logo-cca.png';
  }

  ngOnInit() {}
}
