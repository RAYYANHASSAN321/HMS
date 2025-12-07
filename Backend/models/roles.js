const mongoose = require('mongoose')
const Role = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
        trim: true,
        lowercase : true
    }

});

const Roles = mongoose.model('roles' , Role);
module.exports = Roles

