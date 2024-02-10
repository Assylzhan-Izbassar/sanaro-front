import { Component } from '@angular/core';
import {
  SocialNumber,
  socialNumbers as numbers,
} from '../../models/social-number.model';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css'],
})
export class NumbersComponent {
  socialNumbers: SocialNumber[] = numbers;
}
