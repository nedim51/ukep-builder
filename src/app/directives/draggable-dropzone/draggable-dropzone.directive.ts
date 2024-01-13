import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[draggableDropzone]',
  standalone: true
})
export class DraggableDropzoneDirective {

  @Output() 
  itemDropped: EventEmitter<any> = new EventEmitter<any>();

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'dropzone', 'true');
    this.preventAndStopEvents();
  }

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.renderer.addClass(this.elementRef.nativeElement, 'drag-over');
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.renderer.removeClass(this.elementRef.nativeElement, 'drag-over');
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.renderer.removeClass(this.elementRef.nativeElement, 'drag-over');

    if(event.dataTransfer) {
      const droppedItem = JSON.parse(event.dataTransfer.getData('text/plain') || '');

      if (droppedItem) {
        this.itemDropped.emit(droppedItem);
      }
    }
  }

  private preventAndStopEvents() {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.elementRef.nativeElement.addEventListener(eventName, (event: Event) => {
        event.preventDefault();
        event.stopPropagation();
      });
    });
  }
}