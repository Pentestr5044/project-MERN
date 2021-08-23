const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    
//this is the hashing of the password
    const salt = await bcrypt.genSalt(10);
    const hPassword = await bcrypt.hash(req.body.password, salt);
    const chPassword = await bcrypt.hash(req.body.cPassword, salt);


    //this is the user data taken in
    const user = new User({
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        password: hPassword,
        cPassword: chPassword,
    })
//seperating the passwords
    const result = await user.save()
    const {password, cPassword, ...data} = await result.toJSON();
    res.send(data)
})

router.post('/login', async (req, res) => {
    //login logic

    const user = await User.findOne({email: req.body.email});

    if(!user){
        return res.status(404).send({
            message: 'That is not a user buddy!'
        })
    }
    if(!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).send({
            message: 'INVALID CREDS!'
        })

    }
    const token = jwt.sign({_id: user._id}, 'love')
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24*60*60*1000
    })

    res.send("YOU HAVE BEEN AUTHENTICATEEEEEEEEEEEEEDDDDD!!!!!!!!!!!! @#$%(")
})
router.get('/user', async (req, res) => {
    try{
    const cookie = req.cookies['jwt']

const claims = jwt.verify(cookie, 'love')
//compare cookie logic is below 
if(!claims) {
    return res.status(401).send({
            message: 'Your fuckin cookie is broken buddy!'
        })

}
const {password, ...data} = await User.findOne({_id: claims._id})
    
    res.send('YES YOU DID JUST MAKE AN AUTHENTICATION API!!!')
}catch (e) {
    return res.status(401).send({
            message: 'Your fuckin cookie is broken buddy!'
        })

}
})


//Logout function for resetting the cookie below
router.post('/logout', (req, res) => {
    res.cookie('jwt', '', {maxAge: 0})
    
    res.send({
        message: 'Thank you for loggin out. see you soon.'
    })
})
module.exports = router;