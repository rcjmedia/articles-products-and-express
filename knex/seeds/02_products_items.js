
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('product_items').del()
    .then(function () {
      // Inserts seed entries
      return knex('product_items').insert([
        {id: 1, name: 'Sandals', price: '20', inventory: '200'},
        {id: 2, name: 'Gucci Sunglasses', price: '220', inventory: '15'},
      ]);
    });
};
