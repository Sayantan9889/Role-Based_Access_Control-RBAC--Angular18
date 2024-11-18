import { Component, output, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  sidenav = output<'open' | 'close'>();
  private isSidenavOpen:WritableSignal<boolean> = signal<boolean>(true);
  protected svg = `<svg height="50px" width="50px" xml:space="preserve" fill="#000000" transform="rotate(90)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="1.5226" y1="624.2366" x2="-35.5594" y2="586.1046" gradientTransform="matrix(7.8769 0 0 -7.8769 364.0403 4969.6519)"> <stop offset="0.012" style="stop-color:#E0B386"></stop> <stop offset="0.519" style="stop-color:#DA498C"></stop> <stop offset="1" style="stop-color:#961484"></stop> </linearGradient> <path style="fill:url(#SVGID_1_);" d="M308.399,104.438c48.341-48.349,121.36-56.927,178.507-25.797 c-6.743-12.383-15.321-24.04-25.805-34.517c-58.825-58.833-154.199-58.833-213.024,0c-58.833,58.825-58.817,154.199,0,213.024 c10.476,10.476,22.126,19.062,34.517,25.797C251.481,225.814,260.051,152.779,308.399,104.438z"></path> <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="9.5784" y1="603.7798" x2="-1.6616" y2="631.3138" gradientTransform="matrix(7.8769 0 0 -7.8769 364.0403 4969.6519)"> <stop offset="0" style="stop-color:#29D3DA"></stop> <stop offset="0.519" style="stop-color:#0077FF"></stop> <stop offset="0.999" style="stop-color:#064093"></stop> <stop offset="1" style="stop-color:#084698"></stop> </linearGradient> <path style="fill:url(#SVGID_2_);" d="M429.31,142.507c26.002,26.002,30.625,65.284,13.887,96.02 c6.656-3.639,12.942-8.247,18.566-13.887c31.642-31.642,31.626-82.928,0-114.578c-31.657-31.642-82.936-31.642-114.578-0.008 c-5.632,5.64-10.256,11.91-13.879,18.566C364.05,111.898,403.308,116.506,429.31,142.507z"></path> <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="-35.9007" y1="566.5469" x2="-18.1537" y2="587.043" gradientTransform="matrix(7.8769 0 0 -7.8769 364.0403 4969.6519)"> <stop offset="0.012" style="stop-color:#E0B386"></stop> <stop offset="0.519" style="stop-color:#DA498C"></stop> <stop offset="1" style="stop-color:#961484"></stop> </linearGradient> <path style="fill:url(#SVGID_3_);" d="M195.728,399.681C147.379,448.03,74.36,456.608,17.221,425.486 c6.743,12.383,15.328,24.04,25.797,34.517c58.833,58.833,154.207,58.833,213.031,0c58.825-58.825,58.825-154.191,0-213.023 c-10.476-10.468-22.134-19.054-34.517-25.797C252.646,278.305,244.076,351.34,195.728,399.681z"></path> <linearGradient id="SVGID_4_" gradientUnits="userSpaceOnUse" x1="-38.0094" y1="594.0433" x2="-26.7684" y2="566.5123" gradientTransform="matrix(7.8769 0 0 -7.8769 364.0403 4969.6519)"> <stop offset="0" style="stop-color:#29D3DA"></stop> <stop offset="0.519" style="stop-color:#0077FF"></stop> <stop offset="0.999" style="stop-color:#064093"></stop> <stop offset="1" style="stop-color:#084698"></stop> </linearGradient> <path style="fill:url(#SVGID_4_);" d="M74.809,361.62c-26.01-26.01-30.61-65.284-13.871-96.02 c-6.664,3.631-12.95,8.247-18.574,13.879c-31.642,31.634-31.634,82.936,0.008,114.578c31.642,31.634,82.928,31.634,114.57,0 c5.64-5.64,10.256-11.91,13.879-18.566C140.077,392.229,100.811,387.614,74.809,361.62z"></path> </g></svg>`

  protected openClose() {
    this.isSidenavOpen.set(!this.isSidenavOpen());
    this.sidenav.emit(this.isSidenavOpen()? 'open' : 'close');
  }
}
