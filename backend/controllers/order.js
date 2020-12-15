const { ProductCart, Order } = require('../models/order');

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate('products.product', 'name price')
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          ERROR: 'could not find order by this ID',
        });
      }
      req.order = order;

      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);

  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        ERROR: 'could not save order to db',
      });
    }
    res.json(order);
  });
};

exports.getAllOrder = (req, res) => {
  Order.find()
    .populate('user', '_id name')
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          ERROR: 'Unable to fetch all orders/No orders found',
        });
      }
      res.json(orders);
    });
};

exports.getOrderStatus = (req, res) => {
  return res.json(Order.schema.path('status').enumValues);
};

exports.updateStatus = (req, res) => {
  Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
    if (err) {
      return res.status(400).json({
        error: 'Unable to set status',
      });
    }
    res.json(order);
  });
};
