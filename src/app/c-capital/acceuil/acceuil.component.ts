import { Component } from '@angular/core';
import { Globals } from '../../globals/globals';

@Component({
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss'],
})
export class AcceuilComponent {
  constructor(public g: Globals) {}
}
