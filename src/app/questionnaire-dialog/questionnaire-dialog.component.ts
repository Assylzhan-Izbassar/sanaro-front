import { Component, Inject, OnInit, ElementRef } from '@angular/core';
import { Question } from '../models/question.model';
import { QuestionsService } from '../services/questions/questions.service';
import { AnswersService } from '../services/answers/answers.service';
import { Answer } from '../models/answer.model';
// import { trigger, state, style, transition, animate } from '@angular/animations';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-questionnaire-dialog',
  templateUrl: './questionnaire-dialog.component.html',
  styleUrls: ['./questionnaire-dialog.component.css'],
  // animations: [
  //   trigger('slideInOut', [
  //     state('in', style({ transform: 'translateX(0)'})),
  //     transition(':enter', [
  //       style({ transform: 'translateX(100%)'}),
  //       animate('300ms ease-in')
  //     ]),
  //     transition(':leave', [
  //       animate('300ms ease-in', style({ transform: 'translateX(-100%)'}))
  //     ])
  //   ])
  // ],
})
export class QuestionnaireDialogComponent implements OnInit {
  currentQuestionIndex = 0;
  // slideState = 'in'
  questions: Question[] = [];
  currentAnswers: Answer[] = [];
  selectedOption: number = -1;
  continueBtn?: HTMLElement;
  isContBtnShow: boolean = false;

  constructor(
    private questionService: QuestionsService,
    private answerService: AnswersService,
    private elementRef: ElementRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.fetchQuestions();
  }

  onAnswerSelected() {
    this.currentQuestionIndex++;
    this.currentQuestionIndex %= this.questions.length;
    this.fetchAnswer();
    this.showContBtn(false);
  }

  onSelectOption(option: number): void {
    this.selectedOption = option;
    if (!this.continueBtn) {
      this.continueBtn = this.elementRef.nativeElement.querySelector('.questionnaire__button')!;
    }
    this.showContBtn(true);
  }

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

  private fetchQuestions(): void {
    this.questionService.getQuestions().subscribe(
      (data) => {
        this.questions = data;
        // console.log('Questions are fetched.');
        this.fetchAnswer();
      },
      (error) => {
        console.log('Error fetching testimonials: ', error);
      }
    );
  }

  private fetchAnswer(): void {
    let idx = this.questions[this.currentQuestionIndex].id;
    if (idx) {
      this.answerService.getAnswers(idx).subscribe(
        (data) => {
          this.currentAnswers = data;
          // console.log('Answers are fetched.');
        },
        (error) => {
          console.log('Error fetching testimonials: ', error);
        }
      );
    }
  }
}
