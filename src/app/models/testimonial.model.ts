// testimonial.model.ts

export class Testimonial {
  private _id: number;
  private _text: string;
  private _username: string;
  private _avatarPath: string;

  private static count = 0;

  constructor(text: string, username: string, avatarPath: string) {
    this._id = Testimonial.count;
    this._text = text;
    this._username = username;
    this._avatarPath = avatarPath;
    Testimonial.count++;
  }

  // getter for id
  public get id(): number {
    return this._id;
  }

  // getter and setter for text
  public get text(): string {
    return this._text;
  }
  public set text(value: string) {
    this._text = value;
  }

  // getter and setter for username
  public get username(): string {
    return this._username;
  }
  public set username(value: string) {
    this._username = value;
  }

  // getter and setter for avatar
  public get avatar() {
    return this._avatarPath;
  }
  public set avatar(value: string) {
    this._avatarPath = value;
  }
}
