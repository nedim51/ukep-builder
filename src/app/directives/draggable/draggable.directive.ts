import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDraggable]',
  standalone: true
})
export class DraggableDirective {
  
  @Input() 
  dragData: any;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'draggable', 'true');
  }

  @HostListener('dragstart', ['$event']) onDragStart(event: DragEvent) {
    event.stopPropagation()
    
    if(event.dataTransfer) {
      event.dataTransfer?.setData('text/plain', JSON.stringify(this.dragData));
    }

    this.renderer.addClass(this.elementRef.nativeElement, 'dragging');
  }
}
