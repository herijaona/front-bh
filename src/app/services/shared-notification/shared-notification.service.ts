import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SharedNotificationService {
  /*
	* Load view : called when data change for all view reload their data
	*/

  private loadingMessage = new BehaviorSubject<Object>({});
  private headerUpdateMessage = new BehaviorSubject<Object>({});
  private companyNotif = new BehaviorSubject<Object>({});
  private toastNotif = new BehaviorSubject<Object>({});
  private updateViewNotif = new BehaviorSubject<Object>({});
  // private missionConfirmedSource = new Subject<any>();

  /*
	* Load view : called when data change for all view reload their data
	*/

  run_loader$ = this.loadingMessage.asObservable();
  run_runUpdateHeader$ = this.headerUpdateMessage.asObservable();
  notifCompany$ = this.companyNotif.asObservable();
  ViewUpdateNotif$ = this.updateViewNotif.asObservable();
  notifToast$ = this.toastNotif.asObservable();
  /*
  * Data Ready
  */
  private DataReadyNotif = new BehaviorSubject<Object>({});
  public readyData$ = this.DataReadyNotif.asObservable();
  /*
  * Event on Button section edit clicked (sectiontoEdit)
  */
  private editEventNotif = new BehaviorSubject<Object>({});
  editEvent$ = this.editEventNotif.asObservable();
  /*
  * Load view : called when data change for all view reload their data (sendDataBus)
  */
  private loadBus = new BehaviorSubject<Object>({});
  viewLoadBus$ = this.loadBus.asObservable();
  /*
 * Edit button notification (pageEditButton)
  */
  private editButtonNotif = new BehaviorSubject<Object>({});
  notifButton$ = this.editButtonNotif.asObservable();
  /*
 * Event when image selected on the modal image selection (imageSelected)
 */
  private imSelect_ = new BehaviorSubject<Object>({});
  im_Selected$ = this.imSelect_.asObservable();
  /*
  * Event when image selected on the modal image selection (pushData)
  */
  private busData = new BehaviorSubject<Object>({});
  busDataIn$ = this.busData.asObservable();

  constructor() {}
  // Service message commands
  runloader(message: any) {
    this.loadingMessage.next(message);
  }

  imageSelected(arg: any) {
    this.imSelect_.next(arg);
  }
  updateHeader(message: any) {
    this.headerUpdateMessage.next(message);
  }

  notifDataUnvaliable(d: any) {
    this.companyNotif.next(d);
  }

  notifyUpdateView(ew) {
    this.updateViewNotif.next(ew);
  }

  notifToast(arg: any) {
    this.toastNotif.next(arg);
  }

  tellDataReady(arg: any) {
    this.DataReadyNotif.next(arg);
  }

  sectiontoEdit(arg) {
    this.editEventNotif.next(arg);
  }

  sendDataBus(arg: any) {
    this.loadBus.next(arg);
  }

  pageEditButton(arg: any) {
    this.editButtonNotif.next(arg);
  }

  pushData(arg: any) {
    this.busData.next(arg);
  }

  /*
	* State of edit
	*/
  getLocalEditState() {
    return window.localStorage.getItem('EditState');
  }

  getEditTime() {
    const tm = parseInt(localStorage.getItem('setTime'), 10);
    if (tm && Date.now() - tm < 1800000) {
      return true;
    }
    return false;
  }

  setLocalEditState(st: any) {
    if (st) {
      window.localStorage.setItem('setTime', Date.now().toString());
    } else {
      window.localStorage.removeItem('setTime');
    }
    return window.localStorage.setItem('EditState', st);
  }

  getVideoImPoster(videoID) {
    return 'https://img.youtube.com/vi/' + videoID + '/maxresdefault.jpg';
  }
  getiframeVideo(videoID) {
    return '<iframe src="https://www.youtube.com/embed/' + videoID + '?controls=1&autoplay=1"></iframe>';
  }

  copydata(destination: any, origin: any) {
    Object.keys(origin).forEach(function(key) {
      if (key in destination) {
        destination[key] = origin[key];
      }
    });
    return destination;
  }
}
