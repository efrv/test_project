const {validationResult} = require("express-validator");

exports.validatorErrorHandling = (req, res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            //console.log(errors.array())
            res.status(400).json({ errors: errors.array() });
            return true
        }
        return false
}
