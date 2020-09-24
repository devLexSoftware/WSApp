import { TestBed } from '@angular/core/testing';

import { ContratistasService } from './contratistas.service';

describe('ContratistasService', () => {
  let service: ContratistasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContratistasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
