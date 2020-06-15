const bcryptjs = require('bcryptjs')
const router = require("express").Router();

const Users = require("../users/users-model.js");

router.post('/register', (req, res) => {
     //validate to make sure username and password exist
     const { username, password } = req.body

     //hash user password
     const rounds = process.env.HASH_ROUNDS || 8
     const hash = bcryptjs.hashSync(password, rounds)


     Users.add({ username, password: hash })
          .then(user => {
               res.status(200).json(user)
          })
          .catch(err => res.send(err))
})

module.exports = router;
