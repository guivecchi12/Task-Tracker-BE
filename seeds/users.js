const users = [
  {name:'user1', email:'user1@email.com', image: 'https://images.unsplash.com/photo-1478265409131-1f65c88f965c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8c25vd3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', dep_id: 1},
  {name:'user2', email:'user2@email.com', image: 'https://images.unsplash.com/photo-1553846830-8fb467fe2453?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTQxfHxzYW5kfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', dep_id: 2},
  {name:'user3', email:'user3@email.com', image: 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8c2VhfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', dep_id: 3}
]

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert(users);
    });
};
