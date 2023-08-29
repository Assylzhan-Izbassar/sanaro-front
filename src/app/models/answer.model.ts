// answer.model.ts

export interface AnswerData {
  id?: number;
  answer_text: string;
}

export class Answer {
  private _id?: number | undefined;
  // getter for _id
  public get id(): number | undefined {
    return this._id;
  }

  private _answer_text: string;
  // getter and setter for _answer_text
  public get answer_text(): string {
    return this._answer_text;
  }
  public set answer_text(value: string) {
    this._answer_text = value;
  }

  private static count = 0;

  constructor(data: AnswerData) {
    if (!data.id) {
      this._id = Answer.count++;
    } else {
      this._id = data.id;
    }
    this._answer_text = data.answer_text;
  }
}
