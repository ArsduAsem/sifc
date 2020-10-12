import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Lab1Component} from "./pages/Lab1/lab1.component";
import {Lab2Component} from "./pages/Lab2/lab2.component";
import {Lab3Component} from "./pages/Lab3/lab3.component";

const routes: Routes = [
  { path: 'labs/1', component: Lab1Component },
  { path: 'labs/2', component: Lab2Component },
  { path: 'labs/3', component: Lab3Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
