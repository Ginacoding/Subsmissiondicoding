// scripts/components/restaurant-list.js
import { TemplateCreator } from '../views/template/template-creator';
import RestaurantApiSource from '../data/RestaurantApiSource';

class RestaurantList extends HTMLElement {
  async connectedCallback() {
    try {
      this.restaurants = await RestaurantApiSource.listRestaurants();
      console.log(this.restaurants); // Tambahkan ini untuk memeriksa response API
      this.render();
      this.dispatchEvent(new Event('restaurants-loaded'));
    } catch (error) {
      console.error('Failed to load restaurants:', error);
    }
  }

  render() {
    this.innerHTML = `
      ${this.restaurants
    .map(
      (restaurant) => `
        ${TemplateCreator.RestaurantItem(restaurant)}
      `
    )
    .join('')}
    `;
  }
}

customElements.define('restaurant-list', RestaurantList);
