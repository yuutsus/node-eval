/*
 * CRUD Operations
 */

// MODELS
const members = require("../db/db.members.model");
const classes = require("../db/db.classes.model");

// GET ALL
exports.getAll = async (req, res) => {
    let model = req.body.model;

    if (model && model === "members") {
        await members.find()
                     .exec()
                     .then(record => {
                         if (!record) {
                             return res.status(204).send("[MEMBERS] Error: No records found!")
                         }
                         res.send(record)
                     })
                     .catch((err) => {
                         res.status(500).json({
                             message: err.message || "[MEMBERS] Error: An error occurred while executing the request!"
                         })
                     });
    }

    if (model && model === "classes") {
        await classes.find()
                       .populate("participants")
                       .exec()
                       .then(record => {
                           if (!record) {
                               return res.status(204).send("[CLASSES] Error: No records found!")
                           }
                           res.send(record)
                       })
                       .catch((err) => {
                           res.status(500).json({
                               message: err.message || "[CLASSES] Error: An error occurred while executing the request!"
                           })
                       })
    }
};

// GET ONE
exports.getOne = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            message: "Error: No ID specified!"
        })
    }
    let model = req.body.model;

    if (model && model === "members") {
        await members.findById(req.params.id)
                     .then(record => {
                         if (!record) {
                             return res.status(404).send("[MEMBERS] Error: No records found!")
                         }
                         res.send(record)
                     })
                     .catch((err) => {
                         res.status(500).json({
                             message: err.message || "[MEMBERS] Error: An error occurred while executing the request"
                         })
                     })
    }
    else if (model && model === "classes") {
        await classes.findById(req.params.id)
                       .populate("participants")
                       .then(record => {
                           if (!record) {
                               return res.status(404).send("[CLASSES] Error: No records found!")
                           }
                           res.send(record)
                       })
                       .catch((err) => {
                           res.status(500).json({
                               message: err.message || "[CLASSES] Error: An error occurred while executing the request"
                           })
                       })
    }
};


// CREATE
exports.create = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: "Error: No data sent to the database!"
        })
    }

    let model = req.body.model;

    if (model && model === "members") {
        await members.create({
                         name: req.body.name,
                         level: req.body.level,
                         email: req.body.email
                     })
                     .then(() => {
                         res.json({
                             message: `[MEMBERS] Success: New user with the name ${req.body.name} added!`
                         })
                     })
                     .catch(err => {
                         res.status(500).json({
                             message: `[MEMBERS] Error: Cannot add new user! ${err}`
                         })
                     })
    }
    else if (model && model === "classes") {
        await classes.create({
                           day: req.body.day,
                           time: req.body.time
                       })
                       .then(() => {
                           res.json({
                               message: `[CLASSES] Success: New user with the name ${req.body.name} added!`
                           })
                       })
                       .catch(err => {
                           res.status(500).json({
                               message: `[CLASSES] Error: Cannot add new user! ${err}`
                           })
                       })
    }
    else {
        return res.status(400).json({
            message: `Error! Wrong model parameter!.`
        })
    }
};

// UPDATE
exports.update = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            message: "Error: No ID specified!"
        })
    }
    let model = req.body.model;

    if (model && model === "members") {
        await members.findByIdAndUpdate(req.params.id, {
                         name: req.body.name,
                         level: req.body.level,
                         email: req.body.email
                     })
                     .then((recUpd) => {
                         if (!recUpd) {
                             return res.status(404).json({
                                 message: "[MEMBERS] Error: Record not found!" + req.body.id
                             })
                         }
                         res.json(recUpd)
                     })
                     .catch((err) => {
                         if (err.kind === "ObjectID") {
                             return res.status(404).json({
                                 message: "[MEMBERS] Error: Record not found!" + req.body.id
                             })
                         }
                         return res.status(500).json({
                             message: "[MEMBERS] Error: Update not possible!" + req.body.id
                         })
                     })
    }
    else if (model && model === "classes") {
        await classes.findByIdAndUpdate(req.params.id, {
                           day: req.body.day,
                           time: req.body.time
                       })
                       .then((recUpd) => {
                           if (!recUpd) {
                               return res.status(404).json({
                                   message: "[CLASSES] Error: Record not found!" + req.body.id
                               })
                           }
                           res.json(recUpd)
                       })
                       .catch((err) => {
                           if (err.kind === "ObjectID") {
                               return res.status(404).json({
                                   message: "[CLASSES] Error: Record not found!" + req.body.id
                               })
                           }
                           return res.status(500).json({
                               message: "[CLASSES] Error: Update not possible!" + req.body.id
                           })
                       })
    }
};

// DELETE
exports.delete = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            message: "Error: No ID specified!"
        })
    }
    let model = req.body.model;

    if (model && model === "members") {
        await members.findByIdAndDelete(req.params.id)
                     .then((recUpd) => {
                         if (!recUpd) {
                             return res.status(404).json({
                                 message: "[MEMBERS] Error: Record not found!" + req.body.id
                             })
                         }
                         res.json(recUpd)
                     })
                     .catch((err) => {
                         if (err.kind === "ObjectID") {
                             return res.status(404).json({
                                 message: "[MEMBERS] Error: Record not found!" + req.body.id
                             })
                         }
                         return res.status(500).json({
                             message: "[MEMBERS] Error: Update not possible!" + req.body.id
                         })
                     })
    }
    else if (model && model === "classes") {
        await classes.findByIdAndDelete(req.params.id)
                       .then((recUpd) => {
                           if (!recUpd) {
                               return res.status(404).json({
                                   message: "[CLASSES] Error: Record not found!" + req.body.id
                               })
                           }
                           res.json(recUpd)
                       })
                       .catch((err) => {
                           if (err.kind === "ObjectID") {
                               return res.status(404).json({
                                   message: "[CLASSES] Error: Record not found!" + req.body.id
                               })
                           }
                           return res.status(500).json({
                               message: "[CLASSES] Error: Update not possible!" + req.body.id
                           })
                       })
    }
};