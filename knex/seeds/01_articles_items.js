
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('article_items').del()
    .then(function () {
      // Inserts seed entries
      return knex('article_items').insert([
        {id: 1, title: 'Dell Annual Save Coupon', body: 'We wouldnt want you to miss out on this huge savings!', author: 'The Author', urlTitle: 'Dell%20Annual%20Save%20Coupon'},
        {id: 2, title: 'Extra hot Labor Day deals are now Live', body: 'Labor Day sale up to 50% off on all the latest tech!', author: 'Marketing', urlTitle: 'Labor%20Day%20Deals'},
      ]);
    });
};
