import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireDialogComponent } from './questionnaire-dialog.component';

describe('QuestionnaireDialogComponent', () => {
  let component: QuestionnaireDialogComponent;
  let fixture: ComponentFixture<QuestionnaireDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionnaireDialogComponent]
    });
    fixture = TestBed.createComponent(QuestionnaireDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
