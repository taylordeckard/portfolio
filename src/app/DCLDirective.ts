import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[td-dcl]',
})
export class DCLDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
