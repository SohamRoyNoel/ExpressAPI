const express = require('express');
const { 
      getBootcamp,
       getBootcamps,
       createBootcamps,
       updateBootcamps,
       deleteBootcamps
} = require('../controllers/bootcamps')
const router = express.Router()

router.route('/')
.get(getBootcamp)
.post(createBootcamps);

router.route('/:id')
.get(getBootcamps)
.put(updateBootcamps)
.delete(deleteBootcamps);

module.exports = router;