const express = require("express");
const route = express.Router();
const User = require("../model/User.js");

route.get("/", async (req, res) => {
  const data = await User.find();
  res.json(data);
});

route.get("/:id" ,async (req,res)=>{
    const data  = await User.findById(req.params.id)
    if(!data){
        res.send("cannot find")
    }
    else{
        res.json(data);
    }
} )

route.post("/", async (req, res) => {
  const { title, desc } = req.body;
  const newdata = new User({ title, desc });
  const savedata = await newdata.save();
  res.status(201).json(savedata);
});

route.put("/:id",async (req,res)=>{
    const {title , desc}  = req.body;
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { title, desc },
        { new: true } // Return the updated document
    );
    res.json(updatedUser)
})

route.delete("/:id", async(req,res)=>{
    const deletetask = await User.findByIdAndDelete(req.params.id)

    if (!deletetask) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });})

module.exports = route;
