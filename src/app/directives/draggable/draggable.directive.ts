import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDraggable]',
  standalone: true
})
export class DraggableDirective {
  
  @Input() 
  dragData: any;

  constructor(
    private elementRef: ElementRef, 
    private renderer2: Renderer2) {
    this.renderer2.setAttribute(this.elementRef.nativeElement, 'draggable', 'true');
  }

  @HostListener('dragstart', ['$event']) onDragStart(event: DragEvent) {
    event.stopPropagation();

    if(event.dataTransfer) {
      event.dataTransfer.setData('text/plain', JSON.stringify(this.dragData));
      // event.dataTransfer.setDragImage(new Image(), 0, 0);
    }

    this.renderer2.addClass(this.elementRef.nativeElement, 'dragging');
  }
}
