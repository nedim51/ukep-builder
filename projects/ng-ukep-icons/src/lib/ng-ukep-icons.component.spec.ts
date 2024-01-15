import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgUkepIconsComponent } from './ng-ukep-icons.component';

describe('NgUkepIconsComponent', () => {
  let component: NgUkepIconsComponent;
  let fixture: ComponentFixture<NgUkepIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgUkepIconsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgUkepIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
