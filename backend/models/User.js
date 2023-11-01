const mongoose = require("mongoose");
const { Schema } = mongoose; //ObjectId is a special data type we have to import (allows line 9 to work)

const UserSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true}
    },
    {
        timestamps: true
    })

    //  bootcamp points to "bootcamps" collection
const User = mongoose.model('User', UserSchema)
module.exports = User;