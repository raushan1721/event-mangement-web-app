const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const eventGuestSchema = new Schema(
  {
    event: {
      type: String,
      required: true,
    },
    guests: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = EventGuest = mongoose.model("eventGuest", eventGuestSchema);
