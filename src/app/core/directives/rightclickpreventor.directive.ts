import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appRightclickpreventor]'
})
export class RightclickpreventorDirective {

  constructor() { }

  @HostListener('contextmenu', ['$event']) onRightClick(event: MouseEvent) {
    event.preventDefault();
  }

}
