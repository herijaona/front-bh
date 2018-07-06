import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Globals } from "../../globals/globals";
import { ApiHttpService } from "../../services/api-http/api-http.service";
import { SharedNotificationService } from "../../services/shared-notification/shared-notification.service";
import { CompanyService } from "../../services/company/company.service";

@Component({
  selector: "list-companies",
  templateUrl: "./list-companies.component.html",
  styleUrls: ["./list-companies.component.scss"]
})
export class ListCompaniesComponent implements OnInit {
  public companies_data = [];
  constructor(
    private cs: CompanyService,
    public g: Globals,
    private apiHttp: ApiHttpService,
    private sh: SharedNotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllCompanies().then((d: any) => {
      var er = [];
      d.map(function(el) {
        er.push(el);
        return el;
      });
      this.companies_data = er;
      // this.sh.runloader({ action: "hide" });
    });
  }

  getAllCompanies() {
    // this.sh.runloader({ action: "show" });
    return new Promise((resolve, reject) => {
      this.cs.getAllCompanies().then(
        (data: any) => {
          resolve(data);
        },
        error => {
          console.log(error);
          this.router.navigateByUrl("/administration-in/account-note");
        }
      );
    });
  }
  getACTIVITY(r) {
    return r.replace("_", " ");
  }
}
