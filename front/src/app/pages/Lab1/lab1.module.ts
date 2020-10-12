import {NgModule} from '@angular/core';
import {Lab1Component} from "./lab1.component";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../../material/material.module";
import { IncomesComponent } from './components/incomes/incomes.component';
import { OutgoingsComponent } from './components/outgoings/outgoings.component';
import { RapportsComponent } from './components/rapports/rapports.component';
import { CreateIncomeComponent } from './components/create-income/create-income.component';
import {FormsModule} from "@angular/forms";
import { ShowIncomeComponent } from './components/show-income/show-income.component';
import { ProvidersComponent } from './components/providers/providers.component';
import { CreateProvidersComponent } from './components/create-providers/create-providers.component';
import { ItemsComponent } from './components/items/items.component';
import { CreateItemsComponent } from './components/create-items/create-items.component';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { ClientsComponent } from './components/clients/clients.component';
import { CreateOutgoingComponent } from './components/create-outgoing/create-outgoing.component';
import { TenBestSellersComponent } from './components/rapports/components/ten-best-sellers/ten-best-sellers.component';
import { TenBestProfitComponent } from './components/rapports/components/ten-best-profit/ten-best-profit.component';
import {ItemsStatsService} from "./components/rapports/services/items-stats.service";

@NgModule({
  declarations: [
    Lab1Component,
    IncomesComponent,
    OutgoingsComponent,
    RapportsComponent,
    CreateIncomeComponent,
    ShowIncomeComponent,
    ProvidersComponent,
    CreateProvidersComponent,
    ItemsComponent,
    CreateItemsComponent,
    CreateClientComponent,
    ClientsComponent,
    CreateOutgoingComponent,
    TenBestSellersComponent,
    TenBestProfitComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  providers: [
    ItemsStatsService
  ],
  bootstrap: [Lab1Component]
})
export class Lab1Module { }
