import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Lab2Component } from './lab1.component';

describe('Lab1Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        Lab2Component
      ],
    }).compileComponents();
  });
});
