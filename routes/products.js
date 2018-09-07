const express = require('express');
const router = express.Router();

const Products = require('../db/products');
const products = new Products();

const validReq = { "success" : true };
const invalidReq = { "success" : false };

// NEED TO USE PATH AND JOIN AND __dir FOR CROSS-PLATFORM
router.route('/')
  .get((req, res) => {
    res.render('index', { 
      products : {
        list : products.listAll()
      } 
    });
  });

router.route('/new')
  .get((req, res) => {
    res.render('index', {
      products : {
        new : true
      }
    });
  })

  .post((req, res) => {
    if (products.create(req.body)) return res.redirect('/products');
    else return res.redirect('/articles/new');
  });

router.route('/:id')
  .get((req, res) => {
    let id = req.params.id;
    console.log(id);
    if (products.verify(id)) { 
      console.log('here');
      let data = products.retrieve(id);

      return res.render('index', {
        products : {
          product: true,
          id : data.id,
          name : data.name,
          price : data.price,
          inventory : data.inventory
        }
      })

    } else {
      return res.redirect(`/products`);
    }
  })

  .put((req, res) => {
    let id = req.params.id;
    console.log(req.body);

    if (products.edit(id, req.body)) return res.redirect(`/products/${id}`);
    else return res.redirect(`/products/${id}/edit`);

  })

  .delete((req, res) => {
    let id = req.params.id;

    if (products.remove(id)) {
    return res.redirect('/products');
    }
    else return res.redirect(`/products/${id}`);
  });

router.route('/:id/edit')
  .get((req, res) => {
    let id = req.params.id;
    let targetItem = products.verify(id);

    if (targetItem) { 
      let data = products.retrieve(id);
      console.log('lksdjf', data);

      return res.render('index', {
        products : {
          product: true,
          edit : true,
          id : data.id,
          name : data.name,
          price : data.price,
          inventory : data.inventory
        }
      });
    
    } else {

      return res.redirect(`/products/${id}`);
    }
  });


module.exports = router;