const tasks = [
  {name: 'users table', description: 'needs to contain: id, name, email, picture and department they belong to', proj_id: 1},
  {name: 'department table', description: 'needs to contain: id, name, image', proj_id: 1},
]
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('task').del()
    .then(function () {
      // Inserts seed entries
      return knex('task').insert(tasks);
    });
};
