import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Globals } from './../../globals/globals';
import { Currency } from './../../globals/currency';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthserviceService } from '../../services/authservice/authservice.service';
import { CompanyService } from '../../services/company/company.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedNotificationService } from './../../services/shared-notification/shared-notification.service';
import { ValidateUrl, ValidateYear, ValidatePair } from '../../services/validators/own.validator';

@Component({
  selector: 'new-zone-mindset',
  templateUrl: './new-zone-mindset.component.html',
  styleUrls: ['./new-zone-mindset.component.scss'],
})
export class NewZoneMindsetComponent implements OnInit, OnDestroy {
  @Input('existDtype') existDtype: any;
  @Input('action_type') action_type: any;
  @Input('data_zone') data_zone: any;
  public currentCompanySlug: string = '';
  public selectedImage: string = '';
  public im_poster: string = '';
  public actionAdd: boolean = true;
  public selectedZone: string = 'default';
  public AllowedZone: any;
  private newDestFile = 'newZone_im';
  private selectedIm: { [key: string]: string } = {};
  public imForm: FormGroup;
  public chrForm: FormGroup;
  public editActText: string = 'editZone';
  public addActText: string = 'addNew';
  public vidForm: FormGroup;
  public imNotSelected: boolean = true;
  public presentIn: boolean = true;
  public cpy_entity: string = 'account';
  public selctFlag: { [key: string]: boolean } = {
    imAdd: false,
    vidAdd: false,
    chiffrAdd: false,
    tweetAdd: false,
    fbAdd: false,
    txtAdd: false,
    mapAdrAdd: false,
  };

  public chrError: boolean;

  public idVidYouTube: { [key: string]: string } = {};
  public dtypeAddable: { [key: string]: boolean } = {};

  public imCaption: string = '';

  constructor(
    public g: Globals,
    private auth: AuthserviceService,
    public c: Currency,
    private sh: SharedNotificationService,
    private activRoute: ActivatedRoute,
    private cs: CompanyService
  ) {
    this.imForm = new FormGroup({
      imCaption: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    });

    this.chrForm = new FormGroup({
      createdYear: new FormControl(1900),
      workforce: new FormControl(0),
      proopsed_collaborations: new FormControl(0),
      realized_collaborations: new FormControl(0),
      members_engaged: new FormControl(0),
    });

    this.vidForm = new FormGroup({
      vidCaption: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      vidYoutubeUrl: new FormControl('', [Validators.required, Validators.maxLength(100), ValidateUrl]),
    });
  }

  ngOnInit() {
    if (this.action_type == this.editActText) {
      switch (this.data_zone.dtype) {
        case 1:
          this.AllowedZone = [1, 2];
          this.selectedImage = this.data_zone.image.url;
          this.selectedZone = 'imAdd';
          this.zoneSelectVChange('imAdd');
          this.imForm.setValue({ imCaption: this.data_zone.caption });
          break;
        case 2:
          this.AllowedZone = [1, 2];
          this.vidForm.setValue({
            vidCaption: this.data_zone.caption,
            vidYoutubeUrl: this.data_zone.video.url.im_url,
          });
          this.im_poster = this.data_zone.video.url.im_poster;
          this.selectedZone = 'vidAdd';
          this.zoneSelectVChange('vidAdd');
          break;
        case 3:
          if ('createdYear' in this.data_zone.data_suppl && 'proopsed_collaborations' in this.data_zone.data_suppl) {
            this.chrForm.setValue(this.data_zone.data_suppl);
          }
          this.AllowedZone = [this.data_zone.dtype];
          this.selectedZone = 'chiffrAdd';
          this.zoneSelectVChange('chiffrAdd');
          break;
        default:
          this.AllowedZone = [this.data_zone.dtype];
          break;
      }
      this.actionAdd = false;
    } else if (this.action_type == this.addActText) {
      this.actionAdd = true;
    }

    this.sh.im_Selected$.subscribe((st: any) => {
      if (st.select) {
        if (st.destFile == this.newDestFile) {
          this.selectedIm = st.data;
          this.imNotSelected = false;
          this.selectedImage = st.data.url;
        }
      }
    });
  }

  inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
      if (haystack[i] == needle) return true;
    }
    return false;
  }

  zoneSelectChange(evt) {
    Object.keys(this.selctFlag).forEach(k => {
      if (k == evt.target.value) {
        this.selctFlag[k] = true;
      } else {
        this.selctFlag[k] = false;
      }
      this.imNotSelected = true;
    });
  }

  zoneSelectVChange(sectioZone) {
    Object.keys(this.selctFlag).forEach(k => {
      if (k == sectioZone) {
        this.selctFlag[k] = true;
      } else {
        this.selctFlag[k] = false;
      }
    });
  }

  async errorsInInput(arg) {
    const hasError = [];
    const hasErrorkey = [];
    let err = false;
    await Object.keys(arg.value).forEach(el => {
      hasErrorkey.push(el);
      hasError[el] = false;
      if (arg.controls[el].errors) {
        hasError[el] = true;
      }
    });

    for (var i in hasErrorkey) {
      if (hasError[hasErrorkey[i]]) {
        err = true;
      }
    }
    return err;
  }

  async saveChiffresZone() {
    const err = await this.errorsInInput(this.chrForm);
    if (!err) {
      const data_ = this.chrForm.value;
      const data = {
        caption: this.currentCompanySlug + '_chiffres',
        media_type: 3,
        data_suppl: JSON.stringify(data_),
      };

      if (this.action_type === this.editActText) {
        this.apiSaveEdit(data);
      }
    }
  }

  async saveImageZone() {
    const err = await this.errorsInInput(this.imForm);
    if (!err) {
      const data: { [key: string]: any } = {
        caption: this.imForm.value.imCaption,
        media_id: this.selectedIm._id,
        media_type: 1,
      };

      if (this.action_type == this.editActText) {
        let imCh: boolean = false;
        if (this.data_zone.dtype == 1) {
          imCh = this.selectedIm._id == this.data_zone.image._id ? false : true;
        }
        if (data.caption != this.data_zone.caption || imCh || data.media_type != this.data_zone.dtype) {
          this.apiSaveEdit(data);
        }
      } else if (this.action_type == this.addActText) {
        this.apiSave(data).then(e => {
          this.saveFinished();
        });
      }
    } else {
      this.chrError = true;
    }
  }

  async apiSave(d): Promise<any> {
    try {
      let api_save = await this.cs.saveZoneData(d);
      if (api_save) {
        this.sh.notifToast({
          type: 'success',
          message: '<p>Configuration saved</p>',
        });
        return api_save;
      }
    } catch (e) {}
  }

  async apiSaveEdit(data) {
    data.currZn = this.data_zone;
    try {
      let res_save = await this.cs.saveZoneEditData(data);
      if (res_save) {
        this.sh.notifToast({
          type: 'success',
          message: '<p>Update completed</p>',
        });
        this.saveFinished();
        return res_save;
      }
    } catch (e) {
      this.sh.notifToast({
        type: 'error',
        message: '<p>Data not saved, an error occurred during the operation</p>',
      });
    }
  }

  saveFinished() {
    this.presentIn = false;
    this.sh.pushData({ from: 'modal_new', data: 'end' });
  }

  urlSetted(ev) {
    let i_vi = this.getIdVideo(ev.target.value);
    if (!i_vi) {
      this.idVidYouTube = {};
    }
  }

  getIdVideo(r) {
    let video_id = '';
    if (!this.vidForm.get('vidYoutubeUrl').errors) {
      video_id = r.split('v=')[1];
      let ampersandPosition = video_id.indexOf('&');
      if (ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
      }
      this.idVidYouTube = {
        im_poster: 'https://img.youtube.com/vi/' + video_id + '/hqdefault.jpg',
        i_v: video_id,
        im_url: r,
      };
      this.im_poster = this.idVidYouTube.im_poster;
      return video_id;
    } else {
    }
  }

  async saveVideosZone() {
    let err = await this.errorsInInput(this.vidForm);
    if (!err) {
      this.getIdVideo(this.vidForm.value.vidYoutubeUrl);

      let dataVideo = {
        name: this.vidForm.value.vidCaption,
        url: JSON.stringify(this.idVidYouTube),
        acc_owner: this.cs.getMycompanyId(),
        hosted: false,
      };
      try {
        if (this.action_type == this.editActText) {
          if (this.data_zone.dtype == 1) {
            let res_save_vid = await this.cs.saveNoHostedVideo(dataVideo);
            let data = {
              caption: this.vidForm.value.vidCaption,
              media_id: res_save_vid['data']._id,
              media_type: 2,
            };
            this.apiSaveEdit(data).then(e => {
              this.saveFinished();
            });
          } else if (this.data_zone.dtype == 2) {
            if (this.data_zone.video.i_v != this.idVidYouTube.i_v) {
              let res_save_vid = await this.cs.saveNoHostedVideo(dataVideo);
              let data = {
                caption: this.vidForm.value.vidCaption,
                media_id: res_save_vid['data']._id,
                media_type: 2,
              };

              this.apiSaveEdit(data).then(e => {
                this.saveFinished();
              });
            } else if (
              this.data_zone.video.url.i_v == this.idVidYouTube.i_v &&
              this.data_zone.caption != this.vidForm.value.vidCaption
            ) {
              let data = {
                caption: this.vidForm.value.vidCaption,
                media_id: this.data_zone.video._id,
                media_type: 2,
              };

              this.apiSaveEdit(data).then(e => {
                this.saveFinished();
              });
            } else {
            }
          }
        } else if (this.action_type == this.addActText) {
          let res_save_vid = await this.cs.saveNoHostedVideo(dataVideo);
          if (res_save_vid) {
            let data = {
              caption: this.vidForm.value.vidCaption,
              media_id: res_save_vid['data']._id,
              media_type: 2,
            };
            this.apiSave(data).then(e => {
              this.saveFinished();
            });
          }
        }
      } catch (e) {}
    }
  }

  ngOnDestroy() {
    this.sh.pushData({});
    this.sh.notifToast({});
  }

  /*  changeParity(e) {
    let m = this.chrForm.value['pariteHomme'];
    let w = this.chrForm.value['pariteFemme'];
    if (m < 0 || m > 100) {
      this.chrForm.controls['pariteHomme'].setValue(0);
    }
    if (w < 0 || w > 100) {
      this.chrForm.controls['pariteFemme'].setValue(0);
    }
    if (e == 1) {
      if (100 - m > 0) this.chrForm.controls['pariteFemme'].setValue(100 - m);
      else {
        this.chrForm.controls['pariteHomme'].setValue(0);
        this.chrForm.controls['pariteFemme'].setValue(100);
      }
    } else if (e == 2) {
      if (100 - w > 0) this.chrForm.controls['pariteHomme'].setValue(100 - w);
      else {
        this.chrForm.controls['pariteFemme'].setValue(0);
        this.chrForm.controls['pariteHomme'].setValue(100);
      }
    }
  } */
}
