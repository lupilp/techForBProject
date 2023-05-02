const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    tipoDocumento: {
      type: String,
      require: true,
    },
    numDocumento: {
      type: Number,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    balance: {
      type: [],
    },
    tarjetas: {
      type: [],
    },
    transacciones: {
      type: [],
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("User", userSchema);
