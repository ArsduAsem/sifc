import {Component} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Item} from "../../../../types";
import {firestore} from "firebase";

@Component({
  selector: 'app-lab-first-create-items',
  templateUrl: './create-items.component.html',
  styleUrls: ['./create-items.component.scss']
})
export class CreateItemsComponent {

  collection: AngularFirestoreCollection<Item>;

  itemName: string;
  itemProducer: string;
  itemExpirationDate: string;

  constructor(
    private firestore: AngularFirestore
  ) {
    this.collection = firestore.collection<Item>('lab1-items');
  }

  create() {
    this.collection.add({
      name: this.itemName,
      producer: this.itemProducer,
      date: firestore.Timestamp.fromDate(new Date(this.itemExpirationDate))
    })

    this.itemName = undefined;
    this.itemProducer = undefined;
    this.itemExpirationDate = undefined;
  }
}
