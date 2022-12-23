const express = require('express')
// const { where } = require('sequelize')
const router = express.Router()
const UsersModel = require('../models/users')
const bcrypt = require('bcrypt')
const passwordCheck = require('../utils/passwordCheck')

// routing endpoint users utama
router.get('/', async(req, res) => {
    const users = await UsersModel.findAll()

    res.status(200).json({
        data: users,
        metadata: "test user endpoint"
    })
})


router.post('/', async(req, res) => {
    //nip, nama, password ->>>>>>>> BE nangkap
    const { nip, nama, password} = req.body
    
    // coba ganti angka 10 ke angka lain
    const encryptedPassword = await bcrypt.hash(password, 10)


    const users = await UsersModel.create({
        nip, nama, password: encryptedPassword
    })
    res.status(200).json({
        data: users,
        metadata: "test user endpoint"
    })
})

router.put('/', async(req, res) => {
    //nip, nama, password ->>>>>>>> BE nangkap
    const { nip, nama, password, passwordBaru} = req.body
    // const userData = await UsersModel.findOne({where: {nip: nip}} )

    const check = await passwordCheck(nip, password)

    // const compare = await bcrypt.compare(password, userData.password)
    const encryptedPassword = await bcrypt.hash(passwordBaru, 10)
    // res.json({compare})

    // password yang muncul di db === password dari inputan
    if(check.compare === true){
        const users = await UsersModel.update({
            nama, password: encryptedPassword
        }, {where: { nip: nip } })

        res.status(200).json({
            users: {updated: users[0]},
            metadata:"user update!"
        })
    } else {
        res.status(400).json({
            error: "data invalid"
        })
    }
})

//Login
router.post('/login', async (req, res) => {
    const {nip, password} = req.body

    //sini contohnya
    const check = await passwordCheck(nip, password)
    if(check.compare === true){
        res.status(200).json({
            status: 200,
            data: check.userData,
            metadata:"login sukses"
        })
    } else
    res.status(400).json({
        data:null,
        metadata:"data invalid"
    })
})

module.exports = router