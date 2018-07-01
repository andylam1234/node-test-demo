const order = require('../dao/order.js');

/*
 * 添加订单
 */
exports.add = async function(req, res, next) {
    try {
        let author_id = req.body.author_id; //req.session.user._id ||
        let count = 2;
        let project_id = 1;
        let ret = await order.add({author_id, count, project_id});
        res.json({msg: 'success'});
    } catch (err) {
        console.log('err', err.message);
        res.json({err: err.message});
    }
    /*
   //异步写法
   let author_id = 0; //req.session.user._id ||
   let count = 2;
   let project_id = 1;
   let ret = await order.addNomal({author_id, count, project_id}, function(err, result){
       if (err) {
           return res.json({err: err.message});
       }
       return res.json(ret);
   });*/
};



/*
 * 订单列表
 */
exports.find = async function(req, res) {
	try {
		let pageSize = 5;
		let pageIndex = 1;
		let project_id = 1;
		let ret = await order.find({project_id, pageSize, pageIndex});
		res.json({ret});
	} catch(err){
		console.log('err', err.message);
		res.json({err: err.message});
	}
};

exports.buy = async function(req, res) {
    try {
        let saledCount = await order.count();
        console.log('saledCount:', saledCount);
        if (saledCount > 200) return res.end('sale out!~~~~~~~~~~');
        let author_id = req.query.userId;
        let count = 2;
        let project_id = 1;
        let ret = await order.add({author_id, count, project_id});
        res.json({ret});
    } catch(err){
        console.log('err', err.message);
        res.json({err: err.message});
    }
};

/*
 * 订单详情
 */
exports.findOne = async function(req, res) {
    try {
        let _id = '5b377622bcc670393474a3d2';
        let ret = await order.findOne({_id});
        res.json({ret});
    } catch(err){
        console.log('err', err.message);
        res.json({err: err.message});
    }
}
