const PortfoliosModel = require('./portfolios.model');
const AppError = require('../middleware/AppError');

const AWS = require('aws-sdk');

// Настройка S3 клиента для Yandex Cloud
const s3 = new AWS.S3({
  endpoint: process.env.YANDEX_ENDPOINT,
  region: process.env.YANDEX_REGION,
  accessKeyId: process.env.YANDEX_ACCESS_KEY_ID,
  secretAccessKey: process.env.YANDEX_SECRET_ACCESS_KEY,
});

exports.create = function (portfolioCreateDto = {}) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res) => {
    const userId = portfolioCreateDto.designer;

    if (!userId) {
      console.log(`designer (userId) is required`);
      res(null);
    }

    console.log(`пробуем сохранить проект`, portfolioCreateDto);

    try {
      const newPortfolio = await PortfoliosModel.create(portfolioCreateDto);
      res(newPortfolio);
    } catch (e) {
      console.log(`cant create portfolio fo userId ${userId}, err:${e}`);
      res(null);
    }
  });
};

exports.update = async function (portfolioId, portfolioUpdateDto = {}) {
  const {
    updatedAt: _updatedAt,
    createdAt: _createdAt,
    ...data
  } = portfolioUpdateDto;
  try {
    return await PortfoliosModel.findByIdAndUpdate(portfolioId, data, {
      new: true,
    });
  } catch (err) {
    throw new AppError(`cant update portfolio ${err}`, 500);
  }
};

exports.findByUserId = async function (userId) {
  try {
    return await PortfoliosModel.find({ designer: userId });
    // eslint-disable-next-line no-unused-vars
  } catch (err) {
    return [];
  }
};

exports.findById = function (portfolioId) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res) => {
    try {
      const p =
        await PortfoliosModel.findById(portfolioId).populate('designer');
      res(p);
    } catch (err) {
      console.log(`not found portfolio with id ${portfolioId}, err:${err}`);
      res(null);
    }
  });
};

exports.deleteById = async function (portfolioId) {
  try {
    const result = await PortfoliosModel.findByIdAndDelete(portfolioId);
    if (!result) {
      throw new AppError('Портфолио не найдено', 404);
    }
    return result;
  } catch (err) {
    throw new AppError(err, 500);
  }
};

exports.deleteFromImages = async function (portfolioId, imageKey) {
  try {
    // delete from cloud
    const params = {
      Bucket: process.env.YANDEX_BUCKET_NAME,
      Key: imageKey,
    };
    await s3.deleteObject(params).promise();

    // delete from db
    const portfolio = await PortfoliosModel.findById(portfolioId);
    const newImages = (portfolio.images || []).filter(
      (i) => i.key !== imageKey,
    );

    return await PortfoliosModel.findByIdAndUpdate(
      portfolioId,
      { images: newImages },
      { new: true },
    );
  } catch (err) {
    throw new AppError(err, 500);
  }
};

exports.count = async function (query) {
  try {
    return await PortfoliosModel.countDocuments(query);
  } catch (err) {
    throw new AppError(err, 500);
  }
};
