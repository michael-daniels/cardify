
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contributor').del()
    .then(function () {
      // Inserts seed entries
      return knex('contributor').insert([
        {user_id: '1', board_id: '1'},
        {user_id: '2', board_id: '2'},
        {user_id: '3', board_id: '3'},
        {user_id: '4'},

      ]);
    });
};
