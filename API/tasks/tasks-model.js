const db = require('../../data/configs')
const table = 'task'

// Read all
function listTasks(){
    return db(table)
        .select('*');
}

// List by Project
function findByProject(projectName){
    return db(table)
        .join('project as p', `${table}.proj_id`, 'p.id')
        .where('p.name', projectName)
        .select('p.name as project', `${table}.*`);
}

// List by Project ID
function findAllTasksByProject(){
    return db(table)
        .innerJoin('project as p', `${table}.proj_id`, 'p.id')
        .select('p.name as project', `${table}.*`);
}

// List by ID
function findById(id){
    return db(table)
        .where({id: id})
        .first()
        .select('*');
}

// Create
function create(task){
    return db(table)
        .insert(task)
        .returning('*');
}

// Update
function update(id, task){
    return db(table)
        .where({id: id})
        .first()
        .update(task)
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
    listTasks,
    findByProject,
    findAllTasksByProject,
    findById,
    create,
    update,
    remove
}