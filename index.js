//---------- imporation ------------
const applicationRouter = require("./routes/applicationRoute");
const opportunityRouter = require("./routes/opportunityRoute");
const authUser = require("./routes/authUser");
const connect = require("./config/configDB");
const express = require("express");
const app = express();
const cors = require("cors");

//------------- connect to MONGO database ----------
connect();

// ------------middleware------------
app.use(express.json());
app.use(cors());

// ------------ use router ----------

app.use("/user", authUser);
app.use("/opportunities", opportunityRouter);
app.use("/applications", applicationRouter);

//------------- running server ----------
const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`server is running in port ${PORT}`);
});
