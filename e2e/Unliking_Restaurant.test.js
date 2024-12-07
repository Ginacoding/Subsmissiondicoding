Feature('Unliking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorites');
});

Scenario('unliking a liked restaurant', async ({ I }) => {
  I.see('Tidak ada resto yang difavoritkan', '#card-list'); // Memastikan pesan muncul saat tidak ada resto di favorit

  I.amOnPage('/');

  I.seeElement('.restaurant-item__title a');
  I.click(locate('.restaurant-item__title a').first());

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorites');
  I.seeElement('.restaurant-item');

  I.click(locate('.restaurant-item__title a').first());

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorites');
  I.see('Tidak ada resto yang difavoritkan', '#card-list'); // Verifikasi setelah unliking
});
