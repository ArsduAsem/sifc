import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-lab-third',
  templateUrl: './lab3.component.html',
  styleUrls: ['./lab3.component.scss']
})
export class Lab3Component {
  items$: Observable<any[]>;

  constructor(firestore: AngularFirestore) {
    this.items$ = firestore.collection('items').valueChanges();
  }
}
