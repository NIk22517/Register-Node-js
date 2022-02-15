const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.get('/', (req, res) => {
    res.render('register');
})



router.post('/register', async (req, res) => {

    const {error} = registerValidation(req.body)
    if(error) return res.send(error.details[0].message);

    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.send('Email already exist');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword,
        address: req.body.address,
        phone: req.body.phone,
    });
    try{
        const savedUser = await user.save();
        // res.send({user: user._id})
        res.render('welcome')
    }
    catch(err){
        res.status(404).send(err);
    }

});

router.post('/login', async (req,res) => {
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email is incorrect');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("Invalid Password")

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token);


})


module.exports = router;