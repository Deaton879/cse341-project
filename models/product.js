const fs = require('fs');
const path = require('path');

const pathString = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProducts = callBack => {
    fs.readFile(pathString, (err, fileContent) => {
        if(err) {
            callBack([]);
        } else {
            callBack(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product {
    constructor(title, price, desc, img) {
        this.title = title;
        this.price = price;
        this.desc = desc;
        this.img = img;
    }

    save() {
        getProducts(products => {
            products.push(this);
            fs.writeFile(pathString, JSON.stringify(products), err => {
                console.log(err);
            });
        });
    }

    static fetchAll(callBack) {
        getProducts(callBack);
    }
};