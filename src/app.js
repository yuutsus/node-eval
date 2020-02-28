/*
 * Job-Dating Application [Main File]
 */

const express = require("express");
const app = express();
const PORT = 4000;
const connectDB = require("./db/db.connect");
const parser = require("body-parser");
const crud = require("./api/api.crud");

app.use(parser.urlencoded({extended: true}));
app.use(parser.json());
app.listen(PORT, () => {
    console.log(`Port: ${PORT}`);
    connectDB().then(() => {console.log("Success: Connected to the database!")}).catch((e) => {console.log(`Error: Cannot connect to the database! ${e}`)});
});
app.get("/", (req, res) => {
    res.send("<h1> Olivier is a cool guy! </h1>");
});

app.get("/api/getAll", crud.getAll);
app.get("/api/getOne/:id", crud.getOne);
app.post("/api/create", crud.create);
app.put("/api/update/:id", crud.update);
app.delete("/api/delete/:id", crud.delete);