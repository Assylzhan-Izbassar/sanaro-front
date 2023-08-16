// social-numbers.model.ts

export class SocialNumber {
  private id: number;
  private number: string;
  private desc: string;

  private static count: number = 0;

  constructor(number: string, desc: string) {
    this.id = SocialNumber.count;
    this.number = number;
    this.desc = desc;
    SocialNumber.count++;
  }

  //   getter for id
  getId(): number {
    return this.id;
  }

  // setter and getter for the number
  setNumber(number: string) {
    this.number = number;
  }

  getNumber(): string {
    return this.number;
  }

  // setter and getter for the desc
  setDesc(desc: string) {
    this.desc = desc;
  }

  getDesc(): string {
    return this.desc;
  }
}
