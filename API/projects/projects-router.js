const express = require('express')
const router = express.Router()
const projectModel = require('./projects-model')

// Read All
router.get('/', async(req, res) => {
    try{
        const projects = await projectModel.listProjects()
        return res.status(200).json(projects)
    }
    catch(err){
        return res.status(500).json({ message: err.message })
    }
})

// Find all Projects and their tasks
router.get('/tasks', async(req, res) => {
    try{
        const projects = await projectModel.listAllTasksAndProject()
        return res.status(200).json({projects})
    }
    catch(err){
        return res.status(500).json({ message: err.message })
    }
})

// Find by project name or find all projects in department, all projects from a user by his unique email 
router.get('/:search', async(req, res) => {
    const search = req.params.search

    if(parseInt(search)){
        try{
            const proj = await projectModel.findById(search)

            if(!proj){
                return res.status(400).json({ message: "This project does not exist"})
            }
            return res.status(200).json(proj)
        }
        catch(err){
            return res.status(500).json({ message: err.message })
        }
    }
    else{
        try{
            const name = await projectModel.findByName(search)
            const dep = await projectModel.findByDepartment(search)
            const user = await projectModel.findByUserEmail(search)

            if(name){
                return res.status(200).json(name)
            }

            else if(dep && dep.length > 0){
                return res.status(200).json(dep)
            }

            else if(user && user.length > 0){
                return res.status(200).json(user)
            }

            else{
                return res.status(404).json({message: "Project not found"})
            }
        }
        catch(err){
            return res.status(500).json({ message: err.message })
        }
    }
})

// Create
router.post('/', async(req, res) => {
    try{
        const newProject = req.body
        if(!newProject.name || newProject.name.trim() === ''){
            return res.status(400).json({
                message: 'Project Requires a name'
            })
        }

        const projectExists = await projectModel.findByName(newProject.name)
        if(projectExists){
            return res.status(400).json({
                message: 'This project already exists',
                project: projectExists
            })
        }

        await projectModel.create(newProject)
        const response = await projectModel.listProjects()
        return res.status(201).json(response)

    }
    catch(err){
        return res.status(500).json({ message: err.message })
    }
})

// Update
router.put('/:id', async(req, res) => {
    try{
        const id = req.params.id
        const changes = req.body
        const proj = await projectModel.findById(id)

        if(!proj){
            return res.status(400).json({
                message: 'Project not found'
            })
        }

        await projectModel.update(id, changes)
        const updated = await projectModel.findById(id)

        return res.status(200).json(updated)
    }
    catch(err){
        return res.status(500).json({ message: err.message })
    }
})

// Delete
router.delete('/:id', async(req, res) => {
    try{
        const id = req.params.id
        const proj = await projectModel.findById(id)

        if(!proj){
            return res.status(400).json({
                message: 'Project not found'
            })
        }

        await projectModel.remove(id)
        return res.status(200).json({message: "Project Removed", removed: proj})
    }

    catch(err){
        return res.status(500).json({ message: err.message })
    }
})

module.exports = router