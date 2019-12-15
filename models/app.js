const mongoose = require("mongoose");

const { Schema, model } = mongoose;
// const { ObjectId } = Schema.Types;

const AppSchema = new Schema(
  {
    name: {
        type : String,
        unique : true,
        required : true
    }
  },
  {}
);

module.exports = model("App", AppSchema);
