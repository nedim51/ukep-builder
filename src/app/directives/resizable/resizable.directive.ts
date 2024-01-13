import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Renderer2, Input, OnDestroy, Optional, Inject, HostBinding, Output, EventEmitter } from '@angular/core';
import { IResize } from './resize.interface';

const CORNER_SIZE = 3; // px

interface ICoords {
  x: number;
  y: number;
}

const INITIAL_COORDS: ICoords = {
  x: 0,
  y: 0
}

@Directive({
  selector: '[resizable]',
  standalone: true, 
})
export class ResizableDirective implements OnDestroy {

  private resizing = false;

  private initialMouse: ICoords = INITIAL_COORDS
  private initialBlock: ICoords = INITIAL_COORDS

  @Input() 
  minWidth: number = 50;

  @Input() 
  minHeight: number = 50;

  @Input() 
  maxWidth: number = 500;

  @Input() 
  maxHeight: number = 500;

  /**
   * Можно было сделать здесь через debounceTime, завести Subject все дела,
   * но я не захотел мешать логику)
   */
  @Output()
  resize: EventEmitter<IResize> = new EventEmitter();
  
  constructor(
    @Optional() @Inject(DOCUMENT) private document: Document,
    private el: ElementRef, 
    private renderer: Renderer2) {}


  @HostBinding('class.resizable') resizable: boolean = true;

  @HostListener('mouseover', ['$event'])
  onMouseOver(event: MouseEvent): void {
    const isCursorOnCorner = (
      event.offsetX > this.el.nativeElement.offsetWidth - CORNER_SIZE &&
      event.offsetY > this.el.nativeElement.offsetHeight - CORNER_SIZE
    );

    if (isCursorOnCorner) {
      this.renderer.addClass(this.el.nativeElement, 'resizable--hover');
    }
    else {
      this.renderer.removeClass(this.el.nativeElement, 'resizable--hover');
    }
  }

  @HostListener('mouseout', ['$event'])
  onMouseOut(event: MouseEvent): void {
    this.renderer.removeClass(this.el.nativeElement, 'resizable--hover');
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    const isCursorOnCorner = (
      event.clientX > this.el.nativeElement.clientWidth - CORNER_SIZE &&
      event.clientY > this.el.nativeElement.clientHeight - CORNER_SIZE
    );

    if (isCursorOnCorner) {
      this.resizing = true;

      this.initialMouse = {
        x: event.clientX,
        y: event.clientY,
      }

      this.initialBlock = {
        x: this.el.nativeElement.clientWidth,
        y: this.el.nativeElement.clientHeight
      }

      this.renderer.addClass(this.el.nativeElement, 'resizable--active');

      this.renderer.listen('document', 'mousemove', this.onMouseMove.bind(this));
      this.renderer.listen('document', 'mouseup', this.onMouseUp.bind(this));
    }
  }

  onMouseMove(event: MouseEvent): void {
    if (this.resizing) {
      const deltaX = (event.clientX - this.initialMouse.x) * 2;
      const deltaY = event.clientY - this.initialMouse.y;

      const newWidth = Math.max(Math.min(this.initialBlock.x + deltaX, this.maxWidth), this.minWidth);
      const newHeight = Math.max(Math.min(this.initialBlock.y + deltaY, this.maxHeight), this.minHeight);

      this.renderer.setStyle(this.el.nativeElement, 'width', `${newWidth}px`);
      this.renderer.setStyle(this.el.nativeElement, 'height', `${newHeight}px`);

      this.resize.emit({ width: newWidth, height: newHeight });
    }
  }

  onMouseUp(): void {
    if (this.resizing) {
      this.resizing = false;

      this.renderer.removeClass(this.el.nativeElement, 'resizable--active');

      this.document.removeEventListener('mousemove', this.onMouseMove.bind(this));
      this.document.removeEventListener('mouseup', this.onMouseUp.bind(this));
    }
  }

  ngOnDestroy(): void {
    this.onMouseUp();
  }
}