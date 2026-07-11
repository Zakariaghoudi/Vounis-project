const express = require("express");
const opportunityRouter = express.Router();
const Opportunity = require("../models/opportunityModel");
const isAuth = require("../middleware/passport");

// add new opportunity - must be logged in, only host/admin can post
opportunityRouter.post("/add", isAuth(), async (req, res) => {
  try {
    if (!["host", "admin"].includes(req.user.role)) {
      return res.status(403).send({ msg: "Only hosts can post opportunities" });
    }
    const { status, description, title, skills, location, image } = req.body;
    const result = new Opportunity({
      postedBy: req.user._id, // never trust the client for this
      status,
      description,
      title,
      skills,
      location,
      image,
    });
    await result.save();
    res.status(201).send({ opportunity: result, msg: "your opportunity added" });
  } catch (error) {
    console.log(error);
    res.status(402).send({ msg: "try again", error: error.message });
  }
});

// get all opportunities - public
opportunityRouter.get("/", async (req, res) => {
  try {
    const result = await Opportunity.find().populate('postedBy', 'name lastName profilePhoto');
    res.send({ opportunities: result, msg: "opportunities found" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "cannot get opportunities", error: error.message });
  }
});

// update an opportunity - only the host who owns it, or an admin
opportunityRouter.put("/:id", isAuth(), async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) {
      return res.status(404).send({ msg: "opportunity not found" });
    }
    const isOwner = opportunity.postedBy?.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== "admin") {
      return res.status(403).send({ msg: "Access denied" });
    }
    const { postedBy, ...safeUpdates } = req.body; // never let the client change ownership
    const result = await Opportunity.findByIdAndUpdate(req.params.id, safeUpdates, { new: true });
    res.send({ opportunity: result, msg: "opportunity updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "cannot update opportunity", error: error.message });
  }
});

// delete an opportunity - only the host who owns it, or an admin
opportunityRouter.delete("/:id", isAuth(), async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) {
      return res.status(404).send({ msg: "opportunity not found" });
    }
    const isOwner = opportunity.postedBy?.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== "admin") {
      return res.status(403).send({ msg: "Access denied" });
    }
    const result = await Opportunity.findByIdAndDelete(req.params.id);
    res.send({ opportunity: result, msg: "opportunity deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "cannot delete opportunity", error: error.message });
  }
});

module.exports = opportunityRouter;
