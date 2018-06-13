
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cards').del()
    .then(function () {
      // Inserts seed entries
      return knex('cards').insert([
        {card_name: 'Card 1', parent_column_id: '1', content:'Content 1'},
        {card_name: 'Card 2', parent_column_id: '1', content:'Content 2'},
        {card_name: 'Card 3', parent_column_id: '1', content:'Content 3'},
        {card_name: 'Card 4', parent_column_id: '1', content:'Content 4'},
        {card_name: 'Card 5', parent_column_id: '3', content:'Content 5'},
        {card_name: 'Card 6', parent_column_id: '3', content:'Content 6'},

      ]);
    });
};
