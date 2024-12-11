import CONFIG from '../../globals/config';

const RestaurantItem = (restaurant) => `
    <div class="restaurant-item">
        <a href="#/detail/${restaurant.id}" class="restaurant-item__link">
            <img class="lazyload" class="restaurant-item__header" src="${CONFIG.IMAGE_URL}/${restaurant.pictureId}" alt="${restaurant.name}">
            <div class="restaurant-item__content">
                <div class="restaurant-item__header__rating">
                    <p>⭐️ <span class="restaurant-item__header__rating__score">${restaurant.rating}</span></p>
                </div>
                <h3 class="restaurant-item__name">${restaurant.name}</h3>
                <p class="restaurant-item__city">City: ${restaurant.city}</p>
                <p class="restaurant-item__description">${restaurant.description}</p>
            </div>
        </a>
    </div>
`;

const DetailRestaurant = (restaurant) => `
   <section class="details-wrapper">
        <div class="details-header">
              <h1 class="details-title">${restaurant.name} <span>(${
  restaurant.city
})</span></h1>
              <div class="details-subheader">
                  <img src="${CONFIG.IMAGE_URL}/${restaurant.pictureId}" class="lazyload" alt="${
  restaurant.name
}" class="details-image"/>
                  <div class="details-content">
                    <div class="details-content-item">
                        <p class="details-content-title">Rating</p>: ${
  restaurant.rating
} / 5.0
                    </div>
                    <div class="details-content-item">
                        <p class="details-content-title">Alamat</p>: ${
  restaurant.address
}
                    </div>
                    <div class="details-content-item">
                        <p class="details-content-title">Kategori</p>: ${restaurant.categories
    .map((category) => category.name)
    .join(', ')}
                    </div>
                    <p class="details-description">${restaurant.description}</p>
                  </div>
              </div>
         </div>
         <!-- Menu section -->
         <div class="details-menu">
            <div class="details-menu__foods">
                <h2>Menu Makanan</h2>
                <ul>
                    ${restaurant.menus.foods
    .map((food) => `<li>${food.name}</li>`)
    .join('')}
                </ul>
            </div>
            <div class="details-menu__drinks">
                <h2>Menu Minuman</h2>
                <ul>
                    ${restaurant.menus.drinks
    .map((drink) => `<li>${drink.name}</li>`)
    .join('')}
                </ul>
            </div>
         </div>
         <!-- Customer reviews -->
         <div>
            <h1 class="details-subtitle">Ulasan Kustomer</h1>
            <div class="details-review-wrapper">
                ${restaurant.customerReviews
    .map(
      (review) => `
                    <div class="details-review-item">
                        <div class="review-item-header">
                            <div class="review-item-user">
                                <h4>${review.name}</h4>
                            </div>
                            <p class="review-item-date">${review.date}</p>
                        </div>
                        <p class="review-item-desc">${review.review}</p>
                    </div>
                `
    )
    .join('')}
            </div>
        </div>
      </section>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export const TemplateCreator = {
  RestaurantItem,
  DetailRestaurant,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};