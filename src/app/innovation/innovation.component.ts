import { Component } from '@angular/core';
import { DialogService } from '../services/dialog/dialog.service';

@Component({
  selector: 'app-innovation',
  templateUrl: './innovation.component.html',
  styleUrls: ['./innovation.component.css'],
})
export class InnovationComponent {
  constructor(private dialog: DialogService) {}

  onDetail() {
    this.dialog.openRequestDialog(null);
  }
}
