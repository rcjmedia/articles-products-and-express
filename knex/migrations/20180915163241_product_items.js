exports.up = function(knex, Promise) {
    return knex.schema.createTable('product_items', (p) => {
      p.increments('id').primary();
      p.string('name', 256).notNullable();
      p.decimal('price', 8, 2).notNullable();
      p.decimal('inventory', 8, 0).notNullable();
      p.timestamps(false, true);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('product_items');
  };