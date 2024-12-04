const express = require('express')
const { registerUser, LoginUser, logoutUser, authMiddleware } = require('../../controllers/auth/auth-controller')



const router = express.Router()

router.post('/register', registerUser)
router.post('/login', LoginUser)
router.post('/logout', logoutUser)
router.get("/check-auth", authMiddleware, (req,res) =>{
    const user = req.userres.status(200).json({
        success : true,
        message : "Authonticated user!",
        user,
    })
})


module.exports = router;