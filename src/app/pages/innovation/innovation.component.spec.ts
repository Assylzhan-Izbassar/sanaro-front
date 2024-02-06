import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovationComponent } from './innovation.component';

describe('InnovationComponent', () => {
  let component: InnovationComponent;
  let fixture: ComponentFixture<InnovationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InnovationComponent],
    });
    fixture = TestBed.createComponent(InnovationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
