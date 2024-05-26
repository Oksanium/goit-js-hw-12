'use strict';

export function getPhotos(q) {
  const BASE_URL = 'https://pixabay.com/api/?';
  const params = new URLSearchParams({
    key: '44040237-e4cc253c6c6f225197cba954d',
    q: q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  const URL = BASE_URL + params;
  return fetch(URL).then(res => {
    if (!res.ok) {
      console.log('!res.ok');
      throw new Error(res.status);
    }
    return res;
  });
  //   .then(res => { return res.json(); });
}
