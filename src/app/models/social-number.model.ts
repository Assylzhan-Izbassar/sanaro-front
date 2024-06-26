// social-numbers.model.ts

export class SocialNumber {
  private _id: number;
  // getter for id
  public get id(): number {
    return this._id;
  }

  private _number: string;
  // getter and setter for number
  public get number(): string {
    return this._number;
  }
  public set number(value: string) {
    this._number = value;
  }

  private _desc: string;
  // getter and setter for desc
  public get desc(): string {
    return this._desc;
  }
  public set desc(value: string) {
    this._desc = value;
  }

  private static count: number = 0;

  constructor(number: string, desc: string) {
    this._id = SocialNumber.count;
    this._number = number;
    this._desc = desc;
    SocialNumber.count++;
  }
}

export const socialNumbers = [
  new SocialNumber('100К+', 'Преданных покупателей'),
  new SocialNumber('65+', 'Патентов'),
  new SocialNumber('30+', 'На мировом рынке'),
  new SocialNumber('350', 'Ученых в научном совете'),
];
