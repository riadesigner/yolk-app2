const { Schema, model } = require('mongoose');

const achievementCompleteModel = new Schema({
  userInfoId: {
    type: Schema.Types.ObjectId,
    ref: 'UserInfo',
  },
  achievementId: {
    type: Schema.Types.ObjectId,
    ref: 'Achievement',
  },
});

achievementCompleteModel.index(
  { userInfoId: 1, achievementId: 1 },
  { unique: true },
);

module.exports = model('AchievementComplete', achievementCompleteModel);
