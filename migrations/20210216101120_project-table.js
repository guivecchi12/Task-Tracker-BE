
exports.up = function(knex) {
    return knex.schema.createTable("project", tbl =>{
        tbl.increments("id")
        tbl.string('name')
            .notNullable()
            .unique()

        tbl.integer('dep_id')
            .unsigned()
            .references('department.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    
        tbl.integer('user_id')
            .unsigned()
            .references('user.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('project')
};
