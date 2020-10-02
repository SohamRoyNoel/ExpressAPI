const Bootcamp = require("../models/Bootcamp");
// Error Middleware
const asyncHandler = require("../middleware/async");

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
      
      const bootcamp = await Bootcamp.find();
      res.status(200).json({
            success: true,
            data: bootcamp
      })      
});

// @desc    Get single bootcamps
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
      
      const bootcamp = await Bootcamp.findById(req.params.id);
      if(!bootcamp){
            // Has to return in order to continue with next request
            return next(error); 
      }
      res.status(200).json({
            success: true,
            data: bootcamp
      })    
      
})

// @desc    Create new Bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamps = asyncHandler(async (req, res, next) => {
     
      //console.log(req.body);
      const bootcamp = await Bootcamp.create(req.body);
      res.status(201).json({
            success: true,
            data: bootcamp
      })      
})

// @desc    Update Bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamps = asyncHandler(async (req, res, next) => {
      // res.status(200).json({  success:true, data: { msg: `Update bootcamps ${req.params.id}` }  })
      const bootcamp = await Bootcamp
            .findByIdAndUpdate(
                  req.params.id,
                        req.body,
                  {
                        new: true, // To return updated data
                        runValidators: true  // Run validator explicitly 
                  }
            );
      if(!bootcamp){  
            return next(error);
      }
      res.status(200).json({
            success: true,
            data: bootcamp
      }) 
})

// @desc    Delete Bootcamp
// @route   DELETE /api/v1/bootcamps
// @access  Private
exports.deleteBootcamps = asyncHandler(async (req, res, next) => {
      const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
      if(!bootcamp){   
            return next(error);
      }
      res.status(200).json({
            success: true,
            data: bootcamp
      })    
})