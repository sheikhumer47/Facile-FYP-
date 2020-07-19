module.exports = function(app) {

    const rating = require('../controllers/rating.controller.js');

    app.post('/api/post_rating', rating.post_rating);

    app.get('/api/find_rating/:id', rating.find_rating);

    app.get('/api/find_all_rating/:id', rating.find_all_rating);

    app.get('/api/fetch_average_rating/:id', rating.fetch_average_rating);

    app.get('/api/fetch_service_average_rating/:id', rating.fetch_service_average_rating);
    
}