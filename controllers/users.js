const User = require('../models/user');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  collect,
  remove
};

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).json({err: 'bad credentials'});
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function collect(req, res, next) {
  if (req.user) return next();
  try {
    const newCollected = [...user.collected];
    newCollected.push(req.body.id);
    newCollected.sort();
    user.collected = [...newCollected];
    user.save();
    return res.status(201).json(newCollected);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function remove(req, res, next) {
  if (req.user) return next();
  try {
    const newCollected = [...user.collected];
    newCollected.filter(e => e !== req.body.id);
    user.collected = [...newCollected];
    user.save();
    return res.status(201).json(newCollected);
  } catch (err) {
    return res.status(400).json(err);
  }
}

// HELPER FUNCTION

function createJWT(user) {
  return jwt.sign(
    { user },
    SECRET,
    { expiresIn: '24h' }
  );
}