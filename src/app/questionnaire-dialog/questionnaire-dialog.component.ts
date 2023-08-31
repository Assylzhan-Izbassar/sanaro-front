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
import { Answer } from '../models/answer.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Question } from '../models/question.model';
import jwtDecode from 'jwt-decode';
import { v4 as uuidv4 } from 'uuid';

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
  currQuesIdx: number = 0;
  slideState: 'in' | 'middle' | 'out' = 'in';
  questions: Question[] = [];
  currentAnswers: Answer[] = [];
  responses: number[] = [];
  selectedOption: number = -1;
  continueBtn?: HTMLElement;
  isContBtnShow: boolean = false;

  constructor(
    private authService: AuthService,
    private questionService: QuestionsService,
    private quesResponseService: QuestionnaireResponseService,
    private answerService: AnswersService,
    private dialogService: DialogService,
    private elementRef: ElementRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.fetchQuestions();
  }

  /**
   * Handles selected option in questionnaire.
   * @param option - Option id that is selected.
   */
  onSelectOption(option: number): void {
    this.selectedOption = option;
    if (!this.continueBtn) {
      this.continueBtn = this.elementRef.nativeElement.querySelector(
        '.questionnaire__button'
      )!;
    }
    this.showContBtn(true);
  }

  /**
   * Handles the question after value is selected.
   */
  onAnswerSelected(): void {
    let currAnsIdx = this.selectedOption;
    this.responses.push(currAnsIdx);

    // Trigger the animation
    this.slideState = 'out';

    if (this.currQuesIdx === this.questions.length - 1) {
      // Getting user_id from jwt token
      if (this.authService.getToken()) {
        let token = this.authService.getToken();
        const decodedToken: any = jwtDecode(token!);

        const user_id: number = decodedToken.user_id;
        const newUuid = uuidv4();

        // Creating for each item question response
        this.responses.forEach((item) => {
          this.quesResponseService.postQuestionnaireResponse({
            questionnaire_uuid: newUuid,
            response: item,
            user: user_id,
          });
        });
        this.dialogService.closeDialog();
      }
    } else {
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
  private fetchQuestions(): void {
    this.questionService.getQuestions().subscribe(
      (data) => {
        this.questions = data;
        this.fetchAnswer(false);
      },
      (error) => {
        console.log('Error fetching testimonials: ', error);
      }
    );
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
    let idx = this.questions[this.currQuesIdx].id;
    if (idx) {
      this.answerService.getAnswers(idx).subscribe(
        (data) => {
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
        (error) => {
          console.log('Error fetching testimonials: ', error);
        }
      );
    }
  }
}
