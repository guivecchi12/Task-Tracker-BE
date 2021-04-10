const db = require('../../data/configs')
const table = 'user'
// Read all
function listUsers(){
    return db(table)
        .select(`${table}.id`,`${table}.name`, `${table}.email`, `${table}.image`, `${table}.dep_id`)
}

// Find by ID
function findById(id){
    return db(table)
        .where(`${table}.id`, id)
        .first()
        .select('*')
}

// Find by email
function findByEmail(email){
    return db(table)
        .where(`${table}.email`, email)
        .first()
        .select('*')
}

// Find by Department
function findByDepartment(dep){
    return db(table)
        .join('department as d', `${table}.dep_id`, "d.id")
        .where(`d.name`, dep)
        .select('d.name as departmentName', `${table}.*`)
}

// Create
function create(user){
    return db(table)
        .insert(user)
}

// Update
function update(id, user){
    return db(table)
        .where({id: id})
        .first()
        .update(user)
}

// Delete
function remove(id){
    return db(table)
        .where({id})
        .first()
        .del()
}

module.exports = {
    listUsers,
    findById,
    findByEmail,
    findByDepartment,
    create,
    update,
    remove
}