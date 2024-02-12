// greeting.model.ts

export interface GreetingData {
  id?: number;
  title: string;
  infoTxt: string;
  buttonTxt: string;
}

export class Greeting {
  private _id?: number | undefined;
  public get id(): number | undefined {
    return this._id;
  }
  public set id(value: number | undefined) {
    this._id = value;
  }

  private _title: string;
  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }

  private _infoTxt: string;
  public get infoTxt(): string {
    return this._infoTxt;
  }
  public set infoTxt(value: string) {
    this._infoTxt = value;
  }

  private _buttonTxt: string;
  public get buttonTxt(): string {
    return this._buttonTxt;
  }
  public set buttonTxt(value: string) {
    this._buttonTxt = value;
  }

  private static cnt: number = 0;

  constructor(data: GreetingData) {
    if (data.id) {
      this._id = data.id;
    } else {
      this._id = Greeting.cnt++;
    }
    this._title = data.title;
    this._infoTxt = data.infoTxt;
    this._buttonTxt = data.buttonTxt;
  }
}

export const GREETING_DATA: Greeting[] = [
  new Greeting({
    title: 'Приветствуем Вас!',
    infoTxt: 'Готовы пройти опросник и получить бесплатные образцы?',
    buttonTxt: 'Давайте',
  }),
  new Greeting({
    title: 'Отлично! Давайте приступим к квизу',
    infoTxt:
      'Мы предлагаем пройти пять вопросов, чтобы лучше понять вашу ситуацию. По завершении опроса будет доступна форма для заполнения контактных данных. Мы свяжемся с вами для отправки пробников.',
    buttonTxt: 'Хорошо',
  }),
];
