import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-innovation',
  templateUrl: './innovation.component.html',
  styleUrls: ['./innovation.component.css'],
})
export class InnovationComponent {
  constructor(private authService: AuthService) {}

  onDetail() {}
}
