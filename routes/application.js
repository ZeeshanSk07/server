const { getAllApplications, applyApplication } = require('../controllers/applicationcontroller');
const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads/resumes');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Set the correct destination directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique file name with the correct extension
  },
});

const upload = multer({ storage: storage });


router.get('/', getAllApplications());
router.post('/apply', upload.single('resume') , applyApplication());

module.exports = router;