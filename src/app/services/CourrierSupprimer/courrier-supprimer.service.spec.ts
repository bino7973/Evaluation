import { TestBed } from '@angular/core/testing';

import { CourrierSupprimerService } from './courrier-supprimer.service';

describe('CourrierSupprimerService', () => {
  let service: CourrierSupprimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourrierSupprimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
