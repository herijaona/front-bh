import { Component, OnInit } from '@angular/core';
import { Globals } from './../../globals/globals';
@Component({
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrls: ['./project-description.component.scss'],
})
export class ProjectDescriptionComponent implements OnInit {
  constructor(public g: Globals) {}

  ngOnInit() {}
}
