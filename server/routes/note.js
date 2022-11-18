const express = require('express');
const Note = require('../models/note');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const notes =  Note.getNotes();
      res.send(notes);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  });




  
module.exports = router;