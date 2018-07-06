import { Component, OnInit } from '@angular/core';
import { Globals } from "./../../globals/globals";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit { 
	public team_page :string = 'team_page';

  constructor( public g : Globals) { }

  ngOnInit() {
  }

}
