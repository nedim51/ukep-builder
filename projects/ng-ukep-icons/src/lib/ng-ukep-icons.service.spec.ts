import { TestBed } from '@angular/core/testing';

import { NgUkepIconsRegistry } from './ng-ukep-icons.service';

describe('NgUkepIconsService', () => {
  let service: NgUkepIconsRegistry;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgUkepIconsRegistry);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
