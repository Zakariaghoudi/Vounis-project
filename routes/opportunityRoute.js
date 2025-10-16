const express = require("express");
const opportunityRouter = express.Router();
const Opportunity = require("../models/opportunityModel");

//add new opportunity
opportunityRouter.post("/add", async (req, res) => {
  try {
  const { id_host, status, description, title, skills, location } = req.body
  const result =  await new Opportunity(req.body);
    await result.save();
    res.send("your opportunity added", result);
  } catch (error) {
   res.status(402).send({msg :"try again",error});
  console.log(error)
  }
});
// get all opportunities
opportunityRouter.get("/", async (req, res) => {
  try {
    const result = await Opportunity.find();
    res.send({opportunities : result, msg : "opportunities found"} );
  } catch (error) {
    console.log(error);
  }
});
// update an opportunity
opportunityRouter.put("/:id", async (req, res) => {
  try {
    const result = await Opportunity.findByIdAndUpdate(req.params.id, req.body);
    res.send( result,  "opportunity updated" );
  } catch (error) {
    console.log(error);
  }
});
// dalete an opportunity
opportunityRouter.delete("/:id", async (req, res) => {
  try {
    const result = await Opportunity.findByIdAndDelete(req.params.id);
    res.send( result, "opportunity deleted" );
  } catch (error) {
    console.log(error);
  }
});
module.exports = opportunityRouter;
