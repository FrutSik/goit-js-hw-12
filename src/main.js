import api from './js/pixabay-api.js';
import ui from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.querySelector("input[name='search-text']");
const loadMoreBtn = document.querySelector('.pagination-button');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();
  currentQuery = input.value.trim();
  currentPage = 1;

  if (!currentQuery) {
    iziToast.warning({
      title: 'Input required',
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  ui.clearGallery();
  ui.hideLoadMoreButton();
  ui.showLoader();

  try {
    const data = await api.getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (!data.hits.length) {
      iziToast.error({
        title: 'No Results',
        message: 'Sorry, there are no images matching your search query.',
        position: 'topRight',
      });
      return;
    }

    ui.createGallery(data.hits);

    if (totalHits > data.hits.length) {
      ui.showLoadMoreButton();
    } else {
      iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error(error);
  } finally {
    ui.hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  ui.hideLoadMoreButton();
  ui.showLoader();

  try {
    const data = await api.getImagesByQuery(currentQuery, currentPage);
    ui.createGallery(data.hits);

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (currentPage * 15 < totalHits) {
      ui.showLoadMoreButton();
    } else {
      iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images. Please try again later.',
      position: 'topRight',
    });
  } finally {
    ui.hideLoader();
  }
});
