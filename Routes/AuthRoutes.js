const express = require("express");
const router = express.Router();
const AuthController= require("../Controllers/AuthController")
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname);
  },
});
const upload = multer({ storage });

router.post("/register", upload.single('image'),AuthController.register);

router.post("/login",AuthController.login);

module.exports = router;