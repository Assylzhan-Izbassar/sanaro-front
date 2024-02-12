export const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return (
      navigator.userAgent.match(/IEMobile/i) ||
      navigator.userAgent.match(/WPDesktop/i)
    );
  },
  any: function () {
    return (
      this.Android() ||
      this.BlackBerry() ||
      this.iOS() ||
      this.Opera() ||
      this.Windows()
    );
  },
};

export const phoneNumber: string = '87010130895';

export const landingContent = {
  mobile: {
    hero: {
      header: 'Утренний заряд вкусного коктейля для сбалансированного питания',
      subheader1: 'Позвоните нам и получите 2 образца продукции за 0 тенге.',
      subheader2: 'Мы выделили 30 бесплатных образцов. На данный момент осталось всего 16',
      action: 'Получить образцы бесплатно',
    },
    lastCall: {
      header: 'Свяжитесь с нами',
      subheader:
        'Позвоните нам, чтобы мы могли лучше понять Вашу ситуацию и предложить подходящее решение',
    },
  },
  pc: {
    lastCall: {
      header: 'Давайте с Вами свяжемся?',
      subheader:
        'Закажите обратный звонок, чтобы назначить точное время ZOOM встречи для решения именно Вашей ситуации',
    },
  },
};
