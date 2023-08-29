// objection.model.ts

export class Objection {
  private _id: number;
  // getter for id
  public get id(): number {
    return this._id;
  }

  private _question: string;
  // getter and setter for question
  public get question(): string {
    return this._question;
  }
  public set question(value: string) {
    this._question = value;
  }

  private _answer: string;
  // getter and setter for answer
  public get answer(): string {
    return this._answer;
  }
  public set answer(value: string) {
    this._answer = value;
  }

  private _answerVisible: boolean = false;
  // getter and setter for answerVisible
  public get answerVisible(): boolean {
    return this._answerVisible;
  }
  public set answerVisible(value: boolean) {
    this._answerVisible = value;
  }

  private static count: number = 0;

  constructor(question: string, answer: string) {
    this._id = Objection.count;
    this._question = question;
    this._answer = answer;
    Objection.count++;
  }
}
