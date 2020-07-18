const Profile = require('../models/profile');

module.exports = {
  show,
  create,
  add,
  remove
};

async function show(req, res) {
  const profile = await Profile.findOne({ user: req.user._id });
  res.status(200).json(profile);
}

async function create(req, res) {
  const profile = await Profile.create({ user: req.user._id });
  res.status(201).json(profile);
}

async function add(req, res) {
  const profile = await Profile.findOneAndUpdate({ user: req.user._id }, { $addToSet: { list: req.body.id } }, { new: true });
  res.status(200).json(profile);
}

async function remove(req, res) {
  const profile = await Profile.findOneAndUpdate({ user: req.user._id }, { $pull: { list: req.body.id } }, { new: true });
  res.status(200).json(profile);
}