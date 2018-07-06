import { Component, OnInit } from '@angular/core';
import { Globals } from "./../../globals/globals";

@Component({
  selector: 'app-committee',
  templateUrl: './committee.component.html',
  styleUrls: ['./committee.component.scss']
})
export class CommitteeComponent implements OnInit {
  public img_avatar: string;
  constructor(public g: Globals) { 
      this.img_avatar = this.g.base_href + "assets/img/img-cp.png";
}

  ngOnInit() {
  }

}
