const OrdersModel = require('./orders.model');
const OrdersViewsModel = require('./orderViews.model');
const paginate = require('../utils/paginate');
const AppError = require('../middleware/AppError');

exports.create = function (orderCreateDto = {}) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res) => {
    try {
      res(await OrdersModel.create(orderCreateDto));
    } catch (e) {
      console.log(`cant create new userinfo, err:${e}`);
      res(null);
    }
  });
};

// ----------------------
// search with pagination
// ----------------------
exports.findAll = function (opt = {}) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res) => {
    console.log('opt = ', opt);

    // по умолчанию = сортировка по дате
    const sort = opt.sort || { createdAt: -1 };
    const categories = opt.categories || [];

    const query = {};

    if (categories.length > 0) {
      query.categories = { $in: categories };
    }

    if (opt.userInput) {
      const regex = new RegExp(opt.userInput, 'i'); // 'i' - ignore case
      query.$or = [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
        { tags: { $in: [regex] } },
      ];
    }

    try {
      const populate = ['company', 'contractor', 'viewsCount'];
      if (opt.withBills) {
        populate.push('bills');
      }

      const result = await paginate(OrdersModel, query, {
        page: opt.page,
        limit: opt.limit,
        sort: sort,
        populate,
      });
      res(result);
    } catch (e) {
      console.log(`orders not found, err:${e}`);
      res({ data: [], pagination: null });
    }
  });
};

exports.find = function (opt = {}) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res) => {
    try {
      res(await OrdersModel.find(opt));
    } catch (e) {
      console.log(`not found orders for company ${opt.companyId}, err:${e}`);
      res(null);
    }
  });
};

exports.findById = function (id) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res) => {
    try {
      res(
        await OrdersModel.findById(id)
          .populate({
            path: 'company',
            populate: { path: 'user', model: 'Users', justOne: true },
          })
          .populate('contractor')
          .populate('viewsCount'), // ← это вернет число из виртуального count
      );
    } catch (e) {
      console.log(`not found order ${id}, err:${e}`);
      res(null);
    }
  });
};

exports.addRespond = function (orderId, userId) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res) => {
    try {
      const order = await OrdersModel.findById(orderId);

      if (order.responded.includes(userId)) {
        res(null);
      }

      const updatedOrder = await OrdersModel.findByIdAndUpdate(
        orderId,
        {
          responded: [...order.responded, userId],
        },
        { new: true },
      );
      res(updatedOrder);
    } catch (e) {
      console.log(`cant update order, err:${e}`);
      res(null);
    }
  });
};

exports.setContractor = async function (orderId, contractorId) {
  try {
    const order = await OrdersModel.findById(orderId);

    if (!order.responded.includes(contractorId)) {
      throw new AppError(
        `нельзя назначить исполнителем пользователя ${contractorId}, который не откликался на заказ ${orderId}`,
        400,
      );
    }

    const updatedOrder = await OrdersModel.findByIdAndUpdate(
      orderId,
      {
        contractor: contractorId,
        status: 'HAS_CONTRACTOR',
      },
      { new: true },
    );
    return updatedOrder;
  } catch (err) {
    throw new AppError(err, 500);
  }
};

exports.update = function (id, orderUpdateDto = {}) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res) => {
    try {
      const updatedOrder = await OrdersModel.findByIdAndUpdate(
        id,
        orderUpdateDto,
        { new: true },
      ).populate({
        path: 'contractor',
        populate: { path: 'userInfo', model: 'UserInfo' },
      });
      res(updatedOrder);
    } catch (e) {
      console.error(`cant update order, err:${e}`);
      res(null);
    }
  });
};

exports.deleteFromFiles = function (id, fileKey) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res) => {
    try {
      const order = await OrdersModel.findById(id);
      const newFiles = (order.files || []).filter((i) => i.key !== fileKey);

      const updatedOrder = await OrdersModel.findByIdAndUpdate(
        id,
        { files: newFiles },
        { new: true },
      );
      res(updatedOrder);
    } catch (e) {
      console.log(`can not update order with id ${id}, err:${e}`);
      res(null);
    }
  });
};

exports.deleteById = async function (orderId) {
  try {
    const result = await OrdersModel.findByIdAndDelete(orderId);
    if (!result) {
      throw new AppError('Заказ не найден', 404);
    }
    return result;
  } catch (err) {
    throw new AppError(err, 500);
  }
};

exports.recordView = async function (orderId, userId) {
  try {
    await OrdersViewsModel.updateOne(
      { orderId, userId },
      { $setOnInsert: { viewedAt: new Date() } },
      { upsert: true },
    );
    return true;
  } catch (err) {
    // На случай гонки: дубликат по уникальному индексу — значит запись уже существует
    if (err && err.code === 11000) {
      return true;
    }
    console.log('cant record order view, err:', err);
    return false;
  }
};

exports.updateStatus = async function (id, status) {
  const order = await OrdersModel.findById(id);
  if (!order) {
    throw new AppError('Заказ не найден', 404);
  }
  order.status = status;
  await order.save();
  return order;
};
