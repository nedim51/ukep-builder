import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridSwitcherComponent } from './grid-switcher.component';

describe('GridSwitcherComponent', () => {
  let component: GridSwitcherComponent;
  let fixture: ComponentFixture<GridSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridSwitcherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
