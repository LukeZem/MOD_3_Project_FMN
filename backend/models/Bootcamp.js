const mongoose = require("mongoose");
const { Schema } = mongoose; //ObjectId is a special data type we have to import (allows line 9 to work)

const bootcampSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        price: {type: Number, required: true},
        img: String,
        stateId: {type: Schema.Types.ObjectId, ref: "State", required: true}
    },
    {
        timestamps: true
    })

    //  bootcamp points to "bootcamps" collection
const Bootcamp = mongoose.model('Bootcamp', bootcampSchema)
module.exports = Bootcamp;