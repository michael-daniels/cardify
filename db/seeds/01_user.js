
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {user_name: 'Joe'},
        {user_name: 'Tessa'},
        {user_name: 'Yoell'},
        {user_name: 'Troy'},
      ]);
    });
};
