import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Client} from "../../../../types";
import {firestore} from "firebase";

@Component({
  selector: 'app-lab-first-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent {

  collection: AngularFirestoreCollection<Client>;

  clientName: string;
  clientAddress: string;
  clientPhone: string;

  constructor(
    private firestore: AngularFirestore
  ) {
    this.collection = firestore.collection<Client>('lab1-clients');
  }

  create() {
    this.collection.add({
      name: this.clientName,
      address: this.clientAddress,
      phone: this.clientPhone,
      date: firestore.Timestamp.now()
    })

    this.clientName = undefined;
    this.clientAddress = undefined;
    this.clientPhone = undefined;
  }

}
