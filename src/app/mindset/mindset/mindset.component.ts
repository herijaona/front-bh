import { Component, OnInit, OnDestroy } from "@angular/core";
import { Globals } from "./../../globals/globals";
import { AuthserviceService } from "../../services/authservice/authservice.service";
import { CompanyService } from "../../services/company/company.service";

@Component({
  selector: "app-mindset",
  templateUrl: "./mindset.component.html",
  styleUrls: ["./mindset.component.scss"]
})
export class MindsetComponent implements OnInit, OnDestroy {
  public show: boolean = false;
  public buttonName: any = "Show";
  public mindset_page : string = 'mindset_page';
  public isAdmin_: boolean = false;

  constructor(
    public g: Globals,
    private auth: AuthserviceService,
    private cs: CompanyService
  ) {}

  ngOnInit() {}

  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show) this.buttonName = "Hide";
    else this.buttonName = "Show";
  }

  ngOnDestroy() {    
    this.cs.removeMycompanyId();
  }
}
