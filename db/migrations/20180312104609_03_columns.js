exports.up = function(knex, Promise) {
  return knex.schema.createTable('columns', function(table){
    table.increments('column_id');
      table.string('column_name')
      table.integer('board_id').references('board_id').inTable('boards').onDelete('CASCADE')
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.timestamp('ucreated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('columns');
};
