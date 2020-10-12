import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Client, Incoming, Item, ItemRow, Outgoing, Provider, WithId} from "../../../../types";
import {Observable} from "rxjs";
import {mapFireSnapItems} from "../../../../operators";
import {tap} from "rxjs/operators";
import {firestore} from "firebase";

@Component({
  selector: 'app-lab-first-create-outgoing',
  templateUrl: './create-outgoing.component.html',
  styleUrls: ['./create-outgoing.component.scss']
})
export class CreateOutgoingComponent implements OnInit {

  private clientsCollection: AngularFirestoreCollection<Client>;
  private itemsCollection: AngularFirestoreCollection<Item>;
  private outgoingsCollection: AngularFirestoreCollection<Outgoing>;

  clients$: Observable<WithId<Client>[]>;
  items$: Observable<WithId<Item>[]>;

  clientId: string;
  itemId: string;
  itemPrice: number;
  itemQuantity: number;
  chosedItems: ItemRow[] = [];

  namedItems: Map<string, string> = new Map()

  constructor(
    private firestore: AngularFirestore,
  ) {
    this.clientsCollection = this.firestore.collection('lab1-clients')
    this.itemsCollection = this.firestore.collection('lab1-items')
    this.outgoingsCollection = this.firestore.collection('lab1-outgoings')
  }

  ngOnInit() {
    this.clients$ = this.clientsCollection.get().pipe(
      mapFireSnapItems<Client>()
    )
    this.items$ = this.itemsCollection.get().pipe(
      mapFireSnapItems<Item>(),
      tap(items => items.forEach(item => this.namedItems.set(item.id, item.name)))
    )
  }

  getItemNameById(id: string): string {
    return this.namedItems.get(id) || 'Necunoscut'
  }

  addItem() {
    this.chosedItems.push({
      price: this.itemPrice,
      quantity: this.itemQuantity,
      itemId: (this.itemsCollection.ref as firestore.CollectionReference<Item>).doc(this.itemId),
    })

    this.itemId = undefined;
    this.itemPrice = undefined;
    this.itemQuantity = undefined
  }

  removeItem(index: number) {
    this.chosedItems.splice(index, 1)
  }

  create() {
    this.outgoingsCollection.add({
      client: (this.clientsCollection.ref as firestore.CollectionReference<Client>).doc(this.clientId),
      date: firestore.Timestamp.now(),
      items: this.chosedItems,
      number: 0
    })
  }
}
