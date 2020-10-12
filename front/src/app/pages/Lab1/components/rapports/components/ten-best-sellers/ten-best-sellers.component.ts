import {Component, OnInit} from '@angular/core';
import {combineLatest, Observable} from "rxjs";
import {Item, ItemRow, ItemStats, Outgoing, WithId} from "../../../../../../types";
import {AngularFirestore} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import {ItemsStatsService} from "../../services/items-stats.service";

@Component({
  selector: 'app-lab-first-ten-best-sellers',
  templateUrl: './ten-best-sellers.component.html',
  styleUrls: ['./ten-best-sellers.component.scss']
})
export class TenBestSellersComponent implements OnInit {

  public items$: Observable<ItemStats[]>;

  constructor(private service: ItemsStatsService) {}

  ngOnInit() {
    this.items$ = this.service.get().pipe(
      map(items => items
        .sort(({ totalSells: a }, { totalSells: b }) => b - a)
        .filter(({ totalSells }) => totalSells)
        .filter((_, i) => i < 9)
      )
    )
  }

}
