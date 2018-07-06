import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spin-data-ready',
  templateUrl: './spin-data-ready.component.html',
  styleUrls: ['./spin-data-ready.component.scss'],
})
export class SpinDataReadyComponent implements OnInit {
  public readyData = false;
  @Input('ready')
  set ready(st) {
    this.readyData = st;
  }
  constructor() {}

  ngOnInit() {}
}
