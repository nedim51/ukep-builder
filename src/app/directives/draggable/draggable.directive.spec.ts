import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DraggableDirective } from './draggable.directive';

@Component({
  template: `
    <div appDraggable [dragData]="dragData"></div>
  `,
})
class TestComponent {
  dragData: any = { id: 1, name: 'Item 1' };
}

describe('DraggableDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let directiveElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DraggableDirective, TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(DraggableDirective));
  });

  it('should create an instance', () => {
    const directive = directiveElement.injector.get(DraggableDirective);
    expect(directive).toBeTruthy();
  });

  it('should set draggable attribute to true', () => {
    const hostElement = directiveElement.nativeElement;
    expect(hostElement.getAttribute('draggable')).toBe('true');
  });

  it('should set drag data on dragstart', () => {
    const directive = directiveElement.injector.get(DraggableDirective);
    const dragEvent = createDragEvent('dragstart');

    // spyOn(dragEvent.dataTransfer, 'setData'); // ???

    directive.onDragStart(dragEvent);

    expect(dragEvent.stopPropagation).toHaveBeenCalled();
    expect(dragEvent.dataTransfer?.setData).toHaveBeenCalledWith('text/plain', JSON.stringify(component.dragData));
  });

  it('should add dragging class on dragstart', () => {
    const hostElement = directiveElement.nativeElement;
    const dragEvent = createDragEvent('dragstart');

    directiveElement.triggerEventHandler('dragstart', dragEvent);
    fixture.detectChanges();

    expect(hostElement.classList).toContain('dragging');
  });

  // .....

  afterEach(() => {
    fixture.destroy();
  });
});

function createDragEvent(type: string): DragEvent {
  const event = document.createEvent('DragEvent');
  event.initEvent(type, true, true);
  spyOn(event, 'stopPropagation');
  // event.dataTransfer = jasmine.createSpyObj('DataTransfer', ['setData']); ???
  return event as DragEvent;
}