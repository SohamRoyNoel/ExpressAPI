const Bootcamp = require("../models/Bootcamp");

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamp = async (req, res, next) => {
      try {
            const bootcamp = await Bootcamp.find();
            res.status(200).json({
                  success: true,
                  data: bootcamp
            })
      } catch (error) {
            res.status(400).json({
                  success: false
            }) 
      }
}

// @desc    Get single bootcamps
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamps = async (req, res, next) => {
      try {
            const bootcamp = await Bootcamp.findById(req.params.id);
            if(!bootcamp){
              // Has to return in order to continue with next request
              return res.status(404).json({
                  success: false,
                  data: 'Bootcamp not found'
              })    
            }
            res.status(200).json({
                  success: true,
                  data: bootcamp
            })
      } catch (error) {
            res.status(400).json({
                  success: false
            }) 
      }
}

// @desc    Create new Bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamps = async (req, res, next) => {
      try {
          //console.log(req.body);
            const bootcamp = await Bootcamp.create(req.body);
            res.status(201).json({
                  success: true,
                  data: bootcamp
            })  
      } catch (error) {
            res.status(400).json({
                  success: false
            }) 
      }      
}

// @desc    Update Bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamps = async (req, res, next) => {
      // res.status(200).json({  success:true, data: { msg: `Update bootcamps ${req.params.id}` }  })
      try {
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
              return res.status(404).json({
                  success: false,
                  data: 'Bootcamp not found'
              })    
            }
            res.status(200).json({
                  success: true,
                  data: bootcamp
            }) 
      } catch (error) {
            res.status(400).json({
                  success: false
            }) 
      }
}

// @desc    Delete Bootcamp
// @route   DELETE /api/v1/bootcamps
// @access  Private
exports.deleteBootcamps = async (req, res, next) => {
      try {
            const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
            if(!bootcamp){
              // Has to return in order to continue with next request
              return res.status(404).json({
                  success: false,
                  data: 'Bootcamp not found'
              })    
            }
            res.status(200).json({
                  success: true,
                  data: bootcamp
            })
      } catch (error) {
            res.status(400).json({
                  success: false
            }) 
      }
}