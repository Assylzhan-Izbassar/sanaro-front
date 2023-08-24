// objection.model.ts

export class Objection {
  private _id: number;
  private _question: string;
  private _answer: string;
  private static count: number = 0;

  constructor(question: string, answer: string) {
    this._id = Objection.count;
    this._question = question;
    this._answer = answer;
    Objection.count++;
  }

  // getter for id
  public get id(): number {
    return this._id;
  }

  // getter and setter for question
  public get question(): string {
    return this._question;
  }
  public set question(value: string) {
    this._question = value;
  }

  // getter and setter for answer
  public get answer(): string {
    return this._answer;
  }
  public set answer(value: string) {
    this._answer = value;
  }
}
