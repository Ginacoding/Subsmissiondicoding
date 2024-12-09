import RestaurantApiSource from '../../data/RestaurantApiSource';
import { TemplateCreator } from '../template/template-creator';

const Home = {
  async render() {
    return `
      <section class="jumbroton-wrapper">
        <div class="image-wrapper">
          <picture>
            <source srcset="./images/heros/hero-image_2-small.jpg" media="(max-width: 600px)">
            <source srcset="./images/heros/hero-image_2-large.jpg" media="(min-width: 601px)">
            <img src="./images/heros/hero-image_2-large.jpg" width="450" alt="FoodMap Bandung Hero Image" />
          </picture>
          <h1 class="font-bold">Welcome To FoodMap Bandung</h1>
        </div>
      </section>
      <section id="restaurant-list">
        <h2 class="font-semibold">Kunjungi FoodMap Bandung Dengan Daftar Restoran Kami</h2>
        <loader-element></loader-element>
        <div id="card-list" class="card-container"></div>
      </section>
     `;
  },

  async afterRender() {
    const restaurants = document.querySelector('#card-list');
    const loaderElement = document.querySelector('loader-element');

    const response = await RestaurantApiSource.getRestaurantList();

    loaderElement.classList.add('hidden');

    response.forEach((restaurant) => {
      restaurants.innerHTML += TemplateCreator.RestaurantItem(restaurant);
    });
  },
};

export default Home;
