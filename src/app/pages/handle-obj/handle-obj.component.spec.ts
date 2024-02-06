import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleObjComponent } from './handle-obj.component';

describe('HandleObjComponent', () => {
  let component: HandleObjComponent;
  let fixture: ComponentFixture<HandleObjComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HandleObjComponent]
    });
    fixture = TestBed.createComponent(HandleObjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
