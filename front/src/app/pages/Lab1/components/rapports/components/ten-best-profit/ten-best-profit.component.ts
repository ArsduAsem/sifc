import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {ItemStats} from "../../../../../../types";
import {ItemsStatsService} from "../../services/items-stats.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-lab-first-ten-best-profit',
  templateUrl: './ten-best-profit.component.html',
  styleUrls: ['./ten-best-profit.component.scss']
})
export class TenBestProfitComponent implements OnInit {

  public items$: Observable<ItemStats[]>;

  constructor(private service: ItemsStatsService) {}

  ngOnInit() {
    this.items$ = this.service.get().pipe(
      map(items => items
        .sort(({ totalProfit: a }, { totalProfit: b }) => b - a)
        .filter(({ totalProfit }) => totalProfit)
        .filter((_, i) => i < 9)
      )
    )
  }
}
