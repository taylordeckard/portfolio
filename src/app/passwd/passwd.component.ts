import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'td-passwd',
  templateUrl: './passwd.component.html',
  styleUrls: ['./passwd.component.scss']
})
export class TdPasswdComponent implements OnInit {
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
