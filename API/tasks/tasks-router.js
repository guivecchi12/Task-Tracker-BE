const express = require('express')
const router = express.Router()
const taskModel = require('./tasks-model')
const projectModel = require('../projects/projects-model')

router.get('/', async(req, res) => {
    try{
        const tasks = await taskModel.listTasks()
        return res.status(200).json(tasks)
    }
    catch(err){
        return res.status(500).json({ message: err.message })
    }
})

// List by Project
router.get('/:project', async(req, res)=>{
    try{
        const proj = req.params.project
        const tasks = await taskModel.findByProject(proj)
        if(!tasks || tasks.length === 0){
            return res.status(401).json({ message: "task not found" })
        }
        return res.status(200).json(tasks)
    }
    catch(err){
        return res.status(500).json({ message: err.message })
    }
})

// Create
router.post('/', async(req, res)=>{
    try{
        const task = req.body
        if(Number.isInteger(task.name) || Number.isInteger(task.description)){
            return res.status(400).json({ message: 'Tasks need to be words'})
        }

        if(!task.name || task.name.trim() === '' || !task.description || task.description.trim() === ''){
            return res.status(400).json({ message: 'New tasks require both a name and a description'})
        }

        const taskId = await taskModel.create(task)
        const newTask = await taskModel.findById(taskId)

        return res.status(201).json(newTask)
    }
    catch(err){
        return res.status(500).json({ message: err.message })
    }
})

// Update
router.put('/:id', async (req, res) =>{
    try{
        const id = req.params.id
        const body = req.body
        const exists = await taskModel.findById(id)

        if(!exists){
            return res.status(401).json({ message: "task not found"})
        }

        else if(!body){
            return res.status(400).json({ message: "No changes made" })
        }

        await taskModel.update(id, body)
        const updated = await taskModel.findById(id)

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
        const removed = await taskModel.findById(id)
        
        if(!removed){
            return res.status(401).json({ message: 'Task not found' })
        }

        await taskModel.remove(id)
        return res.status(200).json({
            message: 'Task successfully removed', 
            task: removed
        })
    }
    catch(err){
        return res.status(500).json( { message: err.message } )
    }
})

module.exports = router