const MessagesModel = require('./messages.model');

exports.findByChatId = async (chatId, options = {}) => {
  const {
    limit = 10,
    offset = 0,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = options;

  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  return MessagesModel.find({ chatId }).sort(sort).skip(offset).limit(limit);
};

exports.create = async (message) => {
  return MessagesModel.create(message);
};
