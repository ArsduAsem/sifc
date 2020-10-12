import {NgModule} from '@angular/core';
import {Lab2Component} from "./lab2.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    Lab2Component,
  ],
  imports: [
    CommonModule
  ],
  providers: [],
  bootstrap: [Lab2Component]
})
export class Lab2Module { }
