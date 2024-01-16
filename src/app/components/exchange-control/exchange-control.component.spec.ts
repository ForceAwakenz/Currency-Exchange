import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeControlComponent } from './exchange-control.component';

describe('ExchangeControlComponent', () => {
  let component: ExchangeControlComponent;
  let fixture: ComponentFixture<ExchangeControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchangeControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExchangeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
