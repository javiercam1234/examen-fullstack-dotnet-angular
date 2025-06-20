import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalDialogComponent } from './global-dialog.component';

describe('GlobalDialogComponent', () => {
  let component: GlobalDialogComponent;
  let fixture: ComponentFixture<GlobalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
