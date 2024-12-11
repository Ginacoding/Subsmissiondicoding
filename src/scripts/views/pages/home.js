import RestaurantApiSource from '../../data/RestaurantApiSource';
import { TemplateCreator } from '../template/template-creator';

const Home = {
  async render() {
    return `
      <section class="jumbotron-wrapper">
        <div class="image-wrapper">
          <picture id="hero-image">
              <source srcset="./hero-image_2-small.jpg" media="(max-width: 600px)">
              <img src="./hero-image_2-large.jpg" alt="FoodMap Bandung" loading="lazy">
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

    try {
      // Memanggil API untuk mendapatkan daftar restoran
      const response = await RestaurantApiSource.getRestaurantList();

      loaderElement.classList.add('hidden'); // Menyembunyikan loader setelah data diterima

      // Menambahkan setiap restoran ke dalam list
      response.forEach((restaurant) => {
        restaurants.innerHTML += TemplateCreator.RestaurantItem(restaurant);
      });
    } catch (error) {
      console.error(error);
      loaderElement.classList.add('hidden');
      restaurants.innerHTML = '<p>Failed to load restaurants.</p>';
    }
  },
};

export default Home;
