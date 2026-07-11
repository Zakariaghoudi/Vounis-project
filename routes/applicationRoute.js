const express = require("express");
const applicationRouter = express.Router();
const Application = require("../models/applicationModel");
const Opportunity = require("../models/opportunityModel");
const isAuth = require("../middleware/passport");

// add new Application - must be logged in, only volunteers can apply
applicationRouter.post("/add", isAuth(), async (req, res) => {
  try {
    if (req.user.role !== "volunteer") {
      return res.status(403).send({ msg: "Only volunteers can apply" });
    }
    const { id_opportunity } = req.body;
    const opportunity = await Opportunity.findById(id_opportunity);
    if (!opportunity) {
      return res.status(404).send({ msg: "opportunity not found" });
    }
    const existing = await Application.findOne({
      id_opportunity,
      id_volunteer: req.user._id,
    });
    if (existing) {
      return res.status(400).send({ msg: "You already applied to this opportunity" });
    }
    const result = new Application({
      id_host: opportunity.postedBy,
      id_volunteer: req.user._id, // never trust the client for this
      id_opportunity,
    });
    await result.save();
    res.status(201).send({ application: result, msg: "Application added" });
  } catch (error) {
    res.status(402).send({ msg: "try again", error: error.message });
  }
});

// get applications - scoped to the logged-in user
applicationRouter.get("/", isAuth(), async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === "host") {
      filter = { id_host: req.user._id };
    } else if (req.user.role === "volunteer") {
      filter = { id_volunteer: req.user._id };
    } // admin: no filter, sees everything

    const result = await Application.find(filter)
      .populate("id_host", "name lastName")
      .populate("id_volunteer", "name lastName email")
      .populate("id_opportunity", "title");

    res.send({ applications: result, msg: "application found" });
  } catch (error) {
    res.status(400).send({ msg: "no application found", error: error.message });
  }
});

// update an Application (accept/reject) - only the host it was made to, or an admin
applicationRouter.put("/:id", isAuth(), async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).send({ msg: "application not found" });
    }
    const isOwnerHost = application.id_host?.toString() === req.user._id.toString();
    if (!isOwnerHost && req.user.role !== "admin") {
      return res.status(403).send({ msg: "Access denied" });
    }
    const { status } = req.body; // only the status should be editable here
    const result = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.send({ application: result, msg: "Application updated" });
  } catch (error) {
    res.status(400).send({ msg: "no updated found", error: error.message });
  }
});

// delete an Application - only the volunteer who applied, or an admin
applicationRouter.delete("/:id", isAuth(), async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).send({ msg: "application not found" });
    }
    const isOwnerVolunteer = application.id_volunteer?.toString() === req.user._id.toString();
    if (!isOwnerVolunteer && req.user.role !== "admin") {
      return res.status(403).send({ msg: "Access denied" });
    }
    const result = await Application.findByIdAndDelete(req.params.id);
    res.send({ application: result, msg: "Application deleted" });
  } catch (error) {
    res.status(400).send({ msg: "try again", error: error.message });
  }
});

module.exports = applicationRouter;
