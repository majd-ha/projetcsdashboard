const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const ProjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  dev: {
    type: Boolean,
    required: true,
  },
});

const Project = mongoose.model("project", ProjectSchema);
module.exports = Project;
