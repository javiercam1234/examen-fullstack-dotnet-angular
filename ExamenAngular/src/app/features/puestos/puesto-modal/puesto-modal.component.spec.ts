import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuestoModalComponent } from './puesto-modal.component';

describe('PuestoModalComponent', () => {
  let component: PuestoModalComponent;
  let fixture: ComponentFixture<PuestoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuestoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuestoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
