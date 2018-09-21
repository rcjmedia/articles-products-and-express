const knex = require('../knex/knex');

class Products {
  constructor() {
    this._count = 1;
    this._storage = [];
    this._productList = [
      {
        'id' : 1,
        'name' : 'Sandals',
        'price' : 20,
        'inventory' : 200
      },

      {
        'id' : 2,
        'name' : 'Gucci Sunglasses',
        'price' : 220,
        'inventory' : 15
      }
    ];

    this._productNumber = 2;
  }
} 

function selectAllProducts(item) {
  return knex.select().from('product_items').where('id', item)
};

function updateProduct(item, data) {
  return knex('product_items').where('id', item).update({
    name: data.name,
    price: data.price,
    inventory: data.inventory
  })
};

function deleteProduct(item) {
  return knex('product_items').where('id', item).del();
};

function addProduct(newItem) {
  return knex('product_items').insert({ name: newItem.name, price: newItem.price, inventory: newItem.inventory });
};

module.exports = {
  Products,
  selectAllProducts,
  updateProduct,
  deleteProduct,
  addProduct,
};