import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {PopulatedProvider, Provider, WithId} from "../../../../types";
import {concat, Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {mapFireSnapItems} from "../../../../operators";
import {map} from "rxjs/operators";
import {CreateProvidersComponent} from "../create-providers/create-providers.component";

@Component({
  selector: 'app-lab-first-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {

  displayedColumns = ['id', 'name', 'address', 'phone', 'date']

  collection: AngularFirestoreCollection<Provider>;
  changes$: Observable<WithId<Provider>[]>;
  items$: Observable<WithId<PopulatedProvider>[]>;

  constructor(
    private firestore: AngularFirestore,
    private dialog: MatDialog
  ) {
    this.collection = firestore.collection<Provider>('lab1-providers');
    this.changes$ = this.collection.valueChanges({
      idField: 'id'
    });
  }

  ngOnInit() {
    this.items$ = concat(
      this.collection.get().pipe(
        mapFireSnapItems<Provider>()
      ),
      this.changes$
    ).pipe(
      map((items) => items.map(item => ({ ...item, date: item.date.toDate() })))
    );
  }

  create() {
    this.dialog.open(CreateProvidersComponent, {
      width: '400px'
    })
  }
}
