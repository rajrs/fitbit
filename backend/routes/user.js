const router = require('express').Router();
let User = require('../models/user.model');


router.route('/').get((req,res)=>{
    User.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req, res)  =>{
    const username = req.body.username;
    const newUser= new User({username});    
    newUser.save() 
    .then(() =>res.json("user Added"))
    .catch(err =>{
                if (err.name === 'MongoError' && err.code === 11000) {
            // Duplicate username
            console.log('duplicate user');
        return res.status(422).json({errorMsg:'User already exist!' } );
        }
        return res.status(400).json('Error: '+ err); 
    });
})

module.exports= router;