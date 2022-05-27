const router = require('express').Router();
const multer = require('multer');

const { createUser, login, getUser, updateProfilePic } = require('../controllers/userController');
const { validateUserDataMiddelware } = require('../middlewares/ValidationMiddleware');

const storage = multer.diskStorage({
  destination: './public',
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const upload = multer({ storage });

router.route('/').post(validateUserDataMiddelware, createUser);
router.route('/login').post(login);
router.route('/:id').get(getUser);
router.route('/upload').post(upload.single('image'), updateProfilePic);
module.exports = router;
