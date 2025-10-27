const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.json({ message: 'Events routes' })
})

module.exports = router
