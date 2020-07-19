module.exports = function(app) {

    const department = require('../controllers/department.controller.js');
    
    app.post('/api/add_department', department.add_department);
    app.get('/api/get_department', department.get_department);

}