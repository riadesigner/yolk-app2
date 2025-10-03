const { Schema, model } = require('mongoose');

const chatsSchema = new Schema(
  {
    users: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

chatsSchema.virtual('messages', {
  ref: 'Messages',
  localField: '_id',
  foreignField: 'chatId',
});

chatsSchema.index({ users: 1 }, { unique: true });

module.exports = model('Chats', chatsSchema);
