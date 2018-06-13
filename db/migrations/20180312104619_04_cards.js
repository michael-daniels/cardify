exports.up = function(knex, Promise) {
  return knex.schema.createTable('cards', function(table){
    table.increments('card_id');
      table.string('card_name')
      table.integer('parent_column_id').references('column_id').inTable('columns').onDelete('CASCADE')
      table.text('content')
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.timestamp('ucreated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cards');
};
