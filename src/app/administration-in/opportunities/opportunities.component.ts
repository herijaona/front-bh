import { Component, OnInit } from "@angular/core";
import { Globals } from "./../../globals/globals";
import { ProjectsService } from "../../services/projects/projects.service";

@Component({
  selector: "app-opportunities",
  templateUrl: "./opportunities.component.html",
  styleUrls: ["./opportunities.component.scss"]
})
export class OpportunitiesComponent implements OnInit {
  opportuinityList: any = [];
  allOpportuinity: any = [];
  paginated: boolean = false;
  pageNumber: number = 0;
  constructor(public g: Globals, private pr: ProjectsService) {}

  ngOnInit() {
    this.getListOfOpportinuity();
  }

  async getListOfOpportinuity() {
    try {
      let allL: any = await this.pr.getadminProjectAsOpportuinity();
      if (allL.status === "OK") {
        this.allOpportuinity = allL.data;
        console.log(this.allOpportuinity);
        if (allL.data.length > 100) {
          this.opportuinityList = this.allOpportuinity.slice(0, 100);
          this.paginated = true;
          this.pageNumber = Math.ceil(this.allOpportuinity.length / 100);
        } else {
          this.opportuinityList = allL.data;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  getCollabtypetext(sl) {
    let AllTyp = this.g.getConfig("collab_types");
    for (const clt of AllTyp) {
      if (clt.slug === sl) {
        return clt.text;
      }
    }
    return "";
  }
}
