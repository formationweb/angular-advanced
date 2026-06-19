import { TestBed } from '@angular/core/testing';

import { FormFactory } from './form-factory';

describe('FormFactory', () => {
  let service: FormFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormFactory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
