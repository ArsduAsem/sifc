import {Component} from '@angular/core';

@Component({
  selector: 'app-lab-first-rapports',
  templateUrl: './rapports.component.html',
  styleUrls: ['./rapports.component.scss']
})
export class RapportsComponent {
  public rapport;
  public rapports = [
    {
      key: '10bestsellers',
      title: '10 BestSellers',
    },
    {
      key: '10bestProfits',
      title: '10 BestProfits',
    },
  ];
}
