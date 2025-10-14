const AchievementsCompleteModel = require('./achievementComplete.model');

exports.create = async (userInfoId, achievementId) => {
  return AchievementsCompleteModel.create({ userInfoId, achievementId });
};

exports.find = async (query) => {
  return AchievementsCompleteModel.find(query);
};

exports.findOrCreate = async (userInfoId, achievementId) => {
  return AchievementsCompleteModel.findOneAndUpdate(
    { userInfoId, achievementId },
    { $setOnInsert: { userInfoId, achievementId } },
    { upsert: true, new: true },
  );
};
