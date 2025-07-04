
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ POST: Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Input validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('❌ Error during registration:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ GET: Fetch all users (without passwords)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    console.error('❌ Error fetching users:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;




// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');

// // 👉 POST: Register a new user
// router.post('/register', async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return res.status(409).json({ message: 'Email already exists' });
//   }

//   const user = new User({ name, email, password });
//   await user.save();
//   res.status(201).json({ message: 'User registered successfully' });
// });



// router.get('/users', async (req, res) => {
//   try {
//     const users = await User.find().select('-password'); // hide password
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;

