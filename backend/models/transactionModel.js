const mongoose = require("mongoose");

const transectionModel = mongoose.model("transections", transectionSchema);
module.exports = transectionModel;