import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { CanComponentDeactivate } from './guards/can-deactivate.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements CanComponentDeactivate {
  title = 'app';

  constructor(private authService: AuthService) {}

  canDeactivate(): boolean {
    this.authService.logout();
    return true;
  }
}
