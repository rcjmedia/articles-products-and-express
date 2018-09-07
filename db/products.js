class Products {
  constructor() {
    this._productList = [
      {
        'id' : 1,
        'name' : 'Sandals',
        'price' : 20,
        'inventory' : 200
      },

      {
        'id' : 2,
        'name' : 'Gucci Sunglasses',
        'price' : 220,
        'inventory' : 15
      }
    ];

    this._productNumber = 2;
  }
  // will return full product list
  listAll () {
    return this._productList;
  }
  // will save data from req.name
  create(data) {
    if (this.verify(data.id)) return false;

    this._productNumber += 1;

    let productInfo = {
      id : this._productNumber,
      name : data.name,
      price : Number(data.price),
      inventory : Number(data.inventory)
    };

    this._productList.push(productInfo);
    return true;
  }

  // will return reference to location of id through coersion
  verify(id) {
    return this._productList.some(element => {
      return element.id === Number(id);
    })

    return false;
  }

  locate(id) {
    return this._productList.findIndex((element, index) => {
      return element.id === Number(id);
    })
  }

  retrieve(id) {
    return this._productList.find(element => {
      return element.id === Number(id);
    })

    return false;
  }

  // will edit a product based on id
  edit(id, data) {
    if (this.verify(id)) {
      let index = this.locate(id);
      let targetItem = this._productList[index];

      if (data.name) targetItem.name = data.name;
      if (data.price) targetItem.price = data.price;
      if (data.inventory) targetItem.inventory = data.inventory;
      
      return true;
    }

    return false;
  }

  // will delete a product based on id
  remove(id) {
    if (this.verify(id)) {
      let index = this.locate(id);

      return this._productList.splice(index, 1);
    }

    return false;
  }
} 

module.exports = Products;