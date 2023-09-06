import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallRequestDialogComponent } from './call-request-dialog.component';

describe('CallRequestDialogComponent', () => {
  let component: CallRequestDialogComponent;
  let fixture: ComponentFixture<CallRequestDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallRequestDialogComponent]
    });
    fixture = TestBed.createComponent(CallRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
