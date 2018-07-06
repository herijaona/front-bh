import { Component, OnInit } from '@angular/core';
import { Globals } from "../../../globals/globals";

@Component({
  selector: 'app-question-answers',
  templateUrl: './question-answers.component.html',
  styleUrls: ['./question-answers.component.scss']
})
export class QuestionAnswersComponent implements OnInit {
  public img_avatar: string;
  constructor(public g: Globals) { 
    this.img_avatar = this.g.base_href + "assets/img/profile.JPG";
  }

  ngOnInit() {
  }

}
