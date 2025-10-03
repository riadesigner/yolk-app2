const { Schema, model } = require('mongoose');

const messagesSchema = new Schema(
  {
    text: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    chatId: { type: Schema.Types.ObjectId, ref: 'Chats', required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

module.exports = model('Messages', messagesSchema);
