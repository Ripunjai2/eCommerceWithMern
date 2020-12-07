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
