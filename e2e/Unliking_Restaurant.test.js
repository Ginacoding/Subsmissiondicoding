Feature('Unliking Restaurants');

Scenario('unliking a liked restaurant', async ({ I }) => {
  I.amOnPage('/#/favorites');
  I.waitForElement('#card-list', 10);
  I.see('Tidak ada resto difavoritkan', '#card-list');

  I.amOnPage('/');
  I.waitForElement('.restaurant-item__title a', 10);
  I.click(locate('.restaurant-item__title a').first());
  
  I.waitForElement('#likeButton', 10);
  I.click('#likeButton');
  
  I.amOnPage('/#/favorites');
  I.waitForElement('.restaurant-item', 10);
  I.seeElement('.restaurant-item');
  
  I.click(locate('.restaurant-item__title a').first());
  I.waitForElement('#likeButton', 10);
  I.click('#likeButton');
  
  I.amOnPage('/#/favorites');
  I.waitForElement('#card-list', 10);
  I.see('Tidak ada resto yang difavoritkan', '#card-list');
});
