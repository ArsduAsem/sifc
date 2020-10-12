import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {PopulatedProvider, Provider, WithId} from "../../../../types";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {firestore} from "firebase";

@Component({
  selector: 'app-lab-first-create-providers',
  templateUrl: './create-providers.component.html',
  styleUrls: ['./create-providers.component.scss']
})
export class CreateProvidersComponent {

  collection: AngularFirestoreCollection<Provider>;

  providerName: string;
  providerAddress: string;
  providerPhone: string;

  constructor(
    private firestore: AngularFirestore
  ) {
    this.collection = firestore.collection<Provider>('lab1-providers');
  }

  create() {
    this.collection.add({
      name: this.providerName,
      address: this.providerAddress,
      phone: this.providerPhone,
      date: firestore.Timestamp.now()
    })

    this.providerName = undefined;
    this.providerAddress = undefined;
    this.providerPhone = undefined;
  }
}
