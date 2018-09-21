exports.up = function(knex, Promise) {
    return knex.schema.createTable('article_items', (a) => {
        a.increments('id').primary();
        a.string('title', 256).notNullable();
        a.string('body', 65536).notNullable();
        a.string('author', 256).notNullable();
        a.string('urlTitle', 1024).notNullable();
        a.timestamps(false, true);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('article_items');
  };
  