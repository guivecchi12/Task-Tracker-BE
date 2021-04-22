const db = require('../../data/configs')
const table = 'project'
// List All
function listProjects(){
    return db(table)
        .select('*');
}
// List all tasks under project
function listAllTasksAndProject(){
    return db(table)
        .leftJoin('task as t', `${table}.id`, 't.proj_id')
        .select(`${table}.name as project`, 't.*');
}
// List by Department
function findByDepartment(dep){
    return db(table)
        .join('department as d', `${table}.dep_id`, 'd.id')
        .where(`d.name`, dep)
        .select('d.name as department_name', `${table}.*`);
}

// List by ID
function findById(id){
    return db(table)
        .where({id: id})
        .first()
        .select('*');
}

// List by User
function findByUserEmail(userEmail){
    return db(table)
        .join('user as u', `${table}.user_id`, 'u.id')
        .where(`u.email`, userEmail)
        .select(`${table}.name as project_name`, 'u.name' );
}

// List by Name
function findByName(name){
    return db(table)
        .where({name: name})
        .first()
        .select('*');
} 

// Create
function create(proj){
    return db(table)
        .insert(proj)
        .returning('*');
}

// Update
function update(id, proj){
    return db(table)
        .where({id: id})
        .first()
        .update(proj)
        .returning('*');
}

// Delete
function remove(id){
    return db(table)
        .where({id: id})
        .first()
        .del();
}

module.exports = {
    listProjects,
    listAllTasksAndProject,
    findByDepartment,
    findById,
    findByUserEmail,
    findByName,
    create,
    update,
    remove
}