// testimonial.model.ts

export interface TestimonialData {
  id?: number;
  content: string;
  user_name: string;
  user_description: string;
  user_avatar: string;
}

export class Testimonial {
  private _id?: number;
  // getter and setter for id
  public get id(): number {
    return this._id ? this._id : -1;
  }
  public set id(value: number) {
    this._id = value;
  }

  private _text: string;
  // getter and setter for text
  public get text(): string {
    return this._text;
  }
  public set text(value: string) {
    this._text = value;
  }

  private _username: string;
  // getter and setter for username
  public get username(): string {
    return this._username;
  }
  public set username(value: string) {
    this._username = value;
  }

  private _userDescription: string;
  // getter and setter for _userDescription
  public get userDescription(): string {
    return this._userDescription;
  }
  public set userDescription(value: string) {
    this._userDescription = value;
  }

  private _avatarPath: string;
  // getter and setter for avatar
  public get avatar() {
    return this._avatarPath;
  }
  public set avatar(value: string) {
    this._avatarPath = value;
  }

  private static count = 0;

  constructor(data: TestimonialData) {
    if (!data.id) {
      this._id = Testimonial.count++;
    } else {
      this._id = data.id;
    }

    this._text = data.content;
    this._username = data.user_name;
    this._userDescription = data.user_description;

    if (!data.user_avatar) {
      this._avatarPath = `assets/testimonials/default-img.svg`;
    } else {
      this._avatarPath = data.user_avatar;
    }
  }
}

export const testimonials = [
  new Testimonial({
    content:
      'FitLine skin Activize Serum, это энергетический бум для моей кожи 🔥. Когда я его попробовала в первые, Я была в восторге, результат был заметен сразу 🤩.',
    user_name: 'Anastasiaaa',
    user_description: '',
    user_avatar: '',
  }),
  new Testimonial({
    content:
      'Продукция FitLine одна из самых лучших. Раньше я постоянно мучился от головной боли, но после приема продукта Aktivize, все боли как рукой сняло. Теперь не могу жить без него.',
    user_name: 'Ким Владимир',
    user_description: '',
    user_avatar: '',
  }),
  new Testimonial({
    content:
      'Принимаю ресторейт перед сном С каждым приемом сон становился лучше, спустя 6 дней заснула мгновенно и сон длился по норме 8 часов. Нервы успокоились за неделю',
    user_name: 'adina484',
    user_description: '',
    user_avatar: '',
  }),
];
