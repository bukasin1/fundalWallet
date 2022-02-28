const db = require("../models"); // models path depend on your structure
const User = db.users;
const Wallet = db.wallets;
const Cards = db.cards
const bcrypt = require('bcryptjs')
const passport = require('passport');

const userSchema = require('../utils/validation').userSchema
const loginSchema = require('../utils/validation').loginSchema
const Auth = require('../middlewares/auth')

exports.signUp = async (req, res) => {
    // Validate request
    try {
        const validation = userSchema.validate(req.body)
        if (validation.error) {
            res.status(404).send({
                message: validation.error.details[0].message
            })
            return;
        }

        const { firstName, lastName, phoneNumber, email, password } = req.body
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.findOne({
            where: {
              email
            }
          })
        if (user) {
            res.status(401).send({
                message: "Email already registered"
            })
            return;
        }

        // Create a user
        const newUser = {
            firstName,
            lastName,
            phoneNumber,
            email,
            password: hashPassword
        };

        // Save new user in database
        const savedUser = await User.create(newUser)

        // Create user wallet
        const userWallet = {
            user: savedUser.id,
            balance: 0,
            income: 0,
            expense: 0
        }

        await Wallet.create(userWallet)
        res.status(201).send({
            message: "Succesful!",
            data: savedUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:
                error.message || "Some error occurred"
        });
    }
};

exports.getLogin = async (req, res) => {
    res.status(403).json({
        msg: "Invalid login details"
    })
};

exports.localAuth = passport.authenticate('local', {
        failureRedirect: '/api/v1/users/login'
    })

exports.signIn = async (req, res) => {
    try {
        // const validation = loginSchema.validate(req.body)
        // if (validation.error) {
        //     res.status(404).send({
        //         message: validation.error.details[0].message
        //     })
        //     return;
        // }
        // const { email, password } = req.body
        // const user = await User.findOne()
        // if (user) {
        //     const validUser = await bcrypt.compare(password, user.password)
        //     if (validUser) {
        //         const token = Auth.signToken(user.id)
        //         res.cookie("fundalWalletToken", token)
        //         res.status(201).send({ message: "Logged in", token })
        //     }
        //     return;
        // }
        console.log(await req.user)
        const token = Auth.signToken(req.user.id)
        res.cookie("fundalWalletToken", token)
        res.status(201).send({ message: "Logged in", token })
    } catch (error) {
        console.log(error, "error")
        res.status(404).send({
            message: "An error occured!",
            error
        })
    }
}

exports.getUserDetails = async(req, res) => {
    try{
        const user = req.user
        const wallet = await Wallet.findOne({
            where: {
                user: user.id
            }
        })
        const cards = await Cards.findAll({
            where: {
                user: user.id
            }
        })

        res.status(200).send({
            message: "Successful!",
            data: {
                user,
                wallet,
                cards
            }
        })
    }catch(error){
        console.log(error, "error")
        res.status(404).send({
            message: "An error occured!",
            error
        })
    }
}