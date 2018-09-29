import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'td-jprdy',
  templateUrl: './jprdy.component.html',
  styleUrls: ['./jprdy.component.scss']
})
export class TdJprdyComponent implements OnInit {
  constructor (
    private host: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit () {
    setTimeout(() => {
      this.renderer.setStyle(this.host.nativeElement, 'opacity', 1);
    }, 400);
  }
}
