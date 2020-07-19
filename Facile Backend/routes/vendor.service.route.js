module.exports = function(app) {

    const services = require('../controllers/vendor.service.controller.js');

    app.get('/api/fetch_vendor/:id&vendor_id=:vendor_id', services.fetch_vendor);

    app.get('/api/fetch_vendors/:id', services.fetch_vendors);

    app.get('/api/fetch_pending_vendors', services.fetch_pending_vendors);
    
    app.get('/api/fetch_verified_vendors', services.fetch_verified_vendors);
    
    app.get('/api/vendor_services/:id', services.vendor_services);

    app.get('/api/all_service_providers/:id', services.all_service_providers);

    app.delete('/api/delete_vendor_services/:id', services.delete_vendor_services);

    app.put('/api/update_vendor_services/:id', services.update_vendor_services);

    app.get('/api/check_vendor/:id', services.check_vendor);
    
}