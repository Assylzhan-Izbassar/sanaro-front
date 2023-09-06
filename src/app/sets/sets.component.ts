import { Component } from '@angular/core';
import { DialogService } from '../services/dialog/dialog.service';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.css'],
})
export class SetsComponent {
  constructor(private dialog: DialogService) {}

  onDetail() {
    this.dialog.openRequestDialog(null);
  }
}
