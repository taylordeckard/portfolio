import {
  AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, Renderer2, ViewChild,
  ViewChildren,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TdScrollService } from '../scroll.service';
import { Project, ProjectList } from './projects-list.const';

@Component({
  selector: 'td-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class TdProjectsComponent implements AfterViewInit, OnDestroy, OnInit {
  scrollSub: Subscription;
  cardSub: Subscription;
  @ViewChild('projects') projects: ElementRef;
  projectList: Project[] = ProjectList;
  @ViewChildren('card') cards: QueryList<ElementRef>;
  cardElems: Element[];
  constructor (
    private scrollService: TdScrollService,
    private renderer: Renderer2,
  ) {}

  ngOnInit () {
    this.scrollSub = this.scrollService.scrollSubject.subscribe(scroll => {
      this.animateBg(scroll);
      this.animateCards(scroll);
    });
  }

  ngAfterViewInit () {
    const getCards = (cards: QueryList<ElementRef>) => cards.toArray().map(c => c.nativeElement);
    this.cardElems = getCards(this.cards);
    this.cardSub = this.cards.changes.subscribe((cards: QueryList<ElementRef>) => {
      this.cardElems = getCards(cards);
    });
  }

  ngOnDestroy () {
    this.scrollSub.unsubscribe();
  }

  animateCards (scroll) {
    if (scroll.top + window.innerHeight >= scroll.height) {
      this.renderer.addClass(this.projects.nativeElement, 'show');
      this.cardElems.forEach((card: Element, idx: number) => {
        this.renderer.setStyle(card, 'transition-delay', `${(idx + 1) * .2}s`);
      });
    } else {
      this.renderer.removeClass(this.projects.nativeElement, 'show');
    }
  }

  animateBg (scroll) {
    const halfScreenHeight = window.innerHeight / 2;
    const scrollLeftAtHalfway = scroll.height - (window.innerHeight + halfScreenHeight + 40);
    const scrollLeft = scroll.height - scroll.top - window.innerHeight;
    let posX = `-${(100 / scrollLeftAtHalfway) * scrollLeft}vw`;
    if (scroll.top < halfScreenHeight) {
      posX = '-100vw';
    }
    this.renderer.setAttribute(this.projects.nativeElement, 'style', `--pos-x: translateX(${posX});`);
  }

  onClick () {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  }

  navigateTo (link: string) {
    window.location.href = link;
  }
}
