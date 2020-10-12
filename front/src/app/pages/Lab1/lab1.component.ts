import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-lab-first',
  templateUrl: './lab1.component.html',
  styleUrls: ['./lab1.component.scss']
})
export class Lab1Component {
  items$: Observable<any[]>;

  constructor(firestore: AngularFirestore) {
    this.items$ = firestore.collection('items').valueChanges();
  }
}
