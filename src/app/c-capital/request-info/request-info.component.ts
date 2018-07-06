import { Component, OnInit } from '@angular/core';
import { Globals } from "./../../globals/globals";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'request-info',
  templateUrl: './request-info.component.html',
  styleUrls: ['./request-info.component.scss']
})
export class RequestInfoComponent implements OnInit {
  public myGroup: FormGroup;
  constructor(public g: Globals) { }

  ngOnInit() {
  	this.myGroup = new FormGroup({
        bhemail: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
      ]),
         	bh_lastname: new FormControl("", [Validators.required]),
            bh_firstname: new FormControl("", [Validators.required]),
            bh_acc_activityArea: new FormControl("", [Validators.required])
    });
  }


 }

