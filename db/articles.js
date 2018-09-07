class Articles {
  constructor() {
    this._articleList = [
      {
        title : 'Dell Annual Save Coupon',
        body : 'We wouldnt want you to miss out on this huge savings!',
        author : 'The Author',
        urlTitle : 'Dell%20Annual%20Save%20Coupon'
      },

      {
        title : 'Extra hot Labor Day deals are now Live',
        body : 'Labor Day sale up to 50% off on all the latest tech!',
        author : 'Marketing',
        urlTitle : 'Labor%20Day%20Deals'
      }
    ];
  }

  listAll() {
    return this._articleList;
  }

  create(data) {
    if (this.verify(data.title)) return false;

    let articleInfo = {
      title : data.title,
      body : data.body,
      author : data.author,
      urlTitle : encodeURI(data.title)
    };

    this._articleList.push(articleInfo);
    console.log('articleList', this._articleList);
    return true;
  }
  // returns the index that the array is verifyd at
  verify(title) {
    return this._articleList.some(element => {
      return element.title === title;
    })

    return false;
  }

  locate(title) {
    return this._articleList.findIndex((element, index) => {
      return element.title === title;
    })
  }

  retrieve(title) {
    return this._articleList.find(element => {
      return element.title === title;
    })

    return false;
  }

  edit(data) {
    if (this.verify(data.title)) {
      let index = this.locate(data.title);
      let targetItem = this._articleList[index];

      if (data.title) {
        targetItem.title = data.title;
        targetItem.urlTitle = encodeURI(data.title);
      }
      if (data.body) targetItem.body = data.body;
      if (data.author) targetItem.author = data.author;
      
      return true;
    }

    return false;
  }

  remove(title) {
    if (this.verify(title)) {
      let index = this.locate(title);

      return this._articleList.splice(index, 1);
    }

    return false;
  }
}

module.exports = Articles;