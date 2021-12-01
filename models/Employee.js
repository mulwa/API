const mongoose = require("mongoose");

const Emp = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  EmployeeName: String,
});
module.exports = mongoose.model("Emp", Emp);
