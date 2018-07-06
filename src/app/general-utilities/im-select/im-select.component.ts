import { Component, OnInit, OnDestroy, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { AuthserviceService } from '../../services/authservice/authservice.service';
import { CompanyService } from '../../services/company/company.service';
import { SharedNotificationService } from '../../services/shared-notification/shared-notification.service';
import { ApiHttpService } from '../../services/api-http/api-http.service';
@Component({
  selector: 'im-select',
  templateUrl: './im-select.component.html',
  styleUrls: ['./im-select.component.scss'],
})
export class ImSelectComponent implements OnInit, OnDestroy {
  @Input('im_to') dest_file: string;
  @Input('entity') entity: string;
  public changeOk: boolean = false;
  public hasImage: boolean = false;
  public imbiblio: any;
  @Output() onOk = new EventEmitter<{}>();
  public butt_up: boolean;
  private previousSelected: any = null;
  constructor(
    private cs: CompanyService,
    private el: ElementRef,
    private apiHttp: ApiHttpService,
    private sh: SharedNotificationService
  ) {}

  async imBiblioShow() {
    try {
      let bblIm: any = await this.cs.getImBiblio('images', this.entity);
      if (bblIm) {
        this.hasImage = true;
        this.imbiblio = bblIm['allIm'];
      }
    } catch (err) {
      console.log(err);
      this.hasImage = false;
    }
  }

  ngOnInit() {
    this.imBiblioShow();
  }
  upImChanged(event, id) {
    /*let label : HTMLInputElement = this.el.nativeElement.querySelector(
            ".selectedFile"
        );*/
    let inpt: HTMLInputElement = this.el.nativeElement.querySelector('#' + id);
    let lbs: HTMLInputElement = this.el.nativeElement.querySelector('#chosen_file');
    var labelVal = 'Error';
    var fileName = '';
    if (inpt.files && inpt.files.length > 1) fileName = inpt.files.length.toString() + ' selected';
    else fileName = event.target.value.split('\\').pop();
    if (fileName) {
      // lbs.innerHTML = fileName;
      this.butt_up = true;
      this.uploadImageInBiblio(event, '_filev', 'images');
    } else {
      this.butt_up = false;
      lbs.innerHTML = labelVal;
    }
  }

  async uploadImageInBiblio(evtn, id, tp) {
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#' + id);
    try {
      let up_res = await this.apiHttp.formImMultiUpload(inputEl, 'images');
      if (up_res['status'] == 1) {
        let updateData = await this.cs.updateCompanyImages(
          {
            all_im: up_res['data'].imUP,
            ty_pe: 'images',
          },
          this.entity
        );
        if (updateData) {
          this.sh.notifToast({
            type: 'success',
            message: '<p>Image Uploaded</p>',
          });
          inputEl.value = '';
          this.butt_up = false;
          this.imBiblioShow();
        }
      }
    } catch (err) {
      if (err.status == 0) {
      }
    }
  }
  itemClicked(evnt, item) {
    evnt.preventDefault();
    if (this.previousSelected) {
      this.previousSelected.classList.remove('cl_sl');
    }
    this.previousSelected = evnt.target;
    evnt.target.classList.add('cl_sl');
    this.sh.imageSelected({
      select: 'image',
      data: item,
      destFile: this.dest_file,
    });
    this.changeOk = true;
  }

  Okchange() {
    this.onOk.emit({});
  }
  ngOnDestroy() {
    this.sh.imageSelected({});
  }

  public allowDestfile(): boolean {
    if (this.dest_file == 'cover_im' || this.dest_file == 'logo_im') return true;
    return false;
  }
}
