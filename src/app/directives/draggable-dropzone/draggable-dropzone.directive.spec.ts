import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DraggableDropzoneDirective } from './draggable-dropzone.directive';

@Component({
  template: `
    <div draggableDropzone (itemDropped)="onItemDropped($event)"></div>
  `,
})
class TestComponent {
  onItemDropped(item: any): void {
    console.log('On drop item:', item)
  }
}

describe('DraggableDropzoneDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let directiveElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DraggableDropzoneDirective, TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(DraggableDropzoneDirective));
  });

  it('should create an instance', () => {
    const directive = directiveElement.injector.get(DraggableDropzoneDirective);
    expect(directive).toBeTruthy();
  });

  it('should emit itemDropped event on drop', () => {
    const directive = directiveElement.injector.get(DraggableDropzoneDirective);
    spyOn(component, 'onItemDropped');

    const dropEvent = createDragEvent('drop');
    directive.onDrop(dropEvent);

    expect(component.onItemDropped).toHaveBeenCalledOnceWith(jasmine.any(Object));
  });

  it('should prevent default and stop propagation on dragover', () => {
    const directive = directiveElement.injector.get(DraggableDropzoneDirective);
    const dragOverEvent = createDragEvent('dragover');

    directive.onDragOver(dragOverEvent);

    expect(dragOverEvent.preventDefault).toHaveBeenCalled();
    expect(dragOverEvent.stopPropagation).toHaveBeenCalled();
  });

  it('should add/remove drag-over class on dragover/dragleave', () => {
    const hostElement = directiveElement.nativeElement;

    const dragOverEvent = createDragEvent('dragover');
    directiveElement.triggerEventHandler('dragover', dragOverEvent);
    fixture.detectChanges();

    expect(hostElement.classList).toContain('drag-over');

    const dragLeaveEvent = createDragEvent('dragleave');
    directiveElement.triggerEventHandler('dragleave', dragLeaveEvent);
    fixture.detectChanges();

    expect(hostElement.classList).not.toContain('drag-over');
  });

  // ......

  afterEach(() => {
    fixture.destroy();
  });
});

function createDragEvent(type: string): DragEvent {
  const event = document.createEvent('DragEvent');
  event.initEvent(type, true, true);
  spyOn(event, 'preventDefault');
  spyOn(event, 'stopPropagation');
  return event as DragEvent;
}