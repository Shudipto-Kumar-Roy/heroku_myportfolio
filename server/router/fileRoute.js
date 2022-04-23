const express = require("express");
const {
  uploadFileController,
  getFileController,
  deleteFileController,
} = require("../controller/fileController");
const router = express.Router();

router.post("/upload/pdf", uploadFileController);
router.get("/pdffile", getFileController);
router.delete("/delete/resume/:id", deleteFileController);

module.exports = router;
