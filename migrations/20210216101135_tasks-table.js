exports.up = function(knex) {
    return knex.schema.createTable('task', tbl => {
        tbl.increments('id')
        tbl.string('name')
            .notNullable()
        tbl.text('description')
            .notNullable()
        
        tbl.integer('proj_id')
            .unsigned()
            .references('id')
            .inTable('project')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('task')
};
