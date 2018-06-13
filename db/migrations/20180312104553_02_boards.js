exports.up = function(knex, Promise) {
  return knex.schema.createTable('boards', function(table){
    table.increments('board_id');
      table.string('board_name')
      table.integer('owner_id')
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('boards');
};
