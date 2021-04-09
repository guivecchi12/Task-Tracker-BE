const departments = [
  {name: 'Tech', image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fHRlY2h8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'},
  {name: 'Development', image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kaW5nfGVufDB8fDB8&auto=format&fit=crop&w=500&q=60'},
  {name: 'Admin', image: 'https://images.unsplash.com/photo-1528294941335-0d388bc8ac99?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8Ym9zc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'}
]
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('department').del()
    .then(function () {
      // Inserts seed entries
      return knex('department').insert(departments);
    });
};
