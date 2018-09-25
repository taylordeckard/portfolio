import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { TdScrollService } from '../scroll.service';

@Component({
  selector: 'td-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class TdProjectsComponent implements OnDestroy, OnInit {
  scrollSub: Subscription;
  @ViewChild('projects') projects: ElementRef;
  constructor (
    private scrollService: TdScrollService,
    private renderer: Renderer2,
  ) {}

  ngOnInit () {
    this.scrollSub = this.scrollService.scrollSubject.subscribe(scroll => {
      const isScrollBottom = window.innerHeight + scroll.top >= scroll.height;
      if (isScrollBottom) {
        this.renderer.addClass(this.projects.nativeElement, 'show');
      } else {
        this.renderer.removeClass(this.projects.nativeElement, 'show');
      }
    });
  }

  ngOnDestroy () {
    this.scrollSub.unsubscribe();
  }

  onClick () {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  }

}
