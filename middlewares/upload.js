const multer = require("multer");
const path = require("path");

// Set up storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directory to save images
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = path.extname(file.originalname).toLowerCase();

  // Check if the file extension matches the allowed types
  if (allowedTypes.test(extname)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only images are allowed"), false); // Reject the file
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
