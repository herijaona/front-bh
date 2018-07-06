import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from './../../globals/globals';

@Component({
  selector: 'homeslider',
  templateUrl: './homeslider.component.html',
  styleUrls: ['./homeslider.component.scss'],
})
export class HomesliderComponent implements OnInit {
  //mdbootstrap options carroussel
  public myInterval: number = 3000;
  public activeSlideIndex: number = 0;
  public noWrapSlides: boolean = false;
  private registerLink: string;

  public slides: Array<Object> = [
    { image: this.g.base_href + 'assets/img/bg-accueil.jpg' },
    { image: this.g.base_href + 'assets/img/bg2.jpg' },
    { image: this.g.base_href + 'assets/img/bg3.jpg' },
  ];
  constructor(private router: Router, public g: Globals) {}

  activeSlideChange() {
  }

  ngOnInit() {}
}
