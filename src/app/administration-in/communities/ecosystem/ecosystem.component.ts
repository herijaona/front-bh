import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from './../../../globals/globals';
import { AuthserviceService } from '../../../services/authservice/authservice.service';
import { TeamsService } from '../../../services/teams/teams.service';

@Component({
  selector: 'app-ecosystem',
  templateUrl: './ecosystem.component.html',
  styleUrls: ['./ecosystem.component.scss'],
})
export class EcosystemComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
