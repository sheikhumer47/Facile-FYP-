module.exports = function(app) {

    const cart = require('../controllers/cart.controller.js');
    
    app.post('/api/new_cart', cart.new_cart);

    app.get('/api/get_carts/:id', cart.get_carts);

    app.put('/api/cancel_cart/:id', cart.cancel_cart);

}