import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../../services/authservice/authservice.service';

@Component({
  selector: 'p-completion',
  templateUrl: './p-completion.component.html',
  styleUrls: ['./p-completion.component.scss'],
})
export class PCompletionComponent implements OnInit {
  public completion = 0;
  constructor(private auth: AuthserviceService) {}

  async ngOnInit() {
    try {
      const accDATA = await this.auth.isAdminUser();
      if (accDATA['status'] === 'OK') {
        if ('websiteUrl' in accDATA['data']) {
          this.completion = 100;
        } else {
          this.completion = 95;
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}
