Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite'); // Mengakses halaman favorit dengan hash routing
  I.waitForElement('#card-list', 10); // Menunggu hingga elemen #card-list muncul selama 10 detik
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.say('Navigating to favorites page');
  I.waitForElement('#card-list', 10); // Menunggu hingga elemen #card-list muncul selama 10 detik
  I.see('Tidak ada resto difavoritkan', '#card-list');
});

Scenario('liking one restaurant', ({ I }) => {
  I.say('Navigating to favorites page');
  I.waitForElement('#card-list', 10); // Menunggu hingga elemen #card-list muncul selama 10 detik
  I.see('Tidak ada resto difavoritkan', '#card-list');

  I.amOnPage('/');
  I.say('Navigating to home page');

  I.waitForElement('.restaurant-item a', 10); // Menunggu hingga elemen .restaurant-item__title a muncul selama 10 detik
  I.seeElement('.restaurant-item a');
  I.click(locate('.restaurant-item a').first());

  I.waitForElement('#likeButton', 10); // Menunggu hingga elemen #likeButton muncul selama 10 detik
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite'); // Kembali ke halaman favorit dengan hash routing
  I.say('Navigating back to favorites page');

  I.waitForElement('.restaurant-item', 10); // Menunggu hingga elemen .restaurant-item muncul selama 10 detik
  I.seeElement('.restaurant-item');
});
