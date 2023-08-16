// testimonial.model.ts

export class Testimonial {
  private id: number;
  private text: string;
  private username: string;
  private avatarPath: string;

  private static count = 0;

  constructor(text: string, username: string, avatarPath: string) {
    this.id = Testimonial.count;
    this.text = text;
    this.username = username;
    this.avatarPath = avatarPath;
    Testimonial.count++;
  }

  // getter for id
  getId(): number {
    return this.id;
  }

  //   setter and getter for text
  setText(text: string) {
    this.text = text;
  }

  getText(): string {
    return this.text;
  }

  //   setter and getter for username
  setUsername(username: string) {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }

  //   setter and getter for avatarPath
  setAvatarPath(avatarPath: string) {
    this.avatarPath = avatarPath;
  }

  getAvatarPath(): string {
    return this.avatarPath;
  }
}
