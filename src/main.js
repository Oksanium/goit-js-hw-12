'use strict';

import { getPhotos } from './js/pixabay-api';
import { render } from './js/render-functions';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import errIcon from './img/cross-icon.svg';
import closeIcon from './img/cross.svg';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const loader = document.querySelector('.loader-wrapper');
const moreBtn = document.querySelector('.load-more');
moreBtn.addEventListener('click', loadMore);
const gallery = document.querySelector('.gallery');
const form = document.querySelector('.form');
form.addEventListener('submit', onSubmit);

let userQuery = '';
let page = 1;

function onSubmit(evt) {
  evt.preventDefault();
  gallery.innerHTML = '';
  hideElem(moreBtn);
  page = 1;
  userQuery = form.querySelector('input').value;
  if (userQuery === '') return;
  buildGallery();
}

async function buildGallery() {
  hideElem(moreBtn);
  showElem(loader);
  try {
    const { data } = await getPhotos(userQuery, page);
    if (data.hits.length === 0) {
      showRedToast();
    } else {
      gallery.insertAdjacentHTML('beforeend', render(data.hits));
      lightbox.refresh();
      if (data.totalHits > page * 15) {
        showElem(moreBtn);
      } else {
        showToastThatsIt();
      }
    }
  } catch (err) {
    showRedToast();
  }
  hideElem(loader);
}

async function loadMore() {
  const lastPic = document.querySelector('.gallery > li:last-child');
  const scrolDist = Math.ceil(lastPic.getBoundingClientRect().bottom);
  
  page += 1;
  await buildGallery();

  window.scrollBy({
    top: scrolDist,
    behavior: "smooth",
  });

}
function showElem(elem) {
  elem.setAttribute('style', 'display: flex;');
}
function hideElem(elem) {
  elem.setAttribute('style', 'display: none;');
}
function showToast(text, color, icon) {
  iziToast.show({
    title: text,
    backgroundColor: color,
    timeout: 5000,
    titleColor: '#fff',
    titleSize: '16px',
    iconUrl: icon,
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
function showRedToast() {
  const text = `Sorry, there are no images matching<br>your search query. Please, try again!`;
  const color = '#EF4040';
  const icon = errIcon;
  showToast(text, color, icon);
}
function showToastThatsIt() {
  const text = `No more photos found`;
  const color = '#FFA000';
  const icon = '';
  showToast(text, color, icon);
}