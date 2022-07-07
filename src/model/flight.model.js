const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema(
  {
    uniqueId: {
      unique: true,
      index: true,
      type: String
    },
    airport: {
      type: String,
    },
    airline: {
      type: String,
    },
    flight: {
      type: String,
    },
    schedule_time: {
      type: Date,
    },
    time: {
      type: Date,
    },
    type: {
        type: String,
      },
    to: {
        type: String,
      },
      status: {
        type: String
      }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


const FlightModel = mongoose.model('Flight', FlightSchema);
module.exports.FlightModel = FlightModel
