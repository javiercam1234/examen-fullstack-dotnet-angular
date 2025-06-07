import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaModalComponent } from './persona-modal.component';

describe('PersonaModalComponent', () => {
  let component: PersonaModalComponent;
  let fixture: ComponentFixture<PersonaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonaModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
