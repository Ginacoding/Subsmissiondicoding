import FavoriteRestoIdb from '../../data/favorite-resto-idb';
import { TemplateCreator } from '../template/template-creator';

const Favorite = {
  async render() {
    return `
      <section id="restaurant-list">
        <h2 class="font-semibold">Daftar Restaurant Favorit</h2>
        <div id="card-list" class="card-container">
          <loader-element></loader-element>
        </div>
      </section>
    `;
  },

  async afterRender() {
    console.log('afterRender called');

    const restaurantsContainer = document.querySelector('#card-list');
    const loaderElement = restaurantsContainer.querySelector('loader-element');

    try {
      const restaurantsAPI = await FavoriteRestoIdb.getAllRestaurant();
      console.log('restaurantsAPI:', restaurantsAPI);

      // Menghapus elemen loader setelah data dimuat
      if (loaderElement) {
        loaderElement.remove();
      }

      if (!restaurantsContainer) {
        console.error('restaurantsContainer not found');
        return;
      }

      if (restaurantsAPI.length === 0) {
        restaurantsContainer.innerHTML = '<p>Tidak ada resto difavoritkan</p>';
        console.log('No favorite restaurants found');
      } else {
        const fragment = document.createDocumentFragment();
        restaurantsAPI.forEach((restaurant) => {
          // Memastikan restoran memiliki properti yang diperlukan
          if (restaurant && restaurant.id && restaurant.pictureId && restaurant.name && restaurant.rating !== undefined && restaurant.city && restaurant.description) {
            const restaurantItemElement = document.createElement('div');
            restaurantItemElement.innerHTML = TemplateCreator.RestaurantItem(restaurant);
            fragment.appendChild(restaurantItemElement);
            console.log('Rendered restaurant:', restaurant);
          } else {
            console.error('Invalid restaurant object:', restaurant);
          }
        });
        restaurantsContainer.appendChild(fragment);
        console.log('Favorite restaurants rendered');
      }
    } catch (error) {
      console.error('Error during afterRender:', error);
      if (loaderElement) {
        loaderElement.remove();
      }
      if (restaurantsContainer) {
        restaurantsContainer.innerHTML = '<p>Gagal memuat restoran favorit. Coba lagi nanti.</p>';
      }
    }
  },
};

export default Favorite;
