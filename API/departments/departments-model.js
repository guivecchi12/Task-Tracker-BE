const db = require('../../data/configs')
const table = 'department'

// List All
function listDepartments(){
    return db(table)
        .select('*')
}

// List by ID
function findById(id){
    return db(table)
        .where({id: id})
        .first()
        .select('*')
}

// List by Name
function findByName(dep){
    return db(table)
        .where({name: dep})
        .first()
        .select('*')
}

// Create
function create(dep){
    return db(table)
        .insert(dep)
}

// Update
function update(id, dep){
    return db(table)
        .where({id: id})
        .first()
        .update(dep)
}

// Delete
function remove(id){
    return db(table)
        .where({id})
        .first()
        .del()
}

module.exports = {
    listDepartments,
    findById,
    findByName,
    create,
    update,
    remove
}