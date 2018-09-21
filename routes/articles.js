const express = require('express');
const router = express.Router();
const knex = require('../knex/knex');
const Articles_DB = require('../db/articles');
const validations = require('../middleware/validations');
const checkHead = require('../middleware/articleHeaderCheck');

router.use(checkHead.checkHeader);

let statusMessage = {
  message: null
};

/* ------- GET Pages ------- */
router.get('/', (req, res) => {
  knex.select().from('article_items')
    .then(result => {
      res.render('index', {
        showArticles: true,
        articles: result,
        message: statusMessage.message
      })
      statusMessage.message = null;
    })
    .catch(err => console.log(err));
});

router.get('/new', (req, res) => {
  res.render('new', {
    showArticles: true,
    message: statusMessage.message
  })
  statusMessage.message = null;
});

router.get('/:urlTitle', validations.validateArticle, (req, res) => {
  const urltitle = encodeURI(req.params.urlTitle);
  Articles_DB.listAllArticles(urltitle)
    .then(result => {
      res.render('article', {
        article: result[0]
      })
    })
    .catch(err => console.log(err));
});

router.get('/:urlTitle/edit', validations.validateArticle, (req, res) => {
  const urltitle = encodeURI(req.params.urlTitle);
  Articles_DB.listAllArticles(urltitle)
    .then(result => {
      return res.render('edit', {
        showArticles: true,
        article: result[0]
      })
    })
    .catch(err => console.log(err));
});

/* ------- Methods for Create, Update, Delete -------- */
router.post('/', validations.validateArticleInput, (req, res) => {
  const data = req.body;
  Articles_DB.addArticle(data)
    .then(result => {
      res.redirect('/articles');
    })
    .catch(err => console.log(err));
});

router.put('/:urlTitle', validations.validateArticle, (req, res) => {
  const urltitle = encodeURI(req.params.urlTitle);
  const data = req.body;
  return Articles_DB.updateArticle(urltitle, data)
    .then(result => {
      res.redirect(`/articles/${encodeURI(data.title)}`)
    })
    .catch(err => console.log(err));
});

router.delete('/:urlTitle', validations.validateArticle, (req, res) => {
  const urltitle = encodeURI(req.params.urlTitle);
  return Articles_DB.deleteArticle(urltitle)
    .then(result => {
      statusMessage.message = `Article successfully deleted!`
      res.redirect('/articles');
    })
    .catch(err => console.log(err));
});

module.exports = router;