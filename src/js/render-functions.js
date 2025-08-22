import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loaderBox = document.querySelector('.loader-box');
const loadMoreBtn = document.querySelector('.pagination-button');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" class="gallery-image" loading="lazy"/>
        </a>
        <ul class="gallery-info">
          <li><span>Likes</span> ${likes}</li>
          <li><span>Views</span> ${views}</li>
          <li><span>Comments</span> ${comments}</li>
          <li><span>Downloads</span> ${downloads}</li>
        </ul>
      </li>`
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

function clearGallery() {
  galleryContainer.innerHTML = '';
}

function showLoader() {
  loaderBox.classList.remove('hidden');
}

function hideLoader() {
  loaderBox.classList.add('hidden');
}

function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hidden');
}

function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hidden');
}

export default {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
};
