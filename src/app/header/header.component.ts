import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { DialogService } from '../services/dialog/dialog.service';
import { AuthService } from '../services/auth/auth.service';
import { SharedService } from '../services/core/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  header: HTMLElement | null = document.querySelector('#header');
  sticky: number | undefined = this.header?.offsetTop;

  isLoggedIn = false;

  constructor(
    private dialog?: DialogService,
    private service?: AuthService,
    private sharedSerice?: SharedService
  ) {
    if (this.sharedSerice) {
      this.sharedSerice.getData().subscribe({
        next: (data) => {
          if (data) {
            this.isLoggedIn = data;
          }
        },
      });
    }
  }

  onScroll(): void {
    if (this.sticky !== undefined) {
      if (window.scrollY > this.sticky) {
        this.header?.classList.add('sticky');
      } else {
        this.header?.classList.remove('sticky');
      }
    }
  }

  onLogin(): void {
    if (this.dialog) {
      this.dialog.openAuthDialog({});
    }
  }

  onLogout(): void {
    this.service?.logout();
    setTimeout(() => {
      this.isLoggedIn = false;
    }, 200);
  }

  onRefresh(): void {
    window.location.reload();
  }
}

window.onscroll = function () {
  new HeaderComponent().onScroll();
};
