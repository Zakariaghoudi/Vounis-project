const mongoose = require("mongoose");
const schema = mongoose.Schema;

const opportunitySchema = new schema(
  {
    id_host: {
      type: String,
      require: true  
    },

    status: {
      type: String,
      enum: ['closed' , 'open'],
      default: "open",
    },
    image: String,
    title: {
       type: String,
        require: true },
    description: String,
    skills: String,
    location: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Opportunity", opportunitySchema);
