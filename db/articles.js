const knex = require('../knex/knex');

// Demo articles
  class Articles {
    constructor() {
      this.knex = require('../knex/knex');

    this.add({
      title : 'Dell Annual Save Coupon',
      body : 'We wouldnt want you to miss out on this huge savings!',
      author : 'The Author',
      urlTitle : 'Dell%20Annual%20Save%20Coupon'
});
    this.add({
      title : 'Extra hot Labor Day deals are now Live',
      body : 'Labor Day sale up to 50% off on all the latest tech!',
      author : 'Marketing',
      urlTitle : 'Labor%20Day%20Deals'
});
}}

function listAllArticles(url) {
  return knex.select().from('article_items').where('urlTitle', url)
};

function duplicates(request) {
  const suspect = encodeURI(request.title);
  return knex.select().from('article_items').where('urlTitle', suspect)
};

function updateArticle(url, data) {
  return knex('article_items').where('urlTitle', url).update({
    title: data.title,
    author: data.author,
    body: data.body,
    urlTitle: encodeURI(data.title)
  })
};

function deleteArticle(url) {
  return knex('article_items').where('urlTitle', url).del();
};

function addArticle(newArticle) {
  return knex('article_items').insert({
    title: newArticle.title,
    author: newArticle.author,
    body: newArticle.body,
    urlTitle: encodeURI(newArticle.title)
  });
};

module.exports = {
  Articles,
  listAllArticles,
  updateArticle,
  deleteArticle,
  addArticle,
  duplicates
};