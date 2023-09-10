import { Component } from '@angular/core';
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

  /**
   * Method for scrolling to the specific parts of web page.
   * @param fragment - Id of the section / fragment.
   */
  scrollToFragment(fragment: string): void {
    const targetElement = document.getElementById(fragment);

    if (targetElement) {
      const desiredScrollPosition = targetElement.offsetTop - 73;
      window.scrollTo({ top: desiredScrollPosition, behavior: 'smooth' });
    }
  }

  /**
   * To using sticky scrolling in the web page.
   */
  onScroll(): void {
    if (this.sticky !== undefined) {
      if (window.scrollY > this.sticky) {
        this.header?.classList.add('sticky');
      } else {
        this.header?.classList.remove('sticky');
      }
    }
  }

  /**
   * Method when pressed login button.
   */
  onLogin(): void {
    if (this.dialog) {
      this.dialog.openAuthDialog({});
    }
  }

  /**
   * Method when pressed logout button.
   */
  onLogout(): void {
    this.service?.logout();
    setTimeout(() => {
      this.isLoggedIn = false;
    }, 200);
  }

  /**
   * Method when pressed logo in the header.
   */
  onRefresh(): void {
    window.location.reload();
  }
}

window.onscroll = function () {
  new HeaderComponent().onScroll();
};
