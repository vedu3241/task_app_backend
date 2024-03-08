const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    Text: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Task", TaskSchema);
