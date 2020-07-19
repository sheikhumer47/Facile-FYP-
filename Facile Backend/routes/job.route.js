module.exports = function(app) {

    const job = require('../controllers/job.controller.js');
    
    app.post('/api/new_job', job.new_job);

    app.get('/api/in_progress_jobs/:id', job.in_progress_jobs);

    app.get('/api/schedule_jobs/:id', job.schedule_jobs);

    app.get('/api/in_progress_accepted_jobs/:id', job.in_progress_accepted_jobs);

    app.get('/api/completed_jobs/:id', job.completed_jobs);

    app.get('/api/job_details/:id', job.job_details);

    app.put('/api/complete_job/:id', job.complete_job);

    app.put('/api/schedule_job/:id', job.schedule_job);

    app.put('/api/schedule_job_status/:id', job.schedule_job_status);

    app.put('/api/cancel_job/:id', job.cancel_job);

    app.put('/api/job_cash_status_update/:id', job.job_cash_status_update);

    app.put('/api/accept_job/:id', job.accept_job);

    app.put('/api/start_final_time_job/:id', job.start_final_time_job);

    app.put('/api/job_final_values_updates/:id', job.job_final_values_updates);

    app.put('/api/job_final_time_values_updates/:id', job.job_final_time_values_updates);

    app.get('/api/all_in_progress_jobs', job.all_in_progress_jobs);

    app.get('/api/all_completed_jobs', job.all_completed_jobs);

    app.get('/api/filter_jobs/:id&date=:date', job.filter_jobs);

    app.get('/api/all_vendor_payments/:id', job.all_vendor_payments);
    
    app.get('/api/all_customer_payments/:id', job.all_customer_payments);

    app.get('/api/vendor_in_progress_jobs/:id', job.vendor_in_progress_jobs);

    app.get('/api/fetch_existing_booking/:id', job.fetch_existing_booking);

    app.get('/api/vendor_in_progress_accepted_jobs/:id', job.vendor_in_progress_accepted_jobs);

    app.get('/api/vendor_completed_jobs/:id', job.vendor_completed_jobs);

    app.get('/api/get_job_id/:id', job.get_job_id);
}