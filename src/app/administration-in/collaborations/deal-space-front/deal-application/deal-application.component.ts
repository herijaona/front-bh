import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../../globals/globals';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deal-application',
  templateUrl: './deal-application.component.html',
  styleUrls: ['./deal-application.component.scss'],
})
export class DealApplicationComponent implements OnInit {
  public data_;
  constructor(public g: Globals, public activRoute: ActivatedRoute) {}

  ngOnInit() {
    this.data_ = this.activRoute.snapshot.data['dataApplication'];
  }

  getAdrrCountry(adr) {
    return JSON.parse(adr)
      .description.split(',')
      .pop()
      .trim();
  }
}
