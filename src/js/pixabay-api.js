import axios from 'axios';

const API_KEY = '51864768-c4389465b0331a2f70f5d6290';
const BASE_URL = 'https://pixabay.com/api/';

async function getImagesByQuery(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}

export default {
  getImagesByQuery,
};
