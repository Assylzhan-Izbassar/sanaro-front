import { Component, Inject, OnInit, ElementRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { DialogService } from '../services/dialog/dialog.service';
import { QuestionsService } from '../services/questions/questions.service';
import { AnswersService } from '../services/answers/answers.service';
import { AuthService } from '../services/auth/auth.service';
import { QuestionnaireResponseService } from '../services/questionnaire-response/questionnaire-response.service';
import { QuestionnaireResponseData } from '../models/questionnaire-response.model';
import { Question } from '../models/question.model';
import { Answer } from '../models/answer.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';
import { DIRECTORY } from '../models/directory.model';

@Component({
  selector: 'app-questionnaire-dialog',
  templateUrl: './questionnaire-dialog.component.html',
  styleUrls: ['./questionnaire-dialog.component.css'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translateX(0)',
        })
      ),
      state(
        'middle',
        style({
          transform: 'translateX(100%)',
        })
      ),
      state(
        'out',
        style({
          transform: 'translateX(-100%)',
        })
      ),
      transition('in => out', animate('500ms ease-in-out')),
      transition('middle => in', animate('500ms ease-in-out')),
    ]),
  ],
})
export class QuestionnaireDialogComponent implements OnInit {
  uuid = uuidv4();

  currQuesIdx: number = 0;
  selectedOption: number = -1;
  isContBtnShow: boolean = false;
  slideState: 'in' | 'middle' | 'out' = 'in';
  continueBtn?: HTMLElement;
  questions: Question[] | undefined = [];
  currentAnswers: Answer[] = [];
  responses: QuestionnaireResponseData[] = [];

  dataIsLoaded: boolean = false;

  constructor(
    private authService: AuthService,
    private questionService: QuestionsService,
    private quesResponseService: QuestionnaireResponseService,
    private answerService: AnswersService,
    private dialogService: DialogService,
    private elementRef: ElementRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  /**
   * Initiates the questionnaire component.
   */
  ngOnInit() {
    this.fetchQuestions();

    setTimeout(() => {
      if (!this.questions!.length) {
        this.dialogService.closeDialog();
        setTimeout(() => {
          this.dialogService.openNotifyDialog(
            true,
            DIRECTORY.error_loading_questions
          );
        }, 500);
      }
    }, 500);
  }

  /**
   * Handles selected option in questionnaire.
   * @param option - Option id that is selected.
   */
  onSelectOption(option: number): void {
    this.selectedOption = option;
    if (!this.continueBtn) {
      this.continueBtn = this.elementRef.nativeElement.querySelector(
        '.dialog__btn_questionnaire'
      )!;
    }
    this.showContBtn(true);
  }

  /**
   * Handles the question after value is selected.
   */
  async onAnswerSelected(): Promise<void> {
    let currAnsIdx = this.selectedOption;

    this.responses.push({
      questionnaire_uuid: this.uuid,
      response: currAnsIdx,
    });

    if (this.currQuesIdx === this.questions!.length - 1) {
      this.quesResponseService.data = this.responses;
      this.dialogService.closeDialog();

      setTimeout(() => {
        this.dialogService.openGreetingDialog({ currIndex: 2 }); // current index represents conf. of auth
      }, 500);
    } else {
      // Trigger the animation
      this.slideState = 'out';
      this.currQuesIdx++;
      this.fetchAnswer(true);
    }
    this.showContBtn(false);
  }

  /**
   * Shows or hides continue button.
   * @param value - Value for showing the continue button or not.
   */
  private showContBtn(value: boolean) {
    if (this.continueBtn) {
      if (value) {
        this.continueBtn.style.display = 'block';
        this.isContBtnShow = true;
      } else {
        this.continueBtn.style.display = 'none';
        this.isContBtnShow = false;
      }
    }
  }

  /**
   * Fetches the questions from database.
   */
  private async fetchQuestions(): Promise<void> {
    try {
      this.questions = await this.questionService.getQuestions().toPromise();
      if (this.questions) {
        this.fetchAnswer(false);
        this.dataIsLoaded = true;
      }
    } catch (error) {
      console.log('Error fetching testimonials: ', error);
    }
  }

  /**
   * Fetches the answers for current question from database.
   */
  private fetchAnswer(isAnsSelected: boolean): void {
    if (isAnsSelected) {
      setTimeout(() => {
        // Trigger the animation
        this.slideState = 'middle';
      }, 500);
    }
    if (this.questions) {
      let idx = this.questions[this.currQuesIdx].id;
      if (idx) {
        this.answerService.getAnswers(idx).subscribe({
          next: (data) => {
            if (isAnsSelected) {
              setTimeout(() => {
                // Trigger the animation
                this.slideState = 'in';
                this.currentAnswers = data;
              }, 500);
            } else {
              this.currentAnswers = data;
            }
          },
          error: (e) => console.log('Error fetching testimonials: ', e),
        });
      }
    }
  }
}
