const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
    },

    name: {
      type: String,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    items: [
      {
        productId: {
          type: String,
          required: true,
        },

        name: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre("save", function () {
  if (!this.customerName && this.name) {
    this.customerName = this.name;
  }
  if (!this.name && this.customerName) {
    this.name = this.customerName;
  }
});

module.exports = mongoose.model("Order", orderSchema);
