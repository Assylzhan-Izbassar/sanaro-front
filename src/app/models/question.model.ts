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
