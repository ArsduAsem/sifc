import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Outgoing, PopulatedOutgoing} from "../../../../types";
import {concat, Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {map, switchMap} from "rxjs/operators";
import {fromPromise} from "rxjs/internal-compatibility";
import {firestore} from "firebase";
import {ShowIncomeComponent} from "../show-income/show-income.component";
import {CreateIncomeComponent} from "../create-income/create-income.component";
import {CreateOutgoingComponent} from "../create-outgoing/create-outgoing.component";

@Component({
  selector: 'app-lab-first-outgoings',
  templateUrl: './outgoings.component.html',
  styleUrls: ['./outgoings.component.scss']
})
export class OutgoingsComponent implements OnInit {

  displayedColumns = ['number', 'client', 'count', 'date', 'total', 'details']

  collection: AngularFirestoreCollection<Outgoing>;
  changes$: Observable<Outgoing[]>;
  items$: Observable<PopulatedOutgoing[]>;

  constructor(
    private firestore: AngularFirestore,
    private dialog: MatDialog
  ) {
    this.collection = firestore.collection<Outgoing>('lab1-outgoings');
    this.changes$ = this.collection.valueChanges();
  }

  ngOnInit() {
    this.items$ = concat(
      this.getItems(),
      this.changes$
    ).pipe(
      switchMap((items: Outgoing[]) =>
        fromPromise(
          Promise.all(
            items.map(item => this.mapItem(item))
          )
        )
      )
    );
  }

  getItems(): Observable<Outgoing[]> {
    return this.collection.get()
      .pipe(
        map(snap => snap.docs.map((x: firestore.QueryDocumentSnapshot<Outgoing>) => x.data()))
      )
  }

  async mapItem(incoming: Outgoing): Promise<PopulatedOutgoing> {
    const [client, items] = await Promise.all([
      incoming.client.get(),
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
      client: client.data().name,
      count: incoming.items.length,
      total: incoming.items.reduce((total, { quantity, price }) => total + (quantity * price), 0)
    }
  }

  seeDetails(incoming: PopulatedOutgoing) {
    this.dialog.open(ShowIncomeComponent, {
      width: '800px',
      data: incoming
    });
  }

  create() {
    this.dialog.open(CreateOutgoingComponent, {
      width: '800px'
    });
  }
}
