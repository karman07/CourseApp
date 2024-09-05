const express = require('express');
const router = express.Router();
const Alumni = require('../models/Alumni');


router.post('/', async (req, res) => {
  const alumni = new Alumni(req.body);
  try {
    await alumni.save();
    res.status(201).send(alumni);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.get('/', async (req, res) => {
  try {
    const alumni = await Alumni.find();
    res.status(200).send(alumni);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.put('/:id', async (req, res) => {
  try {
    const alumni = await Alumni.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(alumni);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await Alumni.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Alumni deleted' });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
