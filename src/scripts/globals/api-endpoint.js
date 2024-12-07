import CONFIG from './config';

const API_ENDPOINT = {
  // eslint-disable-next-line camelcase
  resturant_list: `${CONFIG.BASE_URL}/list`,
  // eslint-disable-next-line camelcase
  restaurant_detail: `${CONFIG.BASE_URL}/detail/`,
  // eslint-disable-next-line camelcase
  add_comment: `${CONFIG.BASE_URL}/review`,
};

export default API_ENDPOINT;
