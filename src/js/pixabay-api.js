'use strict';

import axios from 'axios';

export async function getPhotos(q) {

  const BASE_URL = 'https://pixabay.com/api/?';
  const params = {
    key: '44040237-e4cc253c6c6f225197cba954d',
    q: q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  return axios.get(BASE_URL, {params});
}
