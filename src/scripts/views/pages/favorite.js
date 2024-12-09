import FavoriteRestoIdb from '../../data/favorite-resto-idb';
import { TemplateCreator } from '../template/template-creator';

const Favorite = {
  async render() {
    return `
      <section id="restaurant-list">
        <h2 class="font-semibold">Daftar Restaurant Favorit</h2>
        <div id="card-list" class="card-container"></div>
      </section>
    `;
  },

  async afterRender() {
    console.log('afterRender called');
    
    try {
      const restaurantsAPI = await FavoriteRestoIdb.getAllRestaurant();
      console.log('restaurantsAPI:', restaurantsAPI);
      
      const restaurantsContainer = document.querySelector('#card-list');
      console.log('restaurantsContainer:', restaurantsContainer);

      if (!restaurantsContainer) {
        console.error('restaurantsContainer not found');
        return;
      }

      if (restaurantsAPI.length === 0) {
        restaurantsContainer.innerHTML = '<p>Tidak ada resto difavoritkan</p>';
        console.log('No favorite restaurants found');
      } else {
        restaurantsAPI.forEach((restaurant) => {
          // Memastikan restoran memiliki properti yang diperlukan
          if (restaurant && restaurant.id && restaurant.pictureId && restaurant.name && restaurant.rating !== undefined && restaurant.city && restaurant.description) {
            restaurantsContainer.innerHTML += TemplateCreator.RestaurantItem(restaurant);
            console.log('Rendered restaurant:', restaurant);
          } else {
            console.error('Invalid restaurant object:', restaurant);
          }
        });
        console.log('Favorite restaurants rendered');
      }
    } catch (error) {
      console.error('Error during afterRender:', error);
      const restaurantsContainer = document.querySelector('#card-list');
      if (restaurantsContainer) {
        restaurantsContainer.innerHTML = '<p>Gagal memuat restoran favorit. Coba lagi nanti.</p>';
      }
    }
  },
};

export default Favorite;
