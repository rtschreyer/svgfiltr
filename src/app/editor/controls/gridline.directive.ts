import { Directive, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[svgGridline]'
})
export class GridlineDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private elem: ElementRef ) {

    this.viewContainer.createEmbeddedView(this.templateRef);
    

    console.log('Element: ',this.elem.nativeElement.parentElement.innerHTML);
    
  }

}
