import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '../services/dialog/dialog.service';
import { AuthService } from '../services/auth/auth.service';
import { SharedService } from '../services/core/shared.service';
import { phoneNumber } from '../models/base.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  header?: HTMLElement | null;
  sticky: number | undefined;

  menuIcon?: HTMLElement | null;
  menuBody?: HTMLElement | null;

  phoneNumber? = phoneNumber;
  isLoggedIn = false;

  constructor(
    private dialog?: DialogService,
    private service?: AuthService,
    private sharedSerice?: SharedService,
    private router?: Router
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

  ngAfterViewInit() {
    this.header = document.querySelector('#header');
    this.sticky = this.header?.offsetTop;

    this.menuIcon = document.querySelector('.menu__icon');
    this.menuBody = document.querySelector('.menu__body');
  }

  showMenu() {
    if (this.menuIcon && this.menuBody) {
      document.body.classList.toggle('_lock');
      this.menuIcon.classList.toggle('_active');
      this.menuBody.classList.toggle('_active');
    }
  }

  /**
   * Method for scrolling to the specific parts of web page.
   * @param fragment - Id of the section / fragment.
   */
  scrollToFragment(fragment: string): boolean {
    const targetElement = document.getElementById(fragment);

    if (this.menuIcon?.classList.contains('_active')) {
      document.body.classList.remove('_lock');
      this.menuIcon.classList.remove('_active');
      this.menuBody?.classList.remove('_active');
    }

    if (targetElement) {
      // targetElement.scrollIntoView({
      //   block: 'start',
      //   behavior: 'smooth',
      //   inline: 'start',
      // });
      const desiredScrollPosition = targetElement.offsetTop - 73;
      window.scrollTo({ top: desiredScrollPosition, behavior: 'smooth' });
      this.router?.navigate([], { fragment: fragment });
    }
    return false;
  }

  /**
   * To using sticky scrolling in the web page.
   */
  onScroll(): void {
    if (this.sticky !== undefined) {
      this.header?.classList.toggle('sticky');
    }
  }

  /**
   * Method when pressed login button.
   */
  onLogin(): void {
    if (this.dialog) {
      if (this.menuIcon?.classList.contains('_active')) {
        document.body.classList.remove('_lock');
        this.menuIcon.classList.remove('_active');
        this.menuBody?.classList.remove('_active');
      }
      setTimeout(() => {
        this.dialog?.openAuthDialog({});
      }, 300);
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
