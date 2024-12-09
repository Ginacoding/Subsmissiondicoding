Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorites');
  I.waitForElement('#card-list', 10); // Menunggu hingga elemen #card-list muncul selama 10 detik
});

Scenario('showing empty liked restaurants', async ({ I }) => {
  I.say('Navigating to favorites page');
  I.waitForElement('#card-list', 10); // Menunggu hingga elemen #card-list muncul selama 10 detik
  I.see('Tidak ada resto difavoritkan', '#card-list');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.say('Navigating to favorites page');
  I.waitForElement('#card-list', 10); // Menunggu hingga elemen #card-list muncul selama 10 detik
  I.see('Tidak ada resto difavoritkan', '#card-list');

  I.amOnPage('/');
  I.say('Navigating to home page');

  I.waitForElement('.restaurant-item__title a', 10); // Menunggu hingga elemen .restaurant-item__title a muncul selama 10 detik
  I.seeElement('.restaurant-item__title a');
  I.click(locate('.restaurant-item__title a').first());

  I.waitForElement('#likeButton', 10); // Menunggu hingga elemen #likeButton muncul selama 10 detik
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorites');
  I.say('Navigating back to favorites page');

  I.waitForElement('.restaurant-item', 10); // Menunggu hingga elemen .restaurant-item muncul selama 10 detik
  I.seeElement('.restaurant-item');
});

