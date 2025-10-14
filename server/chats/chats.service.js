const ChatsModel = require('./chats.model');

exports.create = async (chat) => {
  return ChatsModel.create(chat);
};

exports.findById = async (id) => {
  return ChatsModel.findById(id).populate('users');
};

exports.findByUserId = async (userId) => {
  return ChatsModel.find({ users: userId }).populate('users');
};

exports.findByUsersOrCreate = async (users) => {
  const chat = await ChatsModel.findOne({
    users: { $all: users, $size: users.length },
  });

  if (chat) {
    return chat;
  }

  return ChatsModel.create({ users });
};
