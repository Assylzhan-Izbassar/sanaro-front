// social-numbers.model.ts

export class SocialNumber {
  private _id: number;
  private _number: string;
  private _desc: string;
  private static count: number = 0;

  constructor(number: string, desc: string) {
    this._id = SocialNumber.count;
    this._number = number;
    this._desc = desc;
    SocialNumber.count++;
  }

  //   getter for id
  public get id(): number {
    return this._id;
  }

  // getter and setter for number
  public get number(): string {
    return this._number;
  }
  public set number(value: string) {
    this._number = value;
  }

  // getter and setter for desc
  public get desc(): string {
    return this._desc;
  }
  public set desc(value: string) {
    this._desc = value;
  }
}
