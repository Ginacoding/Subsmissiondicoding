// Review_Restaurant.test.js
Feature('Review Restaurant');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('add customer review', async ({ I }) => {
  I.seeElement('.restaurant-item__title a');
  I.click(locate('.restaurant-item__title a').first());

  I.seeElement('#review-form');
  I.fillField('#review-name', 'John Doe');
  I.fillField('#review-content', 'Makanan sangat enak dan pelayanan ramah!');
  I.click('#submit-review');

  I.see('John Doe', '.review-item');
  I.see('Makanan sangat enak dan pelayanan ramah!', '.review-item');
});
