import { Component, OnInit } from '@angular/core';
import { Globals } from "../../../../globals/globals";

@Component({
  selector: 'app-deal-questions-answers',
  templateUrl: './deal-questions-answers.component.html',
  styleUrls: ['./deal-questions-answers.component.scss']
})
export class DealQuestionsAnswersComponent implements OnInit {
  public img_avatar: string;
  constructor(
    public g: Globals
  ) {
    this.img_avatar = this.g.base_href + "assets/img/profile.JPG";
  }

  ngOnInit() {
  }

}
