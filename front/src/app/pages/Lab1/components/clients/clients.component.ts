import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Client, PopulatedClient, WithId} from "../../../../types";
import {concat, Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {mapFireSnapItems} from "../../../../operators";
import {map} from "rxjs/operators";
import {CreateClientComponent} from "../create-client/create-client.component";

@Component({
  selector: 'app-lab-first-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  displayedColumns = ['id', 'name', 'address', 'phone', 'date']

  collection: AngularFirestoreCollection<Client>;
  changes$: Observable<WithId<Client>[]>;
  items$: Observable<WithId<PopulatedClient>[]>;

  constructor(
    private firestore: AngularFirestore,
    private dialog: MatDialog
  ) {
    this.collection = firestore.collection<Client>('lab1-clients');
    this.changes$ = this.collection.valueChanges({
      idField: 'id'
    });
  }

  ngOnInit() {
    this.items$ = concat(
      this.collection.get().pipe(
        mapFireSnapItems<Client>()
      ),
      this.changes$
    ).pipe(
      map((items) => items.map(item => ({ ...item, date: item.date.toDate() })))
    );
  }

  create() {
    this.dialog.open(CreateClientComponent, {
      width: '400px'
    })
  }
}
