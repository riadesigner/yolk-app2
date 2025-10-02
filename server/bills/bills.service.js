const BillsModel = require('./bills.model');
const AppError = require('../middleware/AppError');

exports.create = async function (billCreateDto = {}) {
  try {
    return await BillsModel.create(billCreateDto);
  } catch (err) {
    throw new AppError(err, 500);
  }
};

exports.count = async function (opt = {}) {
  try {
    return await BillsModel.countDocuments(opt);
  } catch (err) {
    console.log('BillsService err:', err);
    return 0;
  }
};

exports.find = async function (opt = {}, populateCompanies = false) {
  try {
    let query = BillsModel.find(opt);

    if (populateCompanies) {
      query = query
        .populate({
          path: 'receiver',
          populate: {
            path: 'userCompany',
            model: 'Company',
          },
        })
        .populate({
          path: 'sender',
          populate: {
            path: 'userCompany',
            model: 'Company',
          },
        })
        .populate({
          path: 'order',
          populate: {
            path: 'contractor',
            model: 'Users',
          },
        });
    }

    return await query;
  } catch (err) {
    console.log('BillsService err:', err);
    return [];
  }
};

exports.findByReceiverId = async function (receiverId) {
  try {
    const opt = { receiver: receiverId };
    const sort = { createdAt: -1 };
    return await BillsModel.find(opt)
      .sort(sort)
      .populate({
        path: 'receiver',
        populate: {
          path: 'userCompany',
          model: 'Company',
        },
      })
      .populate({
        path: 'sender',
        populate: {
          path: 'userCompany',
          model: 'Company',
        },
      })
      .populate({
        path: 'order',
        populate: {
          path: 'contractor',
          model: 'Users',
        },
      });
  } catch (err) {
    console.error(err);
    return [];
  }
};

exports.findById = async function (id) {
  try {
    return await BillsModel.findById(id)
      .populate({
        path: 'receiver',
        populate: {
          path: 'userCompany',
          model: 'Company',
        },
      })
      .populate({
        path: 'sender',
        populate: {
          path: 'userCompany',
          model: 'Company',
        },
      })
      .populate({
        path: 'order',
        populate: {
          path: 'contractor',
          model: 'Users',
        },
      });
  } catch (err) {
    console.error(err);
    return null;
  }
};
