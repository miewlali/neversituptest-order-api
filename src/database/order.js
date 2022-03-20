const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    _id: { type: String },
    orderNo: { type: String },
    buyer: {
        username: { type: String },
        firstname: { type: String },
        lastname: { type: String },
    },
    status: { type: String, index: true },
    orderItems: [{
        _id: false,
        productId: { type: String },
        quantity: { type: Number },
        price: { type: Number },
        totalPrice: { type: Number },
    }],
    deliveryAddress: {
        firstname: { type: String },
        lastname: { type: String },
        mobileNo: { type: String },
        addressNo: { type: String },
        moo: { type: String },
        mooban: { type: String },
        building: { type: String },
        room: { type: String },
        floor: { type: String },
        soi: { type: String },
        street: { type: String },
        subDistrictName: { type: String },
        districtName: { type: String },
        provinceName: { type: String },
        postalCode: { type: String }
    },
    deliveredDate: { type: Date },
    createdDate: { type: Date },
    createdBy: { type: String },
    updatedDate: { type: Date },
    updatedBy: { type: String }
}, { versionKey: false })

orderSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("order", orderSchema, "orders");