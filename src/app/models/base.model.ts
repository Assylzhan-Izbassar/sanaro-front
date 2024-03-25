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
    lastCall: {
      header: 'Свяжитесь с нами',
      subheader: 'Позвоните нам, чтобы мы cмогли забронировать скидку!',
    },
  },
  pc: {
    lastCall: {
      header: 'Заказать звонок менеджеру',
      subheader:
        'Закажите обратный звонок, чтобы забронировать скидку!',
    },
  },
};
