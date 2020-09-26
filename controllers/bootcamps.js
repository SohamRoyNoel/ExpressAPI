// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamp = (req, res, next) => {
      res.status(200).json({  success:true, data: { msg: "Return bootcamps" }  })
}

// @desc    Get single bootcamps
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamps = (req, res, next) => {
      res.status(200).json({  success:true, data: { msg: `Return bootcamps ${req.params.id}` }  })
}

// @desc    Create new Bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamps = (req, res, next) => {
      res.status(200).json({  success:true, data: { msg: `Create bootcamps` }  })
}

// @desc    Update Bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamps = (req, res, next) => {
      res.status(200).json({  success:true, data: { msg: `Update bootcamps ${req.params.id}` }  })
}

// @desc    Delete Bootcamp
// @route   DELETE /api/v1/bootcamps
// @access  Private
exports.deleteBootcamps = (req, res, next) => {
      res.status(200).json({  success:true, data: { msg: `Delete bootcamps ${req.params.id}` }  })
}