
const express = require('express')
const router = express.Router()
const validator = require('../validators')
const { message } = require('../validators/createUser.validator')
const pool = require('../db/db')
const bcrypt = require('bcrypt')

let users = [
    {
        id: 1,
        nama: "Syahdi",
        no_rek: "123",
        no_hp: "857"
    },
    {
        id: 2,
        nama: "Gharizah",
        no_rek: "456",
        no_hp: "857"   },
    {
        id: 3,
        nama: "Ahsan",
        no_rek: "789",
        no_hp: "857"
    },
]

// router.post('/', (req, res) => {
//     const {body} = req;

//     const result = validator.createUser.validate(body)
//     const {error} = result
//     if (error){
//         res.status(400).json({
//             message: "Invalid Request",
//             data: error
//         })
//     }
    
//     const nama = body.nama
//     const noHp = body.no_hp
//     const noRek = body.no_rek

//     const lastEntry = users.at(users.length - 1)
//     const lastID = lastEntry.id + 1

//     const newUser = {
//         id: lastID,
//         nama: nama,
//         no_hp: noHp,
//         no_rek: noRek
//     }
//     users.push(newUser)

//     res.json({
//         "message" : "data created"
//     })

// })

router.post('/new', async (req, res) => {
    const {body} = req;

    const result = validator.createUser.validate(body)
    const {error} = result

    // if (error){
    //     res.status(400).json({
    //         message: "Invalid Request",
    //         data: error
    //     })
    // }
    try{
      const hashedPassword = await bcrypt.hash(body.password, 10);
        const result = await pool.query(
            'INSERT INTO users (email, username, fullname, password, balance) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [body.email, body.username, body.fullname, hashedPassword, body.balance]
        );

        res.status(201).json(result.rows[0]);
      } catch (error){
          console.error('Error creating user:', error.message);
          if (error.code === '23505'){
              res.status(409).json({message: 'Email already exists'});
          } else{
              res.status(500).json({message: 'Internal Server Error'})
          }
      }

        
})

router.put('/', async (req, res) => {
  const {body} = req;

  const result = validator.createUser.validate(body)
  const {error} = result

  // if (error){
  //     res.status(400).json({
  //         message: "Invalid Request",
  //         data: error
  //     })
  // }
  try{
      const result = await pool.query(
          'UPDATE users set name = $1, email = $2, password = $3, address = $4 where id = $5',
          [body.name, body.email, body.password, body.address, body.id]
      )

      if(result.rowCount === 0){
        return res.status(404).json({"message": 'user not found'})
    }

      res.status(201).json({
        "message": "data created",
        "data": result.rows});
} catch (error){
    console.error('Error creating user:', error.message);
    if (error.code === '23505'){
        res.status(409).json({message: 'Email already exists'});
    } else{
        res.status(500).json({message: 'Internal Server Error'})
    }
}
})

// router.get('/', (req, res) => {
//     res.send(users)
// })

router.get('/', async (req, res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM users')
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
})

// router.get('/', async (req, res) => {
//     try {
//         const {rows} = await pool.query('SELECT * FROM users where is_deleted = false')
//         res.json(rows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({message: 'Internal Server Error'});
//     }
// })

module.exports = router
