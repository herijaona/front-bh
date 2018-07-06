import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'some-date',
  templateUrl: './some-date.component.html',
  styleUrls: ['./some-date.component.scss'],
})
export class SomeDateComponent implements OnInit {
  @Output() valueDate = new EventEmitter<{}>();

  private mdlOptions = {
    dateFormat: 'dd.mm.yyyy',
    editableDateField: false,
    showTodayBtn: false,
    disableUntil: {
      year: new Date(Date.now()).getFullYear(),
      month: new Date(Date.now()).getMonth() + 1,
      day: new Date(Date.now()).getDate(),
    },
  };
  public myDatePickerOptionsDeadLine: IMyDpOptions;
  public myDatePickerOptionsSelectApplication: IMyDpOptions;
  public myDatePickerOptionsDiscussionDate: IMyDpOptions;

  public modelDate: { [key: string]: any } = {
    limitdate: {},
    discussdate: {},
    applicationselecteddate: {},
  };
  constructor() {}

  ngOnInit() {
    this.myDatePickerOptionsDeadLine = this.mdlOptions;
    this.myDatePickerOptionsSelectApplication = this.mdlOptions;
    this.myDatePickerOptionsDiscussionDate = this.mdlOptions;
  }
  onDateChanged(event, date_T) {
    let mdl = Object.create(this.mdlOptions);
    switch (date_T) {
      case 'applicationselecteddate':
        mdl.disableUntil = event.date;
        this.myDatePickerOptionsDiscussionDate = mdl;
        break;
      case 'limitdate':
        mdl.disableUntil = event.date;
        Object.keys(this.modelDate).forEach(el => {
        });
        this.myDatePickerOptionsSelectApplication = mdl;

        break;
      default:
        break;
    }

    this.valueDate.emit(this.modelDate);
  }
}
