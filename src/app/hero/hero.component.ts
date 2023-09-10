import { Component } from '@angular/core';
import { DialogService } from '../services/dialog/dialog.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent {
  constructor(private dialogService: DialogService) {}

  /**
   * Opens an auth dialog if we do not authorize or questionnaire one.
   */
  openAuthDialog(): void {
    this.dialogService.openDialog({});
  }
}
