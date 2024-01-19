import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridRootComponent } from './grid-root.component';

describe('GridRootComponent', () => {
  let component: GridRootComponent;
  let fixture: ComponentFixture<GridRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridRootComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
