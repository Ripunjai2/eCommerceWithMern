const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

exports.getProductById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err) {
      return res.json({
        ERROR: "couldn't get product by this ID",
      });
    }
    req.product = product;
  });
  next();
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: 'problem with image',
      });
    }

    //destructuring
    const { name, description, price, category, stock } = fields;

    //restrictions on field
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        ERROR: 'Please give the complete and correct info',
      });
    }

    let product = new Product(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: 'File size too big!',
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: 'Saving tshirt in DB failed',
        });
      }
      res.json(product);
    });
  });
};
