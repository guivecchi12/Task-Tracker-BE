const express = require('express')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
require('dotenv').config()

const router = express.Router()
const userModel = require('./users-model')
const restrict = require('../../middleware/restrict')
const adminAccess = require('../../middleware/adminAccess')

// Read all
router.get('/', async(req, res) =>{
    try{
        const users = await userModel.listUsers();
        return res.status(200).json(users);
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
})

// Find by ID, email, or department
router.get('/search/:search', async(req, res) =>{
    try{
        const search = req.params.search

        const userId = await userModel.findById(search)
        const userEmail = await userModel.findByEmail(search);
        const userDep = await userModel.findByDepartment(search);
        
        if(userId){
            return res.status(200).json(userId)
        }
        else if(userEmail){
            return res.status(200).json(userEmail)
        }
        else if(userDep && userDep.length > 0){
            return res.status(200).json(userDep)
        }
        else{
            return res.status(404).json({message: "User not found"})
        }  
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
})

// Register
router.post('/register', async(req, res) => {
    try{
        const body = req.body
        const user = await userModel.findByEmail(body.email)

        if(user){
            return res.status(409).json({ message: "Email already in use" })
        }

        if( !body.name || !body.email || body.name.trim() === '' || body.email.trim() === '' || !body.password || body.password.trim('') === '' || body.password.length < 8 || !body.dep_id){
            return res.status(400).json({
                message: 'All fields other than picture are required and password must be longer than 8 characters'
            })
        }

        body.password = await bcrypt.hash(body.password, 14)
        await userModel.create(body)
        
        res.status(201).json({username: body.email})
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
})

// Login
router.post('/login', async(req, res) => {
    try{
        const body = req.body
        const user = await userModel.findByEmail(body.email)
        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        const passwordValid = await bcrypt.compare(body.password, user.password)
        if(!passwordValid){
            return res.status(404).json({message: 'Incorrect password please try again'})
        }

        const role = user.department
        const token = jwt.sign({
            userID: user.id,
            department: role
        }, process.env.SECRET, {expiresIn: '3h'})

        res.cookie('token', token)

        res.json({
            message: `Welcome ${user.name}`
        })
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
})

// Logout
router.get('/logout', async(req, res) => {
    try{
        req.session.destroy((err) => {
			if (err) {
				next(err)
			} else {
				res.status(204).end()
			}
		})
        return res.status(201).json({message: "logged out"})
    }
    catch(err){
        return res.status(500).json({ message: err.message })
    }
})

// Update
router.put('/:id', restrict(), adminAccess(), async(req, res) =>{
    try{
        const user = req.body
        const id = req.params.id

        if( !await userModel.findById(id) ){
            return res.status(404).json({ message: "User not found by that ID"})
        }

        await userModel.update(id, user)
        try{
            const updatedUser = await userModel.findById(id)
            return res.status(201).json(updatedUser)
        }
        catch(err){
            return res.status(500).json({
                message: err.message
            })
        }
    }
    catch(err){
        return res.status(500).json({ message: err.message })
    }
})

// Delete
router.delete('/:id', restrict(), adminAccess(), async(req, res) =>{
    try{
        const id = req.params.id
        const user = await userModel.findById(id)

        if(!user){
            return res.status(400).json({ message: "User does not exist" })
        }
        await userModel.remove(id)
        return res.status(201).json({ message: "User Deleted", user: user})
    }
    catch(err){
        return res.status(500).json({ message: err.message })
    }
})

module.exports = router