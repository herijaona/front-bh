import { Component } from "@angular/core";

@Component({
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  selector: 'app-tabs'
})
export class TabsComponent{
  showBesoin: boolean = true;
  invitedShow: boolean = false;
  isSelectedBesoin = "active";
  isSelectedOther = "";
  viewUsersTeams(scp) {
    switch (scp) {
      case 'besoin':
        this.showBesoin = true;
        this.invitedShow = false;
        this.isSelectedBesoin = "active";
        this.isSelectedOther = "";
        break;
      case 'proposition':
        this.showBesoin = false;
        this.invitedShow = true;
        this.isSelectedOther = "active";
        this.isSelectedBesoin = "";
        break;
      default:
        break;
    }
  }
}