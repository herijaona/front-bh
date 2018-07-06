import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../globals/globals';
@Component({
  selector: 'aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  constructor( public g: Globals) { }

  ngOnInit() {
  }

}
