import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'message-notif',
  templateUrl: './notif.component.html',
  styleUrls: ['./notif.component.scss']
})
export class NotifComponentUser implements OnInit {

  @Input() type: any;
  @Input() message: any;
  
  constructor() { }

  ngOnInit() {
  }

}
