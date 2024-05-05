const APP_URL = 'https://tv.tiktok.com/webos';

export const startApp = () => {
  window.location.href = APP_URL;
};

const colorCodeMap = {
  403: 'red',
  404: 'green',
  172: 'green',
  405: 'yellow',
  170: 'yellow',
  406: 'blue',
  191: 'blue'
};

export const getKeyColor = (keyCode) => colorCodeMap[keyCode] ?? null;
