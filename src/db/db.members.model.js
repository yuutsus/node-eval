const mongoose = require("mongoose");

const membersSchema = new mongoose.Schema({
    name: {type: String, required: true},
    level: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    class: [{ type: mongoose.Schema.Types.ObjectId, ref: 'classes' }]
});

const members = mongoose.model("members",  membersSchema);

module.exports = members;