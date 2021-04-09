const {findById} = require('../API/users/users-model')
function adminAccess(){
    const authError = {
        message: "You do not have the right clearance to access this page!",
    }
    return async(req, res, next) => {
        try{
            console.log(req.token)
            const user = await findById(req.token.userID)

            if(!user){
                return res.status(400).json(authError)
            }
            else if (user.dep_id !== 3){
                return res.status(400).json(authError)
            }
            next()
        }
        catch(err){
            return res.status(500).json({message: err.message})
        }
    }
}

module.exports = adminAccess