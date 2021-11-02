const { model, Schema } = require("mongoose");

const schemaUser = new Schema({
  f_name: {
    type: String,
    required: true,
  },
  l_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  avatar: {
    type: String,
    default: "",
  },
  articles: [
    {
      title: {
        type: String,
      },
      category: {
        type: String,
      },
      description: {
        type: String,
        required: true,
      },
      tag: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      count: {
        type: Number,
        default: 0,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    }
  ],
});

module.exports = model("user", schemaUser);
