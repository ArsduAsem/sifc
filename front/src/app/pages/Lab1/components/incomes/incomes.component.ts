import {Component, OnInit} from '@angular/core';
import {concat, Observable} from "rxjs";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map, switchMap} from "rxjs/operators";
import {fromPromise} from "rxjs/internal-compatibility";
import { firestore } from 'firebase';
import {Incoming, PopulatedIncoming} from "../../../../types";
import {MatDialog} from "@angular/material/dialog";
import {CreateIncomeComponent} from "../create-income/create-income.component";
import {ShowIncomeComponent} from "../show-income/show-income.component";

@Component({
  selector: 'app-lab-first-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss']
})
export class IncomesComponent implements OnInit {

  displayedColumns = ['number', 'provider', 'count', 'date', 'total', 'details']

  collection: AngularFirestoreCollection<Incoming>;
  changes$: Observable<Incoming[]>;
  items$: Observable<PopulatedIncoming[]>;

  constructor(
    private firestore: AngularFirestore,
    private dialog: MatDialog
  ) {
    this.collection = firestore.collection<Incoming>('lab1-incomes');
    this.changes$ = this.collection.valueChanges();
  }

  ngOnInit() {
    this.items$ = concat(
      this.getItems(),
      this.changes$
    ).pipe(
      switchMap((items: Incoming[]) =>
        fromPromise(
          Promise.all(
            items.map(item => this.mapItem(item))
          )
        )
      )
    );
  }

  getItems(): Observable<Incoming[]> {
    return this.collection.get()
      .pipe(
        map(snap => snap.docs.map((x: firestore.QueryDocumentSnapshot<Incoming>) => x.data()))
      )
  }

  async mapItem(incoming: Incoming): Promise<PopulatedIncoming> {
    const [provider, items] = await Promise.all([
      incoming.provider.get(),
      Promise.all(incoming.items.map(async (itemRow) => {
        const item = await itemRow.itemId.get()

        return {
          ...itemRow,
          name: item.data().name
        }
      }))
    ]);

     return {
       ...incoming,
       items,
       date: incoming.date.toDate(),
       provider: provider.data().name,
       count: incoming.items.length,
       total: incoming.items.reduce((total, { quantity, price }) => total + (quantity * price), 0)
     }
   }

   seeDetails(incoming: PopulatedIncoming) {
     this.dialog.open(ShowIncomeComponent, {
       width: '800px',
       data: incoming
     });
   }

   create() {
    this.dialog.open(CreateIncomeComponent, {
      width: '800px'
    });
  }
}
