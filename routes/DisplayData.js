const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/fooditems', async (req, res) => {
  try {
    const foodItems = await mongoose.connection.db.collection('food_items').find().toArray();
    const foodCategories = await mongoose.connection.db.collection('foodcategory').find().toArray();
    res.status(200).json({foodItems, foodCategories});
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});







module.exports = router;