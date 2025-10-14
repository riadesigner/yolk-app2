const AchievementsModel = require('./achievements.model');
const AchievementsComplteModel = require('./achievementComplete.model');

exports.create = async (achievement) => {
  return AchievementsModel.create(achievement);
};

exports.findAchievements = async (query) => {
  return AchievementsModel.find(query);
};

exports.findAchievementByName = async (name) => {
  return AchievementsModel.findOne({ name });
};

exports.getCompleteAchievementByNameForUserInfo = async (
  userInfoId,
  achievementName,
) => {
  return AchievementsComplteModel.findOne({
    userInfoId,
    achievementId: await AchievementsModel.findOne({
      name: achievementName,
    }).then((achievement) => achievement._id),
  });
};

exports.createCompleteAchievementForUserInfo = async (
  userInfoId,
  achievementName,
) => {
  return AchievementsComplteModel.create({
    userInfoId,
    achievementId: await AchievementsModel.findOne({
      name: achievementName,
    }).then((achievement) => achievement._id),
  });
};
