const mongoose = require("mongoose");
const schema = mongoose.Schema;

const opportunitySchema = new schema(
  {
    id_host: String,
    status: {
      type: String,
      enum: ['closed' , 'open'],
      default: "open",
    },
    title: { type: String, required: true },
    description: String,
    skills: String,
    location: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Opportunity", opportunitySchema);
