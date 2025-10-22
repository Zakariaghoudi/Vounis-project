const mongoose = require("mongoose");
const schema = mongoose.Schema;

const applicationSchema = new schema(
  {
    id_host: {
      type : mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    id_volunteer:  {
      type : mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    id_opportunity:  {
      type : mongoose.Schema.Types.ObjectId,
      ref: 'Opportunity'
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default : "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Application", applicationSchema);
