Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorites');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.see('Tidak ada resto yang difavoritkan', '#card-list');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada resto yang difavoritkan', '#card-list');

  I.amOnPage('/');

  I.seeElement('.restaurant-item__title a');
  I.click(locate('.restaurant-item__title a').first());

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorites');
  I.seeElement('.restaurant-item');
});
