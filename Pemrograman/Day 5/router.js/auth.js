const express = require('express')
const router = express.Router()
const validator = require('../validators')
const { message } = require('../validators/createUser.validator')
const pool = require('../db/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


router.post('/login', async (req, res) => {
    const {body} = req;
    const result = validator.login.validate(body)
    const {error} = result

    if (error){
        res.status(400).json({
            message: "Invalid Request",
            data: error
        })

        return;
    }

    try{ 
        // const hashedPassword = await bcrypt.hash(body.password, 10);
        const result = await pool.query(
            "SELECT* FROM users where email = $1",
            [body.email]
        );
        if (result.rowCount === 0) {
            return res.status(400).json({"message": 'email atau password salah'});
        }

        const match = await bcrypt.compare(body.password, result.rows[0].password);
        if (!match) {
            return res.status(400).json({"message": 'email atau password salah'});
        }

        const user = result.rows[0]
        const token = jwt.sign({
            id: user.id,
            email: user.id,
            username: user.username,
            fullname: user.fullname,
            balance: user.balance
            // email: result.rows[0].email,
            // username: result.rows[0].username,
            // fullname: result.rows[0].fullname,
            // balance: result.rows[0].balance
        }, "storngsecret", {
            expiresIn: "1h"
        })

        // return res.status(200).json({"message": 'YEY berhasil login!!', data : result.rows[0]});

        return res.status(200).json({"message": 'YEY berhasil login!!', data : result.rows[0], access_token: token});
      } catch (error){
          console.error('Error creating user:', error.message);
          if (error.code === '23505'){
              res.status(409).json({message: 'Email already exists'});
          } else{
              res.status(500).json({message: 'Internal Server Error'})
          }
      }

        
})

module.exports = router
