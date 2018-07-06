import { Component, OnInit } from '@angular/core';
import { Globals } from "../../../../globals/globals";
@Component({
  selector: 'app-deal-planning',
  templateUrl: './deal-planning.component.html',
  styleUrls: ['./deal-planning.component.scss']
})
export class DealPlanningComponent implements OnInit {
  public img_avatar: string;
  constructor( public g: Globals) {
    this.img_avatar = this.g.base_href + "assets/img/profile.JPG";
   }

  ngOnInit() {
  }

}
