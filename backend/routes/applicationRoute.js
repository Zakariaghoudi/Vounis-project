const express = require("express");
const applicationRouter = express.Router();
const Application = require("../models/applicationModel");

//add new Application
applicationRouter.post("/add", async (req, res) => {
  const { id_host,
    id_volunteer,
    id_opportunity,
    status} = req.body;
  try {
    const result = await new Application(req.body);
    result.save();
    res.send("Application added", result);
  } catch (error) {
    console.log(error);
  }
});
// get all opportunities
applicationRouter.get("/", async (req, res) => {
  try {
    const result = await Application.find();
    res.send({ opportunities: result, message: "opportunities found" });
  } catch (error) {
    console.log(error);
  }
});
// update an Application
applicationRouter.put("/:id", async (req, res) => {
  try {
    const result = await Application.findByIdAndUpdate(req.params.id, req.body);
    res.send({ Application: result, message: "Application updated" });
  } catch (error) {
    console.log(error);
  }
});
// dalete an Application 
applicationRouter.delete("/:id", async (req, res) => {
    try {
        const result = await Application.findByIdAndDelete(req.params.id);
        res.send({ Application: result, message: "Application deleted" }); 
    } catch (error) {
        console.log(error);
    }
});
module.exports = applicationRouter;
