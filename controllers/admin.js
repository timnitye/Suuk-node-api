const Product = require('../models/product');

exports.test = (req, res, next) => {
  console.log(req);
  res.send("Hello!!")
}
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;

  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl }
  );

  product.save()
    .then(results => {
      console.log('Created Product!');
      res.send(results);
    })
    .catch(err => {
      console.log("oops!!");
      console.log(err);
    });
};
