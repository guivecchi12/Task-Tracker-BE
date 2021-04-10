const express = require('express')
const router = express.Router()

router.get('/', async(req, res) => {
    try{
        return res.status(200).json({message: "Welcome to my tasks"})
    }
    catch(err){
        return res.status(500).json({ message: err.message })
    }
})

module.exports = router