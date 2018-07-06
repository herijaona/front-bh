import { Component, OnInit } from '@angular/core';
import { Globals } from './../../../globals/globals';

@Component({
  selector: 'app-error-notification',
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.scss'],
})
export class ErrorNotificationComponent implements OnInit {
  public img_logo: string;
  constructor(public g: Globals) {
    this.img_logo = this.g.base_href + 'assets/img/logo-cca.png';
  }

  ngOnInit() {}
}
