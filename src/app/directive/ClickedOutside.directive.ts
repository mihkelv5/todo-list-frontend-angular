import {Directive, ElementRef, EventEmitter, HostListener, Output} from "@angular/core";



@Directive({
  selector: '[clickedOutside]'
})
export class ClickedOutsideDirective {

  @Output() clickedOutside = new EventEmitter<void>();

  constructor(private element: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(target: ElementRef){
    const clickedInside = this.element.nativeElement.contains(target);
    if (!clickedInside) {
      this.clickedOutside.emit();
    }
  }

}

