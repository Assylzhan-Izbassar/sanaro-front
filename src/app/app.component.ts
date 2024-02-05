import { isMobile } from './models/base.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'app';

  ngOnInit() {
    if (isMobile.any()) {
      document.body.classList.add('_touch');
    } else {
      document.body.classList.add('_pc');
    }
  }
}
