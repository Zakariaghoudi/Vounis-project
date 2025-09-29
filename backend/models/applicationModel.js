const mongoose = require("mongoose");
const schema = mongoose.Schema;

const applicationSchema = new schema(
  {
    id_host: String,
    id_volunteer: String,
    id_opportunity: String,
    status: {
      type: String,
      enum: ["accepted", "rejected"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Application", applicationSchema);
