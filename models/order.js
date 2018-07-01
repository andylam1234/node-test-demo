const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    count: {type: Number, default:1},
    project_id: {type: Number},
    author_id: {type: String},
    create_at: {type: Date, default: Date.now},
    flag: {type: Number, default: 1}
});

const Order = mongoose.model('Order', orderSchema);

