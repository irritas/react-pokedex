const List = require('../models/list');

module.exports = {
  index,
  show,
  add,
  remove
};

async function index(req, res) {
  const lists = await List.find({ users: req.user._id }).sort('pokemon');
  res.status(200).json(lists);
}

async function show(req, res) {
  const list = await List.findOne({ pokemon: req.params.id });
  res.status(200).json(list);
}

async function add(req, res) {
  const updatedList = await List.findOneAndUpdate({ pokemon: req.params.id }, { $addToSet: { users: req.user._id }, pokemon: req.params.id }, { upsert: true, new: true });
  res.status(200).json(updatedList);
}

async function remove(req, res) {
  const updatedList = await List.findOneAndUpdate({ pokemon: req.params.id }, { $pull: { users: req.user._id } }, { new: true });
  res.status(200).json(updatedList);
}