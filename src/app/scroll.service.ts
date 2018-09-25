import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface ScrollProps {
  top: number;
  height: number;
}

@Injectable()
export class TdScrollService {
  onScrollBinded: any = this.onScroll.bind(this);
  constructor () {}
  public scrollSubject: Subject<ScrollProps> = new Subject<ScrollProps>();
  scroll: ScrollProps = { top: 0, height: 0 };
  set scrollHeight (scrollHeight) {
    if (scrollHeight === this.scroll.height) { return; }
    this.scroll.height = scrollHeight;
    this.scrollSubject.next(this.scroll);
  }
  get scrollHeight () {
    return this.scroll.height;
  }
  set scrollTop (scrollTop) {
    if (scrollTop === this.scroll.top) { return; }
    this.scroll.top = scrollTop;
    this.scrollSubject.next(this.scroll);
  }
  get scrollTop () {
    return this.scroll.top;
  }

  onScroll ($event) {
    const target = <Element>$event.target;
    this.scrollTop = target.scrollTop;
    this.scrollHeight = target.scrollHeight;
  }
}
