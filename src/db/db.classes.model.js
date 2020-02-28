const mongoose = require("mongoose");

const classesSchema = new mongoose.Schema({
    class: {type: String, required: true},
    date: {type: String, required: true},
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'members' }]
});

const classes = mongoose.model("classes",  classesSchema);

module.exports = classes;