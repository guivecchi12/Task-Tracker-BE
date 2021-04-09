
exports.up = function(knex) {
    return knex.schema.createTable('user', tbl => {
        tbl.increments('id')
        tbl.string('name')
            .notNullable()
        tbl.string('email')
            .notNullable()
            .unique()
        tbl.string('image')
        tbl.text('password')
            .notNullable()
        
        tbl.integer('dep_id')
            .unsigned()
            .notNullable()
            .references('department.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user')
};
