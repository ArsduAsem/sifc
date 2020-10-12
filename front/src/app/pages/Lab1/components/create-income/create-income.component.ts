import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Incoming, Item, ItemRow, Provider, WithId} from "../../../../types";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {mapFireSnapItems} from "../../../../operators";
import {firestore} from "firebase";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-lab-first-create-income',
  templateUrl: './create-income.component.html',
  styleUrls: ['./create-income.component.scss']
})
export class CreateIncomeComponent implements OnInit {

  private providersCollection: AngularFirestoreCollection<Provider>;
  private itemsCollection: AngularFirestoreCollection<Item>;
  private incomingsCollection: AngularFirestoreCollection<Incoming>;

  providers$: Observable<WithId<Provider>[]>;
  items$: Observable<WithId<Item>[]>;

  providerId: string;
  itemId: string;
  itemPrice: number;
  itemQuantity: number;
  chosedItems: ItemRow[] = [];

  namedItems: Map<string, string> = new Map()

  constructor(
    private firestore: AngularFirestore,
  ) {
    this.providersCollection = this.firestore.collection('lab1-providers')
    this.itemsCollection = this.firestore.collection('lab1-items')
    this.incomingsCollection = this.firestore.collection('lab1-incomes')
  }

  ngOnInit() {
    this.providers$ = this.providersCollection.get().pipe(
      mapFireSnapItems<Provider>()
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
    this.incomingsCollection.add({
      provider: (this.providersCollection.ref as firestore.CollectionReference<Provider>).doc(this.providerId),
      date: firestore.Timestamp.now(),
      items: this.chosedItems,
      number: 0
    })
  }
}
