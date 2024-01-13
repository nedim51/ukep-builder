import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ResizableDirective } from './resizable.directive';

@Component({
  template: `
    <div resizable
         [minWidth]="minWidth"
         [minHeight]="minHeight"
         [maxWidth]="maxWidth"
         [maxHeight]="maxHeight"></div>
  `,
})
class TestComponent {
  minWidth: number = 50;
  minHeight: number = 50;
  maxWidth: number = 500;
  maxHeight: number = 500;
}

describe('ResizableDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let directive: ResizableDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResizableDirective, TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directive = fixture.debugElement.children[0].injector.get(ResizableDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should apply resizable class', () => {
    fixture.detectChanges();
    const hostElement = fixture.debugElement.children[0].nativeElement;
    expect(hostElement.classList).toContain('resizable');
  });

  it('should add resizable--hover class on mouseover', () => {
    const hostElement = fixture.debugElement.children[0].nativeElement;

    hostElement.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    fixture.detectChanges();

    expect(hostElement.classList).toContain('resizable--hover');
  });

  it('should remove resizable--hover class on mouseout', () => {
    const hostElement = fixture.debugElement.children[0].nativeElement;

    hostElement.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    fixture.detectChanges();

    hostElement.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
    fixture.detectChanges();

    expect(hostElement.classList).not.toContain('resizable--hover');
  });

  // ....

  afterEach(() => {
    fixture.destroy();
  });
});