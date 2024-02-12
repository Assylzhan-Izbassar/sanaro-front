import { Component } from '@angular/core';
import { DialogService } from '../../services/dialog/dialog.service';
import { phoneNumber } from 'src/app/models/base.model';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent {
  phoneNumber: string = phoneNumber;
  body: Element = document.body;

  constructor(private dialogService: DialogService) {}

  /**
   * Opens a greeting dialog as an initial modal form in the landing.
   */
  openGreetingDialog(): void {
    this.dialogService.openGreetingDialog({});
  }
}
