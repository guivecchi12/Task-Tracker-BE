
exports.up = function(knex) {
    return knex.schema.createTable('department', tbl => {
        tbl.increments('id')
        tbl.string('name')
            .notNullable()
            .unique()
        tbl.text('image')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('department')
};
