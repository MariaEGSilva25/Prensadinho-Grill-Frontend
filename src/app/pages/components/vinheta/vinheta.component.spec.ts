import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinhetaComponent } from './vinheta.component';

describe('VinhetaComponent', () => {
  let component: VinhetaComponent;
  let fixture: ComponentFixture<VinhetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VinhetaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VinhetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
