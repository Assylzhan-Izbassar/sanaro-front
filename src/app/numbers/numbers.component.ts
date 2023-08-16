import { Component } from '@angular/core';
import { SocialNumber } from '../models/social-number.model';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css']
})
export class NumbersComponent {
  socialNumbers: SocialNumber[] = [
    new SocialNumber('1M+', 'Преданных покупателей'),
    new SocialNumber('50+', 'Товаров на любой вкус'),
    new SocialNumber('5+', 'Официальных сотрудничеств'),
    new SocialNumber('100+', 'Отзывов от покупателей'),
  ]
}
