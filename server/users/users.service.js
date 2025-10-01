const UsersModel = require('./users.model');
const userInfoService = require('../userinfo/userinfo.service');

exports.findById = function (id) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res) => {
    try {
      const user = await UsersModel.findById(id)
        .populate('userInfo')
        .populate('userCompany')
        .populate('contractsByContractor');
      res(user);
    } catch (e) {
      console.log(`cant find user by id ${id}, err: ${e.message || e}`);
      res(null);
    }
  });
};

exports.findDesigners = async function () {
  try {
    const designers = await UsersModel.find({
      role: 'designer',
    }).populate('userInfo');
    return designers;
    // eslint-disable-next-line no-unused-vars
  } catch (err) {
    return [];
  }
};

exports.update = function (id, userUpdateDto) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res) => {
    console.log('userUpdateDto', userUpdateDto);

    const { updatedAt: _updated, createdAt: _created, ...data } = userUpdateDto;

    try {
      const userUpdated = await UsersModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      res(userUpdated);
    } catch (e) {
      console.log(`cant find user by id ${id}, err: ${e.message || e}`);
      res(null);
    }
  });
};

exports.create = function (userData, infoData = {}) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res) => {
    try {
      // 1. Создаём userInfo
      const newUserInfo = await userInfoService.create(infoData);
      // 2. Создаём user с привязкой к userInfo._id
      const newUser = await UsersModel.create({
        ...userData,
        userInfo: newUserInfo._id,
      });
      res(newUser);
    } catch (e) {
      console.log(`cant create new user, err: ${e}`);
      res(null);
    }
  });
};

exports.findByEmail = function (email) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res) => {
    try {
      const user = await UsersModel.findOne({ email: email })
        .populate('userInfo')
        .populate('userCompany')
        .populate('contracts');
      res(user);
    } catch (e) {
      console.log(`cant find user by id ${email}, err:${e.message || e}`);
      res(null);
    }
  });
};
