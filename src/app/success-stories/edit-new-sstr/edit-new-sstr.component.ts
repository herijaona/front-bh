import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SharedNotificationService } from './../../services/shared-notification/shared-notification.service';
import { CompanyService } from '../../services/company/company.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidateUrl } from '../../services/validators/own.validator';

@Component({
  selector: 'edit-new-sstr',
  templateUrl: './edit-new-sstr.component.html',
  styleUrls: ['./edit-new-sstr.component.scss'],
})
export class EditNewSstrComponent implements OnInit, OnDestroy {
  public toDoAct: string;
  public idVidYouTube: { [key: string]: string } = {};
  public sstrData: any;
  public sstrForm: FormGroup;
  public im_poster: string;
  public editAct = 'editAct';
  public newAct = 'newAct';

  @Input('toDoAct_')
  set toDoAct_(d) {
    this.toDoAct = d;
  }
  @Input('sstrData_')
  set sstrData_(d) {
    this.sstrData = d;
  }

  constructor(private sh: SharedNotificationService, private cs: CompanyService) {
    this.sstrForm = new FormGroup({
      sstrCaption: new FormControl('', [Validators.required]),
      sstrVideoUrl: new FormControl('', [Validators.required, ValidateUrl]),
    });
  }

  ngOnInit() {
    if (this.toDoAct === this.newAct) {
    } else if (this.toDoAct === this.editAct) {
      if (this.sstrData !== null) {
        this.sstrForm.setValue({
          sstrCaption: this.sstrData.caption,
          sstrVideoUrl: this.sstrData.video_url,
        });
        this.im_poster = this.sh.getVideoImPoster(this.sstrData.id_video);
      }
    }
  }

  getIdVideo(r) {
    let video_id = '';
    if (!this.sstrForm.get('sstrVideoUrl').errors) {
      video_id = r.split('v=')[1];
      const ampersandPosition = video_id.indexOf('&');
      if (ampersandPosition !== -1) {
        video_id = video_id.substring(0, ampersandPosition);
      }
      this.idVidYouTube = {
        im_poster: 'https://img.youtube.com/vi/' + video_id + '/maxresdefault.jpg',
        id_video: video_id,
        video_url: r,
        iframe_: '<iframe src="https://www.youtube.com/embed/' + video_id + '?controls=1&autoplay=1"></iframe>',
      };
      this.im_poster = this.sh.getVideoImPoster(video_id);
      return video_id;
    } else {
    }
  }

  async submitSstr() {
    try {
      if (this.toDoAct === this.newAct) {
        this.idVidYouTube['caption'] = this.sstrForm.value.sstrCaption;
        const resp: any = await this.cs.sstrFrontSaveData(this.idVidYouTube);
        if (resp.status === 'OK') {
          this.successAction();
        }
      }
      if (this.toDoAct === this.editAct) {
        if (
          this.sstrForm.value.sstrCaption !== this.sstrData.caption ||
          this.sstrForm.value.sstrVideoUrl !== this.sstrData.video_url ||
          this.idVidYouTube.id_video !== this.sstrData.id_video
        ) {
          this.idVidYouTube['caption'] = this.sstrForm.value.sstrCaption;
          this.idVidYouTube['video_url'] = this.sstrForm.value.video_url;

          const sstrUpdate: any = await this.cs.updatesstrData({
            id_: this.sstrData._id,
            data: this.idVidYouTube,
          });
          if (sstrUpdate.status === 'OK') {
            this.successAction();
          }
        }
      }
    } catch (e) {
      console.log(e);
      if (e.status === 409) {
        this.sh.notifToast({
          type: 'success',
          message: '<p>Video DEJA AJOUTEE</p>',
        });
      }
    }
  }

  urlSetted(ev) {
    const i_vi = this.getIdVideo(ev.target.value);
    if (!i_vi) {
      this.idVidYouTube = {};
    }
  }

  emitCloseModal() {
    this.sh.pushData({
      from: 'edit-new-sstr',
      action: 'close',
    });
  }

  successAction() {
    const data = {
      type: 'success',
      refresh: true,
    };
    this.sh.notifToast({
      type: 'success',
      message: '<p>Configuration saved</p>',
    });
    this.sh.pushData({
      from: 'edit-new-sstr',
      action: 'action',
      data: data,
    });
  }

  ngOnDestroy() {
    this.sh.pushData({});
  }
}
