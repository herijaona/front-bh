import { Component, OnInit } from '@angular/core';
import { Globals } from "./../../globals/globals";
import { Router} from "@angular/router";

@Component({
  selector: 'app-deal-space',
  templateUrl: './deal-space.component.html',
  styleUrls: ['./deal-space.component.scss']
})
export class DealSpaceComponent implements OnInit {
  public img_avatar: string;
  constructor(public g: Globals,private router: Router,) {
    this.img_avatar = this.g.base_href + "assets/img/profile.JPG";
   }

  ngOnInit() {
  }

}
