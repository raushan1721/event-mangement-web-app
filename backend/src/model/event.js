const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const eventSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    date:{
      type: String,
      required:true
    },
    time:{
      type: String,
      required:true
    }
  },
  { timestamps: true }
);

module.exports = Event = mongoose.model("Event", eventSchema);
