'use strict';

import { getPhotos } from './js/pixabay-api';
import { render } from './js/render-functions';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import errIcon from './img/cross-icon.svg';
import closeIcon from './img/cross.svg';

const modalOptions = {
  captionsData: 'alt',
  captionDelay: 250,
};
const lightbox = new SimpleLightbox('.gallery a', modalOptions);

const loader = document.querySelector('.loader-wrapper');

const gallery = document.querySelector('.gallery');

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmit);

async function onSubmit(evt) {
  evt.preventDefault();
  gallery.innerHTML = '';
  const userQuery = form.querySelector('input').value;
  if (userQuery === '') return;

  showLoader();
  try {
    const { data } = await getPhotos(userQuery);
    if (data.hits.length === 0) {
      console.log('in if');
      showRedToast();
    } else {
      gallery.innerHTML = render(data.hits);
      lightbox.refresh();
    }
  } catch (err) {
    console.log('in catch');
    showRedToast();
  }
  hideLoader();
}

function showRedToast() {
  iziToast.show({
    title: `Sorry, there are no images matching<br>your search query. Please, try again!`,
    backgroundColor: '#EF4040',
    timeout: 5000,
    titleColor: '#fff',
    titleSize: '16px',
    iconUrl: errIcon,
    buttons: [
      [
        `<button style="background: transparent; padding: 0; margin-left: 30px" width="20" height="20"><img src=${closeIcon}></button>`,
        function (instance, toast) {
          instance.hide(
            {
              transitionOut: 'fadeOutUp',
            },
            toast,
            'buttonName'
          );
        },
      ],
    ],
    close: false,
  });
}
function showLoader() {
  loader.setAttribute('style', 'display: flex;');
}
function hideLoader() {
  loader.setAttribute('style', 'display: none;');
}
