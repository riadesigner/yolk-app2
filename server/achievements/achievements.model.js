const { Schema, model } = require('mongoose');
const achievementsModel = new Schema({
  name: String,
  experience: { type: Number, default: 0 },
});

module.exports = model('Achievements', achievementsModel);
