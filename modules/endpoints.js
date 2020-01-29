const db = require('./db-operations.js');

module.exports = (app) => {
    
    app.get('/products', (req, res) => {
        res.send(db.getProducts());
    });

    app.post('/products', (req, res) => {
        if (db.findProduct(req.body.id)) {
            res.send('Produkt med denna id finns redan');
            return;
        }
        db.addProduct(req.body);
        res.send(db.getProducts());
    });

    app.get('/basket', (req, res) => {
        res.send(db.getBasket());
        console.log(basket);
    });

    app.post('/basket', (req, res) => {
        if (db.findBasket(req.body.productId)) {
            res.send('Du kan inte lägga till samma produkt i varukorgen igen');
            return;
        }
        
        const product = db.findProduct(req.body.productId);
        console.log(product)
        if (!product) {
            res.send('Du försöker lägga till en produkt som inte finns');
            return;
        }
        db.addToBasket(product);
        res.send(db.getBasket());
    });

    app.delete('/basket', (req, res) => {
        if (!db.findBasket(req.body.productId)) {
            res.send('Du försöker ta bort en produkt som inte finns.');
            return;
        }

        db.removeFromBasket(req.body.productId);
        res.send(db.getBasket());
    });
}
