import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Item, PopulatedItem, WithId} from "../../../../types";
import {concat, Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {mapFireSnapItems} from "../../../../operators";
import {map} from "rxjs/operators";
import {CreateItemsComponent} from "../create-items/create-items.component";

@Component({
  selector: 'app-lab-first-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  displayedColumns = ['id', 'name', 'producer', 'date']

  collection: AngularFirestoreCollection<Item>;
  changes$: Observable<WithId<Item>[]>;
  items$: Observable<WithId<PopulatedItem>[]>;

  constructor(
    private firestore: AngularFirestore,
    private dialog: MatDialog
  ) {
    this.collection = firestore.collection<Item>('lab1-items');
    this.changes$ = this.collection.valueChanges({
      idField: 'id'
    });
  }

  ngOnInit() {
    this.items$ = concat(
      this.collection.get().pipe(
        mapFireSnapItems<Item>()
      ),
      this.changes$
    ).pipe(
      map((items) => items.map(item => ({ ...item, date: item.date.toDate() })))
    );
  }

  create() {
    this.dialog.open(CreateItemsComponent, {
      width: '400px'
    })
  }
}
