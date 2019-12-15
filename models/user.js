const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const AppSubschema = new Schema(
  {
    name: String,
    id: ObjectId
  },
  {
    _id: false
  }
);

const UserSchema = new Schema(
  {
    apps: {
      type: [AppSubschema],
      default: []
    }
  },
  {}
);

module.exports = model("User", UserSchema);
