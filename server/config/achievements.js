const AchievementsService = require('../achievements/achievements.service');
module.exports = async () => {
  const addAchievements = async () => {
    const arr = ['complete_portfolio', 'complete_hard_skills'];
    for (const achievement of arr) {
      await AchievementsService.create(
        typeof achievement === 'string'
          ? { name: achievement, experience: 10 }
          : achievement,
      );
    }
  };
  const achievements = await AchievementsService.findAchievements({});
  if (!achievements || achievements.length === 0) {
    await addAchievements();
  }
};
