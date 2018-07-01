const Order = require('../models').Order;
/**
 *
 * @param params {author_id, count, project_id}
 */
exports.add = async function(params){
    let order = new Order();
    order.count = params.count;
    order.author_i_d = params.author_id;
    order.project_id = params.project_id;
    await order.save();
};

exports.find = async function(params){
    return await Order.find({project_id: 1}, {_id: 1, count: 1}, {skip: (params.pageIndex - 1) * params.pageSize, limit: params.pageSize});
};

exports.count = async function(params){
    return await Order.count();
};

exports.findOne = async function(params){
    return await Order.find(params);
};

exports.addNomal = function(params, callback){
    let order = new Order();
    order.count = params.count;
    order.author_i_d = params.author_id;
    order.project_id = params.project_id;
    order.save(callback);
};