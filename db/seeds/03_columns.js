
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('columns').del()
    .then(function () {
      // Inserts seed entries
      return knex('columns').insert([
        {column_name: 'column A', board_id:'1'},
        {column_name: 'column B', board_id:'1'},
        {column_name: 'column E', board_id:'3'},
      ]);
    });
};
