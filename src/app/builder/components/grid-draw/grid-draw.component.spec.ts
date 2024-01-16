import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDrawComponent } from './grid-draw.component';

describe('GridDrawComponent', () => {
  let component: GridDrawComponent;
  let fixture: ComponentFixture<GridDrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridDrawComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
