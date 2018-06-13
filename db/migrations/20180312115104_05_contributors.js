exports.up = function(knex, Promise) {
  return knex.schema.createTable('contributor', function(table){
    table.increments();
      table.integer('user_id')
      table.integer('board_id')
      table.boolean('is_owner').defaultTo('false')
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.timestamp('ucreated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('contributor');
};
