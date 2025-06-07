import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuestosListComponent } from './puestos-list.component';

describe('PuestosListComponent', () => {
  let component: PuestosListComponent;
  let fixture: ComponentFixture<PuestosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuestosListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuestosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
