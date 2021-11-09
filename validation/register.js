const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data){
    let errors = {};

    //Converts empty fields to empty strings so we can use validator functions
    //Ternary operation that checks properties of the schema that we passed in
        //If it's not empty, the value is set to what was passed. If it is, an empty string is stored in its place. 
        //Could probably make this into a function using a for loop to iterate over properties... lots of reused code

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    //The following are validation checks for each field

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    } 

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be between 6 and 30 characters";
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}