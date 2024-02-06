import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastCallComponent } from './last-call.component';

describe('LastCallComponent', () => {
  let component: LastCallComponent;
  let fixture: ComponentFixture<LastCallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LastCallComponent]
    });
    fixture = TestBed.createComponent(LastCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
