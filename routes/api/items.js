const express = require('express');
const router = express.Router();

const Item = require('../../models/Item');

// DEALING WITH GET REQUEST
// @route   GET api/items
// @desc    GET all items
// @access  public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
    .catch(err => console.log(err))
});


// DEALING WITH POST REQUEST
// @route   POST api/items
// @desc    Create An Item
// @access  public
router.post('/', (req, res, next) => {
  const {
    name,
    picture
  } = req.body;
  if(!name) {
    next(err.noName)
  }
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.json(item));
});


// DELETING
// @route   DELETE api/items:id
// @desc    Delete an item
// @access  public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success:true })))
    .catch(err => res.status(404).json({success:false}));
});

module.exports = router;
