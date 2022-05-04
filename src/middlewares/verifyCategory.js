const validator = require('validator');
const { Category, Restaurant } = require('../models/index');
const mongoose = require('mongoose');

const verifyCategory = async (req, res, next) => {
    
    try{
        const errors = {
            description:null,
            restaurant:null,
        }

        if(!(req.body.description && validator.isLength(req.body.description, {min: 4, max:20}))){
            errors.description = 'Description must be between 4 and 20 characters';
        }

        if(!req.body.restaurant){
            errors.restaurant = 'Restaurant is required';
        }else{
            if(mongoose.isValidObjectId(req.body.restaurant)){
                let restaurant = await Restaurant.findById(req.body.restaurant);
                restaurant ? null : errors.restaurant = 'Restaurant is not valid';
            }
        }

        if(Object.entries(errors).some(e => e[1] != null)){
            return res.status(400).send({
                success: false,
                errors: errors
            });
        }

        return next();
    }catch{
        return res.status(500).send({
            success: false,
            errors: {
                message: "Error creating category",
            }
        });
    }
}

module.exports = verifyCategory;