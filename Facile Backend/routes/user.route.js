module.exports = function(app) {

    const user = require('../controllers/user.controller.js');
    const upload = require('../config/user_upload.config.js');

    app.post('/api/create_user', upload.single('user_image'), user.create_user);

    app.post('/api/new_user', user.new_user);

    app.post('/api/login_user', user.login_user);

    app.get('/api/find_vendor/:id', user.find_vendor); 

    app.get('/api/user_profile/:id', user.user_profile);

    app.get('/api/all_customers', user.all_customers);

    app.get('/api/all_vendors', user.all_vendors);

    app.put('/api/update_password/:id', user.update_password);

    app.put('/api/update_customer_profile/:id', upload.single('user_image'), user.update_customer_profile);

    app.put('/api/update_customer/:id', user.update_customer);

    app.put('/api/update_vendor/:id', user.update_vendor);

    app.put('/api/update_vendor_profile/:id', upload.single('user_image'), user.update_vendor_profile);

    app.put('/api/change_status/:id', user.change_status);

    //New Added
    app.put('/api/update_pen_verification_status/:id', user.update_pen_verification_status);

    app.put('/api/update_rej_verification_status/:id', user.update_rej_verification_status);

    app.post('/api/verify_email', user.verify_email);

    app.put('/api/reset_password', user.reset_password);

    app.put('/api/delete_user/:id', user.delete_user);

    app.put('/api/update_status/:id', user.update_status);

    app.put('/api/update_daily_jobs/:id', user.update_daily_jobs);

    app.put('/api/reset_jobs/:id', user.reset_jobs);
}