const Profile = require('../models/profile');

module.exports = {
  show,
  create,
  add,
  remove
};

async function show(req, res) {
  const profile = await Profile.findOne({ id: req.user._id });
  res.status(200).json(profile);
}

async function create(req, res) {
  const profile = await Profile.create({ user: req.user._id });
  res.status(201).json(profile);
}

async function add(req, res) {
  const profile = await Profile.findOne({ id: req.user._id });
  profile.list.push(req.body.pokeId);
  profile.list.sort();
  profile.save();
  res.status(200).json(profile);
}

async function remove(req, res) {
  const profile = await Profile.findOne({ id: req.user._id });
  profile.list.splice(profile.list.indexOf(req.body.pokeId), 1);
  profile.save();
  res.status(200).json(profile);
}