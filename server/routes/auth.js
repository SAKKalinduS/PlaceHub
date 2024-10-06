const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const User = require('../models/User');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

router.post('/register', upload.single('profileImage'), async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const profileImage = req.file;
        if (!profileImage) {
            return res.status(400).json({ message: 'Profile image is required' });
        }
        const profileImagePath = profileImage.path;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profileImagePath,
        });

        await newUser.save();

        res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Registration Failed!!", error: error.message });
    }
});

module.exports = router;