const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const bodyParser = require("body-parser");
require("dotenv").config();
const { loginUser, signupUser } = require("./controllers/userController");
const {
  updateProject,
  deleteProject,
  getone,
} = require("./controllers/ProjectController");
const path = require("path");
const Project = require("./models/ProjectModel");
const cors = require("cors");
const requireAuth = require("./requirAuth");
const app = express();
app.use(
  cors({
    origin: [
      "https://dashboard-6sko.onrender.com",
      "https://majd-ha.github.io",
    ],
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.post("/login", loginUser);

const Storage = multer.diskStorage({
  destination: "public/images",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const uploadimg = multer({
  storage: Storage,
}).single("imgfile");

app.get("/", async (req, res) => {
  const project = await Project.find({});
  res.status(200).json({ projects: project });
});
app.use(requireAuth);
app.patch("/modify/:id", updateProject);
app.post("/delete/:id", deleteProject);
app.get("/getone/:id", getone);
app.post("/addproject", async (req, res) => {
  uploadimg(req, res, (err) => {
    if (err) {
      console.log("error");
    } else {
      const project = new Project({
        name: req.body.name,
        description: req.body.description,
        link: req.body.link,
        img: req.file.filename,
        dev: req.body.dev,
      });
      project
        .save()
        .then(() => res.json({ pro: project }))
        .catch((err) => res.json({ err: err }));
    }
  });
});
mongoose.connect(process.env.CONSTRING).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
  });
});
