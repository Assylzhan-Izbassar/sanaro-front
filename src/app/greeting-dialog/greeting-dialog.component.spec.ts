import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetingDialogComponent } from './greeting-dialog.component';

describe('GreetingDialogComponent', () => {
  let component: GreetingDialogComponent;
  let fixture: ComponentFixture<GreetingDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GreetingDialogComponent]
    });
    fixture = TestBed.createComponent(GreetingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
