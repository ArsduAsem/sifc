import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-lab-second',
  templateUrl: './lab2.component.html',
  styleUrls: ['./lab2.component.scss']
})
export class Lab2Component implements OnInit {
  items$: Observable<any[]>;

  constructor(firestore: AngularFirestore) {
    this.items$ = firestore.collection('items').valueChanges();
  }

  ngOnInit() {
  }
}
