const { isValidObjectId } = require("mongoose");
const Project = require("../models/ProjectModel");

module.exports = {
  deleteProject: async (req, res) => {
    const { id } = req.params;
    if (isValidObjectId(id)) {
      const result = await Project.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).json({ error: "no blog found to delete" });
      }
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: "not a valid id" });
    }
  },

  //update a project
  updateProject: async (req, res) => {
    const { id } = req.params;
    if (isValidObjectId(id)) {
      const result = await Project.findOneAndUpdate(
        { _id: id },
        {
          ...req.body,
        },
        { new: true }
      );
      if (!result) {
        return res.status(404).json({ error: "no Project found to update" });
      }
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: "not a valid id" });
    }
  },
  getone: async (req, res) => {
    const { id } = req.params;
    if (isValidObjectId(id)) {
      const oneproject = await Project.findOne({ _id: id });
      if (oneproject) {
        res.status(200).json({ oneproject: oneproject });
      }
    } else {
      res.status(400).json({ err: "not valid project id" });
    }
  },
};
