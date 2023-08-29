import { Component, OnInit } from '@angular/core';
import { Question } from '../models/question.model';
import { QuestionsService } from '../services/questions/questions.service';
import { AnswersService } from '../services/answers/answers.service';
import { Answer } from '../models/answer.model';

@Component({
  selector: 'app-questionnaire-dialog',
  templateUrl: './questionnaire-dialog.component.html',
  styleUrls: ['./questionnaire-dialog.component.css'],
})
export class QuestionnaireDialogComponent implements OnInit {
  currentQuestionIndex = 0;
  questions: Question[] = [];
  currentAnswers: Answer[] = [];

  constructor(
    private questionService: QuestionsService,
    private answerService: AnswersService
  ) {}

  ngOnInit() {
    this.fetchQuestions();
  }

  private fetchQuestions(): void {
    this.questionService.getQuestions().subscribe(
      (data) => {
        this.questions = data;
        console.log('Questions are fetched.');

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
          console.log('Answers are fetched.');
        },
        (error) => {
          console.log('Error fetching testimonials: ', error);
        }
      );
    }
  }
}
