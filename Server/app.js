const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = require("./router/UserRoute")
const cors = require("cors")
app.use(cors())
app.use(express.json())

app.use("/api/task",router)


mongoose.connect("mongodb+srv://")
.then(()=>{
    console.log("DB Connected Sucessfully")
}).catch(()=>{
    console.log("error in DB Connecting")
})
app.listen(1000);
