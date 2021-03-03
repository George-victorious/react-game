const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({
        login: req.body.login
    })

    if (candidate) {
        //пользотель существует
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            //генерируем токен

            const token = jwt.sign({
                login: candidate.login,
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, { expiresIn: 3600 })

            res.status(200).json({
                login: req.body.login,
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                message: 'Incorrect password.'
            })
        }
    } else {
        res.status(404).json({
            message: 'Eser not found.'
        })
    }
}


module.exports.register = async function (req, res) {
    //login emain password
    const candidate = await User.findOne({
        login: req.body.login
    })

    if (candidate) {
        //пользователь сущ. ..ошибка..
        res.status(409).json({
            message: 'Such login taken.'
        })
    } else {
        //создаем пользователя
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            login: req.body.login,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })

        try {
            await user.save()
            res.status(201).json({ message: "user created." })
        } catch (e) {
            //ошибка
            errorHandler(res, e)
        }
    }

}