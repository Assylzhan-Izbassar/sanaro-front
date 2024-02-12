import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { WaitingService } from 'src/app/services/core/waiting.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { QuestionsService } from 'src/app/services/questions/questions.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit, AfterViewInit {
  selectedOption: number = -1;
  currentQuestion: number = 0;
  currentImgUrl: string = '';
  quiz: any;
  prevBtn?: Element;
  nextBtn?: Element;
  barItems?: HTMLCollectionOf<Element>;

  constructor(
    private dialogService: DialogService,
    private questionsService: QuestionsService,
    private waitingService: WaitingService
  ) {}

  async ngOnInit(): Promise<void> {
    console.log('here 1');
    await this.fetchData();
    console.log('here 2');
    this.currentImgUrl = this.quiz[this.currentQuestion].img_url;
    this.selectedOption = this.quiz[this.currentQuestion].selected;
    console.log('here 3');
  }

  ngAfterViewInit(): void {
    console.log('ng after 1');
    setTimeout(() => {
      this.prevBtn = document.getElementsByClassName(
        'quiz__btn_prev'
      )[0] as Element;
      this.prevBtn.classList.add('_hide');

      this.nextBtn = document.getElementsByClassName(
        'quiz__btn_next'
      )[0] as Element;

      this.barItems = document.getElementsByClassName('bar__item');
      const firstBarItem = this.barItems[this.currentQuestion];
      firstBarItem.classList.add('_active');
    }, 500);
    console.log('ng after 2');
  }

  async fetchData() {
    console.log('fetch 1');
    const p = this.questionsService.getQuestions();
    this.quiz = await this.waitingService.waitFor(p);
    console.log('fetch 2');
  }

  /**
   * Handles selected option in quiz.
   * @param option - Option id that is selected.
   */
  onSelectOption(option: number): void {
    this.quiz[this.currentQuestion].selected = option;
    this.selectedOption = option;
  }

  /**
   * Switch to the next question.
   */
  next() {
    setTimeout(() => {
      if (this.quiz[this.currentQuestion].selected != -1) {
        if (this.currentQuestion == this.quiz.length - 1) {
          this.dialogService.closeDialog();
          setTimeout(() => {
            this.dialogService.openQuizEndDialog({ data: this.quiz }); // switching to the info collection form dialog.
          }, 100);
        }
        if (this.currentQuestion != this.quiz.length - 1) {
          this.currentQuestion++;
        }
        if (this.currentQuestion > 0) {
          this.prevBtn?.classList.remove('_hide');
        }
        this.selectedOption = this.quiz[this.currentQuestion].selected;

        this.barItems?.[this.currentQuestion - 1]!.classList.remove('_active');
        this.barItems?.[this.currentQuestion]!.classList.add('_active');

        this.currentImgUrl = this.quiz[this.currentQuestion].img_url;
      }
    }, 100);
  }

  /**
   * Switch to the previous question.
   */
  prev() {
    setTimeout(() => {
      if (this.currentQuestion > 0) {
        this.currentQuestion--;
        this.selectedOption = this.quiz[this.currentQuestion].selected;

        this.barItems?.[this.currentQuestion]!.classList.add('_active');
        this.barItems?.[this.currentQuestion + 1]!.classList.remove('_active');

        this.currentImgUrl = this.quiz[this.currentQuestion].img_url;
      }

      if (this.currentQuestion < this.quiz.length - 1) {
        this.nextBtn?.classList.remove('_hide');
      }
      if (this.currentQuestion == 0) {
        this.prevBtn?.classList.add('_hide');
      }
    }, 100);
  }
}
