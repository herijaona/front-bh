import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { ApiHttpService } from '../../../../services/api-http/api-http.service';
import { SharedNotificationService } from '../../../../services/shared-notification/shared-notification.service';
import { DealSpaceService } from '../../../../services/deal-space/deal-space.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-deal-files',
  templateUrl: './deal-files.component.html',
  styleUrls: ['./deal-files.component.scss'],
})
export class DealFilesComponent implements OnInit {
  @ViewChild('modalHist') public myModalHist: ModalDirective;
  butt_up: boolean;
  filesSelected: any[];
  data_: any;
  currApplID: any;

  constructor(
    private activRoute: ActivatedRoute,
    private dealSP: DealSpaceService,
    private el: ElementRef,
    private apiHttp: ApiHttpService,
    private sh: SharedNotificationService
  ) {}

  ngOnInit() {
    this.data_ = this.activRoute.snapshot.data['dataApplication'];
    console.log(this.data_);
    this.activRoute.params.subscribe(parms => {
      this.currApplID = parms['idAppl'];
    });
  }
  public insertObservation() {
    setTimeout(() => {
      this.myModalHist.show();
    }, 330);
  }
  public hideModal() {
    setTimeout(() => {
      this.myModalHist.hide();
    }, 330);
  }

  changeFilesList(event, id) {
    /*let label : HTMLInputElement = this.el.nativeElement.querySelector(
      ".selectedFile"
        );*/
    const inpt: HTMLInputElement = this.el.nativeElement.querySelector('#' + id);
    // let lbs: HTMLInputElement = this.el.nativeElement.querySelector('#chosen_file');
    // var labelVal = 'Error';
    let fileName = '';
    if (inpt.files && inpt.files.length > 1) {
      fileName = inpt.files.length.toString() + ' selected';

      const F = inpt.files;
      const slctFiles = [];
      for (let it = 0; it < F.length; it++) {
        const elt = F[it];
        const item0 = {
          name: elt.name,
          size: elt.size,
          type: elt.type,
        };
        slctFiles.push(item0);
      }
      this.filesSelected = slctFiles;
    } else {
      fileName = event.target.value.split('\\').pop();
    }
    if (fileName) {
      // lbs.innerHTML = fileName;
      this.butt_up = true;
      // this.uploadImageInBiblio(event, '_filev'); /*  */
    } else {
      this.butt_up = false;
      // lbs.innerHTML = labelVal;
    }
  }
  async uploadImageInBiblio(evtn, id): Promise<any> {
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#' + id);
    try {
      const up_res = await this.apiHttp.formImMultiUpload(inputEl, 'files');
      if (up_res['status'] === 1) {
        const updateData = await this.dealSP.updateFilesUserAdd({
          allFiles: up_res['data'].imUP,
          idAppl: this.currApplID,
        });
        if (updateData['status'] === 'OK') {
          this.sh.notifToast({ type: 'success', message: '<p>File(s) Uploaded</p>' });
          inputEl.value = '';
          this.butt_up = false;
          this.filesSelected = [];
          this.hideModal();
        }
      }
    } catch (err) {
      if (err.status === 0) {
        console.log(err);
      }
    }
  }

  getDateString(de) {
    const ds = new Date(de).toDateString();
    return ds;
  }
}
