// berfungsi mempersingkat codingan yang di butukan dan sama

const bcrypt = require('bcrypt')
const { Model } = require('sequelize')
const UsersModel = require('../models/users')

//contoh
const passwordCheck = async (nip, password) => {
    const userData = await UsersModel.findOne({where: {nip: nip}} )
    const compare = await bcrypt.compare(password, userData.password)
    return {compare, userData}
}

module.exports = passwordCheck