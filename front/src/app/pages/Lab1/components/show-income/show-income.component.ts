import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PopulatedIncoming} from "../../../../types";

@Component({
  selector: 'app-lab-first-show-income',
  templateUrl: './show-income.component.html',
  styleUrls: ['./show-income.component.scss']
})
export class ShowIncomeComponent {
  incoming: PopulatedIncoming

  constructor(@Inject(MAT_DIALOG_DATA) incoming: PopulatedIncoming) {
    this.incoming = incoming
  }
}
