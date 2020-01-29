const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = lowdb(adapter);

exports.initDB = () => {

    const products = [
        {
            id: 1,
            name: 'Pure Natural',
            type: 'food',
            price: '100€',
            photoUrl: 'https://placeimg.com/640/480/animals'
        },
        {
            id: 2,
            name: 'Tenis ball',
            type: 'toys',
            price: '100€',
            photoUrl: 'https://placeimg.com/640/480/animals'
        }
    ]

    db.defaults({ products: [], basket: [] }).write();
    
    if (!db.get('products').size().value()) {
        for (const product of products) {
            db.get('products').push(product).write();
        }
    }
}

exports.getProducts = () => {
    return db.get('products').value();
}

exports.getBasket = () => {
    return db.get('basket').value();
}

exports.findProduct = productID => db.get('products').find({id: productID}).value()
exports.addProduct = product => db.get('products').push(product).write();

exports.findBasket = productID => db.get('basket').find({id: productID}).value();
exports.addToBasket = product => db.get('basket').push(product).write();
exports.removeFromBasket = productID => db.get('basket').remove({id: productID}).write();


