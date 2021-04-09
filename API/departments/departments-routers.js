const express = require('express')
const router = express.Router()
const depModel = require('./departments-model')
const restrict = require("../../middleware/restrict")
const adminAccess = require('../../middleware/adminAccess')

// Read all
router.get('/', async(req, res) => {
    try{
        const departments = await depModel.listDepartments();
        return res.status(200).json(departments)
    }
    catch(err){
        return res.status(500).json({ message: err.message })
    }
})

// Find by ID or Name
router.get('/:search', async(req, res) => {
    const type = req.params.search
    
    if(parseInt(type)){
        const id = req.params.search
        try{
            const dep = await depModel.findById(id)
            if(!dep){
                return res.status(404).json({ message: "Department not found by that ID"})
            }
            return res.status(200).json(dep)
        }
        catch(err){
            return res.status(500).json({message: err.message})
        }
    }
    else{
        const name = req.params.search
        try{
            const dep = await depModel.findByName(name)
            if(!dep){
                return res.status(404).json({ message: "Department not found by that name"})
            }
            return res.status(200).json(dep)
        }
        catch(err){
            return res.status(500).json({message: err.message})
        }
    }
    
})


// Create
router.post('/', restrict(), adminAccess(), async(req, res) => {
    try{
        const newDep = req.body;
        if(!newDep.name || newDep.name.trim() === ""){
            return res.status(400).json({
                message: 'Department requires a name'
            })
        }
        const depExists = await depModel.findByName(newDep.name)
        if(depExists){
            return res.status(400).json({
                message: "This department already exists please choose a different name for it",
                department: depExists
            })
        }
        const dep = await depModel.create(newDep)
        const response = await depModel.findById(dep)
        return res.status(201).json(response)
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
})

// Update
router.put('/:id', restrict(), adminAccess(), async(req, res) => {
    try{
        const dep = req.body
        const id = req.params.id

        if( !await depModel.findById(id) ){
            return res.status(404).json({ message: "Department not found by that ID"})
        }

        await depModel.update(id, dep)
        try{
            const updatedDep = await depModel.findById(id)
            return res.status(201).json(updatedDep)
        }
        catch(err){
            return res.status(500).json({message: err.message})
        }
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
})

// Delete
router.delete('/:id', restrict(), adminAccess(), async(req, res) => {
    try{
        const id = req.params.id
        const dep = await depModel.findById(id)

        if(!dep){
            return res.status(400).json({ message: "This department does not exist"})
        }
        await depModel.remove(id)
        return res.status(201).json({ message: "Department Removed", department: dep})
    
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
})

module.exports = router