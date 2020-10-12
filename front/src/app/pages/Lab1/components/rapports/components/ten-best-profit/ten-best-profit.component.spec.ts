import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenBestProfitComponent } from './ten-best-profit.component';

describe('TenBestProfitComponent', () => {
  let component: TenBestProfitComponent;
  let fixture: ComponentFixture<TenBestProfitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenBestProfitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenBestProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
