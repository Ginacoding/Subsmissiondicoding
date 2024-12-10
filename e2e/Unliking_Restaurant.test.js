Feature('Unliking Restaurants');

Before(async ({ I }) => {
  I.amOnPage('/#/favorite'); // Mengakses halaman favorit dengan hash routing
  I.waitForElement('#card-list', 20); // Menunggu hingga elemen #card-list muncul selama 20 detik
});

Scenario('unliking a liked restaurant', async ({ I }) => {
  I.say('Navigating to favorites page');
  I.waitForElement('#card-list', 20); // Menunggu hingga elemen #card-list muncul selama 20 detik
  I.see('Tidak ada resto difavoritkan', '#card-list');

  I.amOnPage('/');
  I.say('Navigating to home page');

  I.waitForElement('.restaurant-item a', 20); // Menunggu hingga elemen .restaurant-item__title a muncul selama 20 detik
  I.seeElement('.restaurant-item a');
  I.click(locate('.restaurant-item a').first());

  I.waitForElement('#likeButton', 20); // Menunggu hingga elemen #likeButton muncul selama 20 detik
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite'); // Kembali ke halaman favorit dengan hash routing
  I.say('Navigating back to favorites page');

  I.waitForElement('.restaurant-item', 20); // Menunggu hingga elemen .restaurant-item muncul selama 20 detik
  I.seeElement('.restaurant-item');

  const likedRestaurantName = await I.grabTextFrom('.restaurant-item .restaurant-item__link .restaurant-item__content h3'); // Ambil teks dari elemen yang mengandung nama restoran
  console.log('Nama restoran yang disukai: ', likedRestaurantName); // Log nama restoran yang disukai

  I.click(locate('.restaurant-item a').first());

  I.waitForElement('#likeButton', 20); // Menunggu hingga elemen #likeButton muncul selama 20 detik
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite'); // Kembali ke halaman favorit dengan hash routing
  I.say('Navigating back to favorites page');

  I.waitForElement('#card-list', 20); // Menunggu hingga elemen #card-list muncul selama 20 detik
  I.see('Tidak ada resto difavoritkan', '#card-list');
});
