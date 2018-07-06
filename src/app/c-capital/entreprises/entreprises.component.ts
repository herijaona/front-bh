import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals/globals';

@Component({
  templateUrl: './entreprises.component.html',
  styleUrls: ['./entreprises.component.scss'],
  selector: 'app-entreprise',
})
export class EntrepriseComponent implements OnInit {
  constructor(public g: Globals) {}
  ngOnInit(): void {
    console.log('ok ok entreprise');
  }
}
