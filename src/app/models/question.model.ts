// Question.model.ts

export interface QuestionData {
  id?: number;
  question_text: string;
}

export class Question {
  private _id?: number | undefined;
  // getter for _id
  public get id(): number | undefined {
    return this._id;
  }

  private _question_text: string;
  // getter and setter for _question_text
  public get question_text(): string {
    return this._question_text;
  }
  public set question_text(value: string) {
    this._question_text = value;
  }

  private static count = 0;

  constructor(data: QuestionData) {
    if (!data.id) {
      this._id = Question.count++;
    } else {
      this._id = data.id;
    }
    this._question_text = data.question_text;
  }
}

export const quiz = [
  {
    question: {
      id: 0,
      text: 'Сколько раз в день вы обычно едите?',
      selected: -1,
      img_url: 'assets/quiz/quiz1.webp',
    },
    answers: [
      {
        id: 0,
        text: 'Один раз в день',
      },
      {
        id: 1,
        text: 'Два раза в день',
      },
      {
        id: 2,
        text: 'Три раза в день',
      },
      {
        id: 3,
        text: 'Больше трех раз в день',
      },
    ],
  },
  {
    question: {
      id: 1,
      text: 'Как часто в неделю вы употребляете фрукты и овощи?',
      selected: -1,
      img_url: 'assets/quiz/quiz2.jpg',
    },
    answers: [
      {
        id: 0,
        text: 'Реже одного раза в неделю',
      },
      {
        id: 1,
        text: '1-2 раза в неделю',
      },
      {
        id: 2,
        text: '3-4 раза в неделю',
      },
      {
        id: 3,
        text: 'Больше 4 раз в неделю',
      },
    ],
  },
  {
    question: {
      id: 2,
      text: 'Учитываете ли вы потребление сахара и жиров в вашем рационе?',
      selected: -1,
      img_url: 'assets/quiz/quiz3.jpeg',
    },
    answers: [
      {
        id: 0,
        text: 'Да, активно учитываю',
      },
      {
        id: 1,
        text: 'Иногда учитываю',
      },
      {
        id: 2,
        text: 'Редко учитываю',
      },
      {
        id: 3,
        text: 'Нет, не учитываю',
      },
    ],
  },
  {
    question: {
      id: 3,
      text: 'Предпочитаете ли вы готовить дома или чаще обращаетесь к готовым блюдам из ресторанов?',
      selected: -1,
      img_url: 'assets/quiz/quiz4-2.webp',
    },
    answers: [
      {
        id: 0,
        text: 'Предпочитаю готовить дома',
      },
      {
        id: 1,
        text: 'Чаще обращаюсь к готовым блюдам из ресторанов',
      },
      {
        id: 2,
        text: 'По возможности делаю и то, и другое',
      },
    ],
  },
  {
    question: {
      id: 4,
      text: 'Посещаете ли вы тренировки или занимаетесь физической активностью?',
      selected: -1,
      img_url: 'assets/quiz/quiz5.jpeg',
    },
    answers: [
      {
        id: 0,
        text: 'Регулярно посещаю тренировки',
      },
      {
        id: 1,
        text: 'Занимаюсь физической активностью время от времени',
      },
      {
        id: 2,
        text: 'Нет, не занимаюсь физической активностью',
      },
    ],
  },
];
