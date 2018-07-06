import { Component, OnInit, OnDestroy, ViewChild, Input, ElementRef } from '@angular/core';
import { Globals } from './../../globals/globals';
import { SharedNotificationService } from './../../services/shared-notification/shared-notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../services/company/company.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { ModalDirective } from 'angular-bootstrap-md';
@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit, OnDestroy {
  @Input('pageCurrent')
  set pageCurrent(e) {
    this.pCurrent = e.split('_')[0];
    Object.keys(this.isactivePage).forEach((val, i) => {
      if (val === this.pCurrent) {
        this.isactivePage[val] = true;
      } else {
        this.isactivePage[val] = false;
      }
    });
  }
  @Input() public width = 200;
  @Input() public height = 200;
  @ViewChild('canvas') canvas: ElementRef;
  private cx: CanvasRenderingContext2D;
  public image: any;
  public show: boolean = false;
  public hide: boolean = false;
  public pCurrent: string;
  private subscr: {
    [key: string]: Subscription;
  } = {};
  public isactivePage = {
    mindset: false,
    ideas: false,
    team: false,
    meet: false,
    viewreaction: false,
    applicationreport: false,
    projet: false,
    sStr: false,
  };
  private logoDestFile = 'logo_im';
  private coverDestFile = 'cover_im';
  public company_name: string = 'company_name';
  public cpy_entity: string = 'account';
  public company_logo: string = 'company_logo';
  public company_cover: string = 'company_cover';
  public company_nameEditMode: boolean = false;
  public hasWebSiteUrl: boolean = false;
  public currentCompanySlug: string = '';
  public cmp_slug: string = '';
  public _typeOrganisation: string = '----';
  public _addr: string = '----';
  public FrontMenu: boolean = true;
  public pagetoShow: any;
  public header_page_logo: string;
  /* public header_page_logo: string = this.g.base_href + 'assets/img/logo2.png'; */
  public header_page_cover: string = 'url(' + this.g.base_href + 'assets/img/logo2.png' + ')';
  public company_comm_name: string = '';
  public websiteUrl: string = '';
  public editPAGEstatus: boolean = false;
  public selectingImage: boolean = false;
  public logoItem: {
    [key: string]: string;
  } = {};
  public compDetails: {
    [key: string]: string;
  } = {};
  public coverItem: {
    [key: string]: string;
  } = {};
  @ViewChild('form') myModal: ModalDirective;
  public dest_file = '';
  constructor(
    public el: ElementRef,
    public g: Globals,
    public sh: SharedNotificationService,
    private activRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private cs: CompanyService,
    private router: Router
  ) {
    this.subscr.actvR = this.activRoute.params.subscribe((params_: any) => {
      this.currentCompanySlug = params_['slug_acc'];
      this.getDataDetails();
    });

    this.sh.busDataIn$.subscribe((st: any) => {
      if (st.from === 'editData') {
        this.getDataDetails();
      }
    });
  }


  toggleCollapse() {
    this.hide = !this.hide;
    this.show = !this.show;
    this.el.nativeElement.querySelector('.nav-col').classList.add('foo');
  }

  ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = HTMLCanvasElement = this.canvas.nativeElement.getContext('2d')!;
    this.image = new Image();

    canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';
    this.image.onload = () => {
      this.cx.drawImage(this.image, 0, 0, this.width, this.height);
    };
    this.image.src = this.header_page_logo;
  }

  ngOnInit() {
    // this.editPAGEstatus = false;
    this.subscr.notifB = this.sh.notifButton$.subscribe((st: any) => {
      if (st.no === 'clck') {
        if (!st.state) {
          this.company_nameEditMode = false;
          this.editPAGEstatus = false;
        } else {
          this.editPAGEstatus = true;
        }
      }
    });
    this.subscr.imSelect = this.sh.im_Selected$.subscribe((st: any) => {
      if (st.select) {
        if (st.destFile === this.logoDestFile) {
          this.logoItem = st.data;
          this.header_page_logo = this.logoItem.url;
        } else if (st.destFile === this.coverDestFile) {
          this.coverItem = st.data;
          this.header_page_cover = 'url(' + st.data.url + ')';
        }
      }
    });
    this.subscr.editEv = this.sh.editEvent$.subscribe((arg_: any) => {
      if (arg_.section === this.company_name) {
        if (arg_.action === 'edit') {
          this.editCompanyNameSection();
        } else if (arg_.action === 'save') {
          this.saveCompanyNameSection();
        }
      } else if (arg_.section === this.company_logo) {
        if (arg_.action === 'edit') {
          this.editCompanyLogo();
        } else if (arg_.action === 'save') {
          this.saveCompanyLogo();
        }
      } else if (arg_.section === this.company_cover) {
        if (arg_.action === 'edit') {
          this.editCompanyCover();
        } else if (arg_.action === 'save') {
          this.saveCompanyCover();
        }
      }
    });
  }
  getDataDetails() {
    if (this.currentCompanySlug) {
      this.FrontMenu = true;
      this.getCurrentCompany(this.currentCompanySlug).then(
        (e: any) => {
          if (e.status != 200) {
            this.router.navigateByUrl('/');
          }
        },
        e => {
          this.router.navigateByUrl('/');
        }
      );
    } else {
      this.FrontMenu = false;
      this.cs.getMyCompanData().then(
        (e: any) => {
          this.cmp_slug = e._slug;
          this.showData(e);
        },
        er => {
          this.router.navigateByUrl('/');
        }
      );
    }
  }

  editCompanyLogo() {
    this.selectingImage = true;
    this.dest_file = this.logoDestFile;
    setTimeout(() => {
      this.myModal.show();
    }, 300);
  }

  editCompanyCover() {
    this.selectingImage = true;
    this.dest_file = this.coverDestFile;
    setTimeout(() => {
      this.myModal.show();
    }, 300);
  }

  hideImageModal() {
    this.myModal.hide();
    setTimeout(() => {
      this.selectingImage = false;
    }, 300);
  }

  saveCompanyLogo() {
    if (this.logoItem._id) {
      this.saveUpdateIm({ Logo: this.logoItem._id });
    }
  }

  async saveUpdateIm(arg: any) {
    try {
      const res_update = await this.cs.updateDataInfo(arg);
      if (res_update) {
        this.sh.notifToast({
          type: 'success',
          message: '<p>Saved</p>',
        });
      }
      this.logoItem = {};
    } catch (e) {}
  }

  saveCompanyCover() {
    if (this.coverItem._id) {
      this.saveUpdateIm({ coverImage: this.coverItem._id });
    }
  }

  saveCompanyNameSection() {
    this.cs
      .updateDataInfo({
        enseigneCommerciale: this.company_comm_name,
      })
      .then(
        (resp: any) => {
          this.sh.notifToast({
            type: 'success',
            message: '<p>Saved</p>',
          });
          this.company_nameEditMode = false;
          setTimeout(() => {
            window.history.pushState(
              {
                pageTitle: this.company_comm_name,
              },
              '',
              this.g.site_baseUrl + this.g.base_href + '/open-innovation/' + resp._slug + '/acceuil'
            );
          }, 3000);
        },
        err => {
          console.log(err.error);
        }
      );
  }
  editCompanyNameSection() {
    this.company_nameEditMode = true;
  }

  async getCurrentCompany(slug_: string) {
    try {
      let rsp: any = await this.cs.getCompanyDetails(slug_);
      if (rsp) {
        this.showData(rsp);
        return {
          status: 200,
          message: 'OK',
        };
      }
    } catch (e) {
      let d = {
        status: e.status,
        message: e.error,
      };
      return d;
    }
  }

  showData(rsp: any) {
    this.pagetoShow = JSON.parse(rsp['pagetoShow']);
    this.header_page_logo = rsp['Logo'];
    this.image.src = rsp['Logo'];
    if (rsp['coverImage']) {
      this.header_page_cover = 'url(' + rsp['coverImage'] + ')';
    }
    if (rsp['websiteUrl']) {
      this.websiteUrl = rsp['websiteUrl'];
      this.hasWebSiteUrl = true;
    }
    this.company_comm_name = rsp['enseigneCommerciale'];
    this.compDetails = rsp;
    this._typeOrganisation = rsp['typeOrganisation'];
    this._addr = rsp['adresse'];
  }

  ngOnDestroy() {
    Object.keys(this.subscr).forEach(e => {
      this.subscr[e].unsubscribe();
    });
    delete this.editPAGEstatus;
    delete this.sh;
  }
}
