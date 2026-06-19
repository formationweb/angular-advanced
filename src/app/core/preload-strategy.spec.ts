import { TestBed } from '@angular/core/testing';

import { PreloadStrategy } from './preload-strategy';

describe('PreloadStrategy', () => {
  let service: PreloadStrategy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreloadStrategy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
