const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    vat: {
      type: Number,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    price_net: {
      type: Number,
      required: true,
    },
    price_gross: {
      type: Number,
      required: true,
    },
    img: {
      type: [],
    },
  },
  {
    timestamps: true,
  }
);

const Registration = new mongoose.model("Registration", registrationSchema);

module.exports = Registration;
