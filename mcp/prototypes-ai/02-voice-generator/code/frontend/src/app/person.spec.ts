import { TestBed } from '@angular/core/testing';
import { Person } from './person';
import { provideHttpClient } from '@angular/common/http';

describe('Person', () => {
  let service: Person;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        Person,
      ],
    });
    service = TestBed.inject(Person);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
