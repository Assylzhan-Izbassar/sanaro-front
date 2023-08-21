import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  header: HTMLElement | null = document.querySelector('#header');
  sticky: number | undefined = this.header?.offsetTop;

  constructor() {}

  onScroll() {
    if (this.sticky !== undefined) {
      if (window.pageYOffset > this.sticky) {
        this.header?.classList.add('sticky');
      } else {
        this.header?.classList.remove('sticky');
      }
    }
    console.log(this.sticky);
  }
}

window.onscroll = function () {
  new HeaderComponent().onScroll();
};
