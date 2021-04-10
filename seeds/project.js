const proj = [
  {name:'Test Tables', dep_id: 1, user_id: 1}
]
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('project').del()
    .then(function () {
      // Inserts seed entries
      return knex('project').insert(proj);
    });
};
