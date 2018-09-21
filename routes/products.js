const express = require('express');
const router = express.Router();
const knex = require('../knex/knex');
const Products_DB = require('../db/products');
const validations = require('../middleware/validations');

let statusMessage = {
  message: null
};

/* ------- GET Pages ------- */
router.get('/', (req, res) => {
  knex.select().from('product_items')
    .then(result => {
      res.render('index', {
        showProducts: true,
        products: result,
        message: statusMessage.message
      })
      statusMessage.message = null;
    })
    .catch(err => console.log(err));
});

router.get('/new', (req, res) => {
  res.render('new', {
    showProducts: true,
    message: statusMessage.message
  })
  statusMessage.message = null;
});

router.get('/:id', validations.validateProduct, (req, res) => {
  const id = req.params.id;
  Products_DB.selectAllProducts(id)
    .then(result => {
      res.render('product', {
        product: result[0],
        message: statusMessage.message
      })
      statusMessage.message = null;
    })
    .catch(err => console.log(err));
});

router.get('/:id/edit', validations.validateProduct, (req, res) => {
  const id = req.params.id;
  Products_DB.selectAllProducts(id)
    .then(result => {
      res.render('edit', {
        showProducts: true,
        product: result[0]
      })
    })
    .catch(err => console.log(err));
});

/* ------- Methods for Create, Update, Delete -------- */
router.post('/', validations.validateItemInput, (req, res) => {
  const data = req.body;
  return Products_DB.addProduct(data)
    .then(result => {
      statusMessage.message = 'Item successfully added!';
      res.redirect('/products');
    })
    .catch(err => console.log(err));
});

router.put('/:id', validations.validateProduct, (req, res) => {
  const id = req.params.id;
  const data = req.body;
  Products_DB.updateProduct(id, data)
    .then(result => {
      statusMessage.message = 'Item successfully updated!';
      res.redirect(`/products/${id}`)
    })
    .catch(err => console.log(err));
});

router.delete('/:id', validations.validateProduct, (req, res) => {
  const id = Number(req.params.id);
  Products_DB.deleteProduct(id)
    .then(result => {
      statusMessage.message = 'Item successfully deleted!';
      res.redirect('/products');
    })
    .catch(err => console.log(err));
});

module.exports = router;