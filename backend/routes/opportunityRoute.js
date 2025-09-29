const express = require("express");
const opportunityRouter = express.Router();
const Opportunity = require("../models/opportunityModel");

//add new opportunity
opportunityRouter.post("/add", async (req, res) => {
  const { id_host, status, description, title, skills, location } = req.body;
  try {
    const result = await new Opportunity(req.body);
    result.save();
    res.send("opportunity added", result);
  } catch (error) {
    console.log(error);
  }
});
// get all opportunities
opportunityRouter.get("/", async (req, res) => {
  try {
    const result = await Opportunity.find();
    res.send({ opportunities: result, message: "opportunities found" });
  } catch (error) {
    console.log(error);
  }
});
// update an opportunity
opportunityRouter.put("/:id", async (req, res) => {
  try {
    const result = await Opportunity.findByIdAndUpdate(req.params.id, req.body);
    res.send({ opportunity: result, message: "opportunity updated" });
  } catch (error) {
    console.log(error);
  }
});
// dalete an opportunity
opportunityRouter.delete("/:id", async (req, res) => {
  try {
    const result = await Opportunity.findByIdAndDelete(req.params.id);
    res.send({ opportunity: result, message: "opportunity deleted" });
  } catch (error) {
    console.log(error);
  }
});
module.exports = opportunityRouter;
