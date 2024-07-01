const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.login = (req, res) => {
  const { username, password } = req.body;

  console.log('Login attempt:', { username, password });

  User.findByUsername(username, (user) => {
    if (!user) {
      console.log('User not found:', username);
      return res.status(404).send('User not found');
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        throw err;
      }
      if (!result) {
        console.log('Invalid password for user:', username);
        return res.status(401).send('Invalid password');
      }

      const token = jwt.sign({ id: user.id, role: user.role }, 'secretkey', { expiresIn: '1h' });
      console.log('Login successful for user:', username);
      res.json({ token, role: user.role });
    });
  });
};

exports.register = async (req, res) => {
  const { username, email, password, phone_number, address, gender, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username,
      email,
      password: hashedPassword,
      phone_number,
      address,
      gender,
      role
    };

    User.createUser(newUser, (userId) => {
      res.status(201).send('User registered');
    });
  } catch (err) {
    res.status(500).send('Error registering user');
  }
};
