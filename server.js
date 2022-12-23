//jangan dipikir
const express = require('express')
const cors = require('cors')
//gak kepakai karena sudah menggunakan dialect di db.config
// const mysql = require('mysql2')
const port = 3200

//pikir (2)
const sequelize = require('./db.config')
sequelize.sync().then(() => console.log('database ready'))

//pikir
const usersEndpoint = require('./routes/users')
const absensiEndpoint = require('./routes/absensi')

//jangan
const app = express()
app.use(cors())
app.use(express.json())

//pikir
app.use('/users', usersEndpoint)
app.use('/absensi', absensiEndpoint)

//jangan
app.listen(port, () => console.log(`running server on port ${port}`));