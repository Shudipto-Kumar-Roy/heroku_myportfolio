const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({
  url: process.env.DB_URL,
  file: (request, file) => {
    const match = ["image/png", "image/jpg", "image/jpeg"];
    if (match.indexOf(file.mimetype) === -1) {
      return `${Date.now()}-project-${file.originalname}`;
    }
    return {
      bucketName: "photos",
      filename: `${Date.now()}-project-${file.originalname}`,
    };
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
