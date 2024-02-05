import { Component } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private mySwiper!: Swiper;

  ngAfterViewInit() {
    this.initSwiper();
  }

  initSwiper() {
    this.mySwiper = new Swiper('.swiper-container', {
      direction: 'vertical',
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      grabCursor: true,
      speed: 1000,
      parallax: true,
      autoplay: false,
      effect: 'slide',
      mousewheel: true,
      // Add other Swiper options as needed
    });
  }
}
