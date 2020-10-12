import {NgModule} from '@angular/core';
import {Lab3Component} from "./lab3.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    Lab3Component,
  ],
  imports: [
    CommonModule
  ],
  providers: [],
  bootstrap: [Lab3Component]
})
export class Lab3Module { }
