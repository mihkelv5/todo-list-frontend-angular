import {Directive, ElementRef, EventEmitter, HostListener, Output} from "@angular/core";



@Directive({
  selector: '[clickedOutside]'
})
export class ClickedOutsideDirective {

  @Output() clickedOutside = new EventEmitter<void>();

  constructor(private element: ElementRef) {}

  @HostListener('document:click', ['$event'])
  public onClick(event: any){
    const targetElement = event.target;
    const clickedInside = this.element.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickedOutside.emit();
    }
  }

}

