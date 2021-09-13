import { TestBed } from '@angular/core/testing';

import { DefaultLogFormatterService } from './default-log-formatter.service';

describe('DefaultLogFormatterService', () => {
  let service: DefaultLogFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultLogFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
