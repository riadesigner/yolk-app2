const UserInfoModel = require('./userinfo.model');

exports.create = function (userinfoCreateDto = {}) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res) => {
    try {
      res(await UserInfoModel.create(userinfoCreateDto));
    } catch (e) {
      console.log(`cant create new userinfo, err:${e}`);
      res(null);
    }
  });
};

exports.update = function (id, userInfoUpdateDto = {}) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res) => {
    const {
      updatedAt: _updated,
      createdAt: _created,
      ...data
    } = userInfoUpdateDto;

    try {
      const userInfoUpdated = await UserInfoModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      res(userInfoUpdated);
    } catch (e) {
      console.log(`cant update userInfo ${id}, err:${e}`);
      res(null);
    }
  });
};

exports.increaseExperience = function (id, experience) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res) => {
    try {
      const userInfoUpdated = await UserInfoModel.findByIdAndUpdate(
        id,
        { $inc: { experience } },
        { new: true },
      );
      res(userInfoUpdated);
    } catch (e) {
      console.log(`cant update userInfo ${id}, err:${e}`);
      res(null);
    }
  });
};
