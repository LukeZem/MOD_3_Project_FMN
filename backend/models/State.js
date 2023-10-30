const mongoose = require("mongoose");

const bootcampSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, minLength: 2, maxLength: 2},
        tax: {type: Number, required: true},
        tuitionAssistanceProgram: {type: Boolean, required: true}
    },
    {
        timestamps: true
    })
//  bootcamp points to "bootcamps" collection
const State = mongoose.model('State', bootcampSchema)
module.exports = State;