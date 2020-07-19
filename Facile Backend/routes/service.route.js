module.exports = function(app) {

    const service = require('../controllers/service.controller.js');
    const upload = require('../config/service_upload.config.js');
    
    app.post('/api/add_service', service.add_service);

    app.get('/api/get_services', service.get_services);

    app.put('/api/update_service/:id', service.update_service);

    app.put('/api/delete_service/:id', service.delete_service);

    app.get('/api/fetch_dept_services', service.fetch_dept_services);
    
    app.get('/api/fetch_single_dept_services/:id', service.fetch_single_dept_services);

    app.put('/api/fetch_single_service/:id', service.fetch_single_service);

    app.put('/api/update_cart_status/:id', service.update_cart_status);

}