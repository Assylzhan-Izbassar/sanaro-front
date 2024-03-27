import { DialogService } from 'src/app/services/dialog/dialog.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css'],
})
export class PricesComponent {
  constructor(private dialogService: DialogService) {}

  sendActivize() {
    this.dialogService.openRequestDialog({ reason: 'Activize' });
  }

  sendBase() {
    this.dialogService.openRequestDialog({ reason: 'Базовый сет' });
  }

  sendDouble() {
    this.dialogService.openRequestDialog({ reason: 'Удвоенная энергия' });
  }
}
