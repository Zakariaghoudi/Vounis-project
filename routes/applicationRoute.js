const express = require("express");
const applicationRouter = express.Router();
const Application = require("../models/applicationModel");
const Opportunity = require("../models/opportunityModel");
//add new Application
applicationRouter.post("/add", async (req, res) => {
  const { id_volunteer, id_opportunity, status } = req.body;
  try {
    const opportunity = await Opportunity.findById(id_opportunity);
    if (!opportunity) {
      return res.status(404).send({ msg: "opportunity not found" });
    }
    const hostId = opportunity.postedBy;
    const result = await new Application({
      id_host: hostId,
      id_volunteer: id_volunteer,
      id_opportunity: id_opportunity,
      status: status,
    });
    result.save();
    res.send(result, "Application added");
  } catch (error) {
    res.status(402).send({ msg: "try again", error });
  }
});
// get all applications
applicationRouter.get("/", async (req, res) => {
  try {
    const result = await Application.find()
      .populate("id_host", "name lastName ")
      .populate("id_volunteer", "name lastName email")
      .populate("id_opportunity", "title");

    res.send(result, "application found");
  } catch (error) {
    res.status(400).send({ msg: "no application found", error });
  }
});
// update an Application
applicationRouter.put("/:id", async (req, res) => {
  try {
    const result = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send(result, "Application updated");
  } catch (error) {
    res.status(400).send({ msg: "no updated found", error });
  }
});
// dalete an Application
applicationRouter.delete("/:id", async (req, res) => {
  try {
    const result = await Application.findByIdAndDelete(req.params.id);
    res.send(result, "Application deleted");
  } catch (error) {
    res.status(400).send({ msg: "try again", error });
  }
});
module.exports = applicationRouter;
