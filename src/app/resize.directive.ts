import { Directive, HostListener } from '@angular/core';
import { UtilityService } from './utility.service';

@Directive({
  selector: '[tdResize]',
})
export class TdResizeDirective {
  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth <= 600 && this.util.heroHeight === 0.8) {
      this.util.heroHeight = 0.35;
    } else if (window.innerWidth > 600 && this.util.heroHeight === 0.35) {
      this.util.heroHeight = 0.8;
    }
  }
  constructor (
    private util: UtilityService,
  ) {}
}
