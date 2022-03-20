const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const History = new mongoose.Schema(
    {
        _id: {
            type: Number,
            default: () => Math.floor(Math.random() * 1000) + 1000, index: true
        },
        orderId: { type: String },
        orderEventName: { type: String },
        createdDate: { type: Date },
        createdBy: { type: String },
        updatedDate: { type: Date },
        updatedBy: { type: String }
    },
    {
        versionKey: false
    }
);

History.plugin(mongoosePaginate);

module.exports = mongoose.model("History", History, "orders.histories");
