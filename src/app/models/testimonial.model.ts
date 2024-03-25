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
    content: `Почему я стала пить эту пищевую добавку?
У меня был постоянный упадок сил.
Витамины и прочие средства давали мало эффекта.
Поэтому когда мне предложили этот витаминный комплекс, я решила попробовать.
Я принимаю этот витаминный комплекс уже несколько месяцев, курсами. Постепенно стала добавлять и другие продукты этой марки.

Прежде всего, у меня появилась энергия и нет весеннего упадка сил. Улучшилось состояние кожи и волос. И главное - зима пришла без затяжных болезней.
      `,
    user_name: 'ялюблюлебяжизнь',
    user_description: 'https://otzovik.com/review_9705725.html',
    user_avatar: '',
  }),
  new Testimonial({
    content: `
      Биологически активная добавка FitLine activize oxyplus - Активайз вытащил меня из лап ковида
      Итак о результатах спустя 1,5 месяца:
      ... заметила, что я стала гораздо лучше дышать, и всё реже меня стали осуждать приступы кашля. Не стало тяжелого состояния в грудной клетке
      Я продолжаю принимать этот порошок, потому что вижу результаты для себя, и не нашла для себя никаких негативных моментов. Буду очень рада, если вы поделитесь своими ощущениями от приема порошка, а также буду Рада тому, если этот отзыв будет для вас чем-то полезен.
      `,
    user_name: 'svetanarakete',
    user_description: 'https://otzovik.com/review_13291907.html',
    user_avatar: '',
  }),
  new Testimonial({
    content: `...В свою очередь готов вам оплатить любые витамины из аптеки,
    которые вы также съедите за 2 раза, вместо двух-трех месяцев использования.
    Думаю вряд ли кто рискнет на такой эксперимент, но если кто готов,
    то аптечные витамины лучше всего пить рядом с больницей, чтобы сразу можно было обратиться за помощью.
    Гипервитаминоз страшная сила и если вовремя не успеть, можно и кони двинуть. На счет Activize Oxyplus можно даже не беспокоиться. Примерно 60 минут лицо будет ярко красного цвета, будет присутствовать легкое покалывание на коже и дорогая моча.
    Это касается не только Activize, но и любого другого продукта компании.`,
    user_name: 'Dastine',
    user_description: 'https://otzovik.com/review_10482408.html',
    user_avatar: '',
  }),
];
