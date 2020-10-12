import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {MaterialModule} from "./material/material.module";
import {Lab1Module} from "./pages/Lab1/lab1.module";
import {Lab2Module} from "./pages/Lab2/lab2.module";
import {Lab3Module} from "./pages/Lab3/lab3.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MaterialModule,
    Lab1Module,
    Lab2Module,
    Lab3Module,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
