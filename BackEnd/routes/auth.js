const router = require('express').Router();
const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
///////****REGISTER */
router.post('/register', async (req, res) => {
  ///cheking if the user is already in the DB
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');
    ///Hash the passwords
    const salt = await bcrypt.genSalt(10);
const hashPassword = await bcrypt.hash(req.body.password, salt)
  
    ////creat a new user
    const user = new User({
       
        name: req.body.name,
        email: req.body.email,
        password: hashPassword

    });
    try {
        const savedUser = await user.save();

        res.send(savedUser);
    } catch (err) {
        
     res.status(400).send(err);
    }
});

///////****LOGIN */

router.post('/login', async (req, res) => {
    

    ///cheking if the user is already in the DB
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email or password is not found');
    ///password id correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password')
    // //// create and assing a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
    // res.send('Logged in');
    
  
});









// module.exports =router;















