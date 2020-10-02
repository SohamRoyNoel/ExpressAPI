const Bootcamp = require("../models/Bootcamp");
const geocoder = require('../utils/geocoder');
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

// @desc      Search By multiple different query params
// @routes    Possible Routes
//            GET api/v1/bootcamps/filter?averageCost[lte]=10000 or api/v1/bootcamps/filter?averageCost[gte]=10000
//            GET api/v1/bootcamps/filter?averageCost[gte]=10000&location.city=Boston
//            GET api/v1/bootcamps/filter?careers[in]=Business
// @access    Public
exports.getBootcampAdvancedFilter = asyncHandler(async (req, res, next) => {

      let query;
      let queryString = JSON.stringify(req.query);
      queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`); // '\b' stands for open boundary :: in mongoDB filtration is done by $, So just concat it
      query = Bootcamp.find(JSON.parse(queryString));
      // console.log(queryString);
      const bootcamp = await query;

      res.status(200).json({
            success: true,
            count: bootcamp.length,
            data: bootcamp
      })      
});

// @desc      Select: selects a specific field(exclude other); 
// @routes    Possible Routes
//            select - GET api/v1/bootcamps/SelectSort?select=name, description  
//            select - GET api/v1/bootcamps/SelectSort?select=name, description&housing=true  
//            sort   - GET api/v1/bootcamps/SelectSort?select=name, description,createdAt&sort=name   
//            sortReverse   - GET api/v1/bootcamps/SelectSort?select=name, description,createdAt&sort=-name               
// @access    Public
exports.getBootcampSelectSort = asyncHandler(async (req, res, next) => {

      let query;
      const requestQuery = {...req.query};

      // Fields to exclude
      const removeFields  = ["select", "sort"];
      // Loop over removeFields and delete them from query
      removeFields.forEach(param => delete requestQuery[param]);

      let queryString = JSON.stringify(requestQuery);
      queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
      query = Bootcamp.find(JSON.parse(queryString));

      // Select Fields
      // On URl : api/v1/bootcamps/filter?select=name, description
      // Accepted by mongoose : query.select('name description')
      if(req.query.select){
            const fields = req.query.select.split(',').join(' ');
            query = query.select(fields);
      }
      // Sort Fields
      if(req.query.sort){
            // Custom sort
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
      } else {
            // Default sort by date
            query = query.sort('-createdAt');
      }

      // console.log(queryString);
      const bootcamp = await query;  
      
      res.status(200).json({
            success: true,
            count: bootcamp.length,
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

// @desc    Delete Bootcamp
// @route   DELETE /api/v1/bootcamps/radius/:zipcode/:distance
// @access  Private
exports.getBootcampsInRadious = asyncHandler(async (req, res, next) => {
      const { zipcode, distance } = req.params;
      
      const loc = await geocoder.geocode(zipcode);   
      const lat = loc[0].latitude;
      const lng = loc[0].longitude;

      // calculate radius 
      const radius = distance / 6378; // Radius will be counted in KM
      const bootcamps = await Bootcamp.find({
            location: { $geoWithin: { $centerSphere: [ [ lng, lat ], radius ] } }
      });
      
      res.status(200).json({
            success: true,
            count: bootcamps.length,
            data: bootcamps
      })    
})