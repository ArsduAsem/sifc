import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenBestSellersComponent } from './ten-best-sellers.component';

describe('TenBestSellersComponent', () => {
  let component: TenBestSellersComponent;
  let fixture: ComponentFixture<TenBestSellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenBestSellersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenBestSellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
