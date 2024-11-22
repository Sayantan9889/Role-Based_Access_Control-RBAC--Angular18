import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Assessment-11-11-2024';
  private document = inject(DOCUMENT);
  private router = inject(Router);

  ngOnInit(): void {
    // this.router.initialNavigation();
  }

  protected sidenavOpenClose(event: 'open' | 'close') {
    const navContainer: Element | null = this.document.querySelector('.body-container');
    if (navContainer) {
      navContainer.classList.toggle('sidenav-open', event === 'open');
      navContainer.classList.toggle('sidenav-close', event === 'close');
    }
  }
}
