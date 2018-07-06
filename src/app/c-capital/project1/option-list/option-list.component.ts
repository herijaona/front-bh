import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Globals } from '../../../globals/globals';
import { ProjectsService } from '../../../services/projects/projects.service';
import { AuthserviceService } from '../../../services/authservice/authservice.service';

@Component({
  selector: 'option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.scss']
})
export class OptionListComponent implements OnInit {
  collabType: any;
  countries: any;
  @Output()
  countrySelect = new EventEmitter(); 
  @Output() 
  collabSelect = new EventEmitter(); 
  @Output() 
  activitySelect = new EventEmitter(); 
  
  constructor(private globals: Globals, 
    private project: ProjectsService,
    private auth: AuthserviceService) { }

  async ngOnInit() {
    this.collabType = this.globals.getConfig('collab_types');
    this.countries = await this.project.getCountryHasCollab();
    this.countries = this.countries.data;
  }

  changeCountry(event: any) {
    this.countrySelect.emit(event.target.value);
  }
  changeCollab(event: any) {    
    this.collabSelect.emit(event.target.value);    
  }
  changeActivity(event: any) {    
    this.activitySelect.emit(event.target.value);
  }
}
