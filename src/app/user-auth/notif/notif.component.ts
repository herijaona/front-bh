import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'message-notif',
  templateUrl: './notif.component.html',
  styleUrls: ['./notif.component.scss']
})
export class NotifComponent implements OnInit {

  @Input() type: any;
  @Input() message: any;
  
  constructor() { }

  ngOnInit() {
  }

}
