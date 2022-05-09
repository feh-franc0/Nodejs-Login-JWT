const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {loginValidade,registerValidade} = require('./validate');


const userController = {
    register: async function(req,res) {

        const {error} = registerValidade(req.body)
        if(error){return res.status(400).send(error)}

        const selectUser = await User.findOne({email:req.body.email})
        if(selectUser) return res.status(400).send('Email already exist')

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)
        })

        try {
            const savedUser = await user.save()
            res.send(savedUser)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    login: async function(req,res) {

        
        const {error} = loginValidade(req.body)
        if(error){return res.status(400).send(error)}


        const selectUser = await User.findOne({email:req.body.email})
        if(!selectUser) return res.status(400).send('Email or PASSWORD incorrect')

        const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectUser.password)
        if(!passwordAndUserMatch) return res.status(400).send('Email or PASSWORD incorrect')

        const token = jwt.sign({_id: selectUser._id, admin: selectUser.admin},process.env.TOKEN_SECRET)

        res.header('authorization-token', token)
        res.send("User Logged")

    }
}

module.exports = userController