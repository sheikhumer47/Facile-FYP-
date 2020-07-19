module.exports = function(app) {

    const complaint = require('../controllers/complaint.controller.js');

    app.post('/api/submit_complaint', complaint.submit_complaint);

    app.get('/api/all_complaints', complaint.all_complaints);

    app.get('/api/complaint_details', complaint.complaint_details);

    app.get('/api/all_single_user_complaints/:id', complaint.all_single_user_complaints);
    
}