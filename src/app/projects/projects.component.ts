import {
  AfterViewInit, Component, ComponentFactoryResolver, ElementRef, OnDestroy, OnInit, QueryList,
  Renderer2, ViewChild, ViewChildren,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TdScrollService } from '../scroll.service';
import { Project, ProjectList } from './projects-list.const';
import { DCLDirective } from '../DCLDirective';

@Component({
  selector: 'td-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class TdProjectsComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChildren('card') cards: QueryList<ElementRef>;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('projects') projects: ElementRef;
  @ViewChild(DCLDirective) dcl: DCLDirective;
  cardElems: Element[];
  cardSub: Subscription;
  projectList: Project[] = [...ProjectList];
  scrollSub: Subscription;
  showDescription = false;

  constructor (
    private componentFactoryResolver: ComponentFactoryResolver,
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
  openDescription (project: Project) {
    this.projectList = this.projectList.filter((p: Project) => p.name === project.name);
    this.showDescription = true;
    const componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(project.templateCmpnt);
    this.dcl.viewContainerRef.clear();
    this.dcl.viewContainerRef.createComponent(componentFactory);
    this.renderer.setProperty(this.projects.nativeElement, 'scrollLeft', 13);
    this.renderer.setProperty(this.projects.nativeElement, 'onmousewheel', this.preventDefault.bind(this));
    this.renderer.setProperty(this.projects.nativeElement, 'ontouchmove', this.preventDefault.bind(this));
    setTimeout(() => {
      this.renderer.setStyle(this.closeBtn.nativeElement, 'opacity', 1);
    }, 800);
  }

  closeDescription () {
    setTimeout(() => {
      this.projectList = [...ProjectList];
    }, 200);
    this.showDescription = false;
    this.dcl.viewContainerRef.clear();
    this.renderer.setProperty(this.projects.nativeElement, 'scrollLeft', 0);
    this.renderer.setProperty(this.projects.nativeElement, 'onmousewheel', null);
    this.renderer.setProperty(this.projects.nativeElement, 'ontouchmove', null);
    this.renderer.setStyle(this.closeBtn.nativeElement, 'opacity', 0);
  }

  preventDefault(e: Event) {
    e = e || window.event;
    // prevent scrolling for the 'projects' element
    if ((<Element>e.target).className === this.projects.nativeElement.className) {
      if (e.preventDefault) { e.preventDefault(); }
      e.returnValue = false;
    }
  }
}
