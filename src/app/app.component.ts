import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Assessment-11-11-2024';
  private document = inject(DOCUMENT);

  protected sidenavOpenClose(event: 'open' | 'close') {
    const navContainer: Element | null = this.document.querySelector('.body-container');
    if (navContainer) {
      navContainer.classList.toggle('sidenav-open', event === 'open');
      navContainer.classList.toggle('sidenav-close', event === 'close');
    }
  }
}
