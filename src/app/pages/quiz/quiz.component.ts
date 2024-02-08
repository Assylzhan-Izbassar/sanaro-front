import { AfterViewInit, Component, OnInit } from '@angular/core';
import { quiz } from 'src/app/models/question.model';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit, AfterViewInit {
  selectedOption: number = -1;
  currentQuestion: number = 0;
  currentImgUrl: string = '';
  quiz: any = quiz;
  prevBtn?: Element;
  nextBtn?: Element;
  barItems?: HTMLCollectionOf<Element>;

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {
    this.currentImgUrl = this.quiz[this.currentQuestion].question.img_url;
  }

  ngAfterViewInit(): void {
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

    this.selectedOption = this.quiz[this.currentQuestion].question.selected;
  }

  /**
   * Handles selected option in quiz.
   * @param option - Option id that is selected.
   */
  onSelectOption(option: number): void {
    this.quiz[this.currentQuestion].question.selected = option;
    this.selectedOption = option;
  }

  /**
   * Switch to the next question.
   */
  next() {
    setTimeout(() => {
      if (this.quiz[this.currentQuestion].question.selected != -1) {
        if (this.currentQuestion == this.quiz.length - 1) {
          this.dialogService.closeDialog();
          setTimeout(() => {
            this.dialogService.openQuizEndDialog({}); // switching to the info collection form dialog.
          }, 100);
        }
        if (this.currentQuestion != this.quiz.length - 1) {
          this.currentQuestion++;
        }
        if (this.currentQuestion > 0) {
          this.prevBtn?.classList.remove('_hide');
        }
        this.selectedOption = this.quiz[this.currentQuestion].question.selected;

        this.barItems?.[this.currentQuestion - 1]!.classList.remove('_active');
        this.barItems?.[this.currentQuestion]!.classList.add('_active');

        this.currentImgUrl = this.quiz[this.currentQuestion].question.img_url;
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
        this.selectedOption = this.quiz[this.currentQuestion].question.selected;

        this.barItems?.[this.currentQuestion]!.classList.add('_active');
        this.barItems?.[this.currentQuestion + 1]!.classList.remove('_active');

        this.currentImgUrl = this.quiz[this.currentQuestion].question.img_url;
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
