const db = require('../config/db.config.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Job = db.jobs;

exports.new_job = async (req, res) => {
    await Job.create({
        job_start_date: req.body.job_start_date,
        vendor_id: req.body.vendor_id,
        customer_id: req.body.customer_id,
        fk_service_id: req.body.fk_service_id,
        cus_lat: req.body.cus_lat,
        cus_lon: req.body.cus_lon
    }).then(res.send("Job Started")).catch(err => res.send(err));
}

// In Progress Jobs of specific Customer
exports.in_progress_jobs = async (req, res) => {
    await Job.sequelize.query('SELECT `jobs`.`job_id`, `jobs`.`job_status`, `jobs`.`job_start_date`, `jobs`.`customer_id`, `jobs`.`vendor_id`, `jobs`.`fk_service_id`, `users`.`user_name`, `users`.`user_address`, `users`.`user_city`, `users`.`user_lat`, `users`.`user_lon`, `users`.`user_phone`, `services`.`service_name`, `services`.`service_price` FROM `jobs` JOIN `users` on `users`.`user_id` = `jobs`.`vendor_id`  JOIN `services` on `jobs`.`fk_service_id` = `services`.`service_id` WHERE `jobs`.`customer_id` = '+req.params.id+' AND `jobs`.`job_status` = \'started\' ')
    .spread((result, metadata) => {
            res.send(result);
        }).catch(err => res.send(err));
}

// In Progress Schedule Job
exports.schedule_jobs = async (req, res) => {
    await Job.sequelize.query('SELECT `jobs`.`job_id`, `jobs`.`job_status`, `jobs`.`job_start_date`, `jobs`.`customer_id`, `jobs`.`vendor_id`, `jobs`.`fk_service_id`, `users`.`user_name`, `users`.`user_address`, `users`.`user_city`, `users`.`user_lat`, `users`.`user_lon`, `users`.`user_phone`, `services`.`service_name`, `services`.`service_price` FROM `jobs` JOIN `users` on `users`.`user_id` = `jobs`.`vendor_id`  JOIN `services` on `jobs`.`fk_service_id` = `services`.`service_id` WHERE `jobs`.`customer_id` = '+req.params.id+' AND `jobs`.`job_status` = \'scheduled\' ')
    .spread((result, metadata) => {
            res.send(result);
        }).catch(err => res.send(err));
}

exports.in_progress_accepted_jobs = async (req, res) => {
    await Job.sequelize.query('SELECT `jobs`.`job_id`, `jobs`.`job_status`, `jobs`.`job_start_date`, `jobs`.`customer_id`, `jobs`.`vendor_id`, `jobs`.`fk_service_id`, `users`.`user_name`, `users`.`user_address`, `users`.`user_city`, `users`.`user_lat`, `users`.`user_lon`, `users`.`user_phone`, `services`.`service_name`, `services`.`service_price` FROM `jobs` JOIN `users` on `users`.`user_id` = `jobs`.`vendor_id`  JOIN `services` on `jobs`.`fk_service_id` = `services`.`service_id` WHERE `jobs`.`customer_id` = '+req.params.id+' AND `jobs`.`job_status` = \'accepted\' ')
    .spread((result, metadata) => {
            res.send(result);
        }).catch(err => res.send(err));
}

// Completed Jobs of specific Customer
exports.completed_jobs = async (req, res) => {
    await Job.sequelize.query('SELECT `jobs`.`job_id`, `jobs`.`job_status`, `jobs`.`job_start_date`, `jobs`.`customer_id`, `jobs`.`vendor_id`, `jobs`.`fk_service_id`, `users`.`user_name`, `users`.`user_address`, `users`.`user_city`, `users`.`user_lat`, `users`.`user_lon`, `users`.`user_phone`, `services`.`service_name`, `services`.`service_price` FROM `jobs` JOIN `users` on `users`.`user_id` = `jobs`.`vendor_id`  JOIN `services` on `jobs`.`fk_service_id` = `services`.`service_id` WHERE `jobs`.`customer_id` = '+req.params.id+' AND `jobs`.`job_status` = \'completed\' ')
    .spread((result, metadata) => {
            res.send(result);
        }).catch(err => res.send(err));
}

exports.vendor_in_progress_jobs = async (req, res) => {
    await Job.sequelize.query('SELECT `jobs`.`job_id`, `jobs`.`job_status`, `jobs`.`job_start_date`, `jobs`.`customer_id`, `jobs`.`vendor_id`, `jobs`.`fk_service_id`, `users`.`user_name`, `users`.`user_address`, `users`.`user_city`, `users`.`user_lat`, `users`.`user_lon`, `users`.`user_phone`, `services`.`service_name`, `services`.`service_price` FROM `jobs` JOIN `users` on `users`.`user_id` = `jobs`.`vendor_id`  JOIN `services` on `jobs`.`fk_service_id` = `services`.`service_id` WHERE `jobs`.`vendor_id` = '+req.params.id+' AND `jobs`.`job_status` = \'started\' ')
    .spread((result, metadata) => {
            res.send(result);
        }).catch(err => res.send(err));
}

//Check Existing Booking
exports.fetch_existing_booking = async (req, res) => {
    await Job.sequelize.query('SELECT `jobs`.`job_id`, `jobs`.`job_status`, `jobs`.`job_start_date`, `jobs`.`customer_id`, `jobs`.`vendor_id`, `jobs`.`fk_service_id`, `users`.`user_name`, `users`.`user_address`, `users`.`user_city`, `users`.`user_lat`, `users`.`user_lon`, `users`.`user_phone`, `services`.`service_name`, `services`.`service_price` FROM `jobs` JOIN `users` on `users`.`user_id` = `jobs`.`vendor_id`  JOIN `services` on `jobs`.`fk_service_id` = `services`.`service_id` WHERE `jobs`.`vendor_id` = '+req.params.id+' ')
    .spread((result, metadata) => {
            res.send(result);
        }).catch(err => res.send(err));
}

exports.vendor_in_progress_accepted_jobs = async (req, res) => {
    await Job.sequelize.query('SELECT `jobs`.`job_id`, `jobs`.`job_status`, `jobs`.`job_start_date`, `jobs`.`customer_id`, `jobs`.`vendor_id`, `jobs`.`fk_service_id`, `users`.`user_name`, `users`.`user_address`, `users`.`user_city`, `users`.`user_lat`, `users`.`user_lon`, `users`.`user_phone`, `services`.`service_name`, `services`.`service_price` FROM `jobs` JOIN `users` on `users`.`user_id` = `jobs`.`vendor_id`  JOIN `services` on `jobs`.`fk_service_id` = `services`.`service_id` WHERE `jobs`.`vendor_id` = '+req.params.id+' AND `jobs`.`job_status` = \'accepted\' ')
    .spread((result, metadata) => {
            res.send(result);
        }).catch(err => res.send(err));
}

exports.vendor_completed_jobs = async (req, res) => {
    await Job.sequelize.query('SELECT `jobs`.`job_id`, `jobs`.`job_status`, `jobs`.`job_start_date`, `jobs`.`customer_id`, `jobs`.`vendor_id`, `jobs`.`fk_service_id`, `users`.`user_name`, `users`.`user_address`, `users`.`user_city`, `users`.`user_lat`, `users`.`user_lon`, `users`.`user_phone`, `services`.`service_name`, `services`.`service_price` FROM `jobs` JOIN `users` on `users`.`user_id` = `jobs`.`vendor_id`  JOIN `services` on `jobs`.`fk_service_id` = `services`.`service_id` WHERE `jobs`.`vendor_id` = '+req.params.id+' AND `jobs`.`job_status` = \'completed\' ')
    .spread((result, metadata) => {
            res.send(result);
        }).catch(err => res.send(err));
}

exports.get_job_id = async (req, res) => {
    await Job.sequelize.query('SELECT `jobs`.`job_id`, `jobs`.`job_status`, `jobs`.`job_start_date`, `jobs`.`customer_id`, `jobs`.`vendor_id`, `jobs`.`fk_service_id`, `users`.`user_name`, `users`.`user_address`, `users`.`user_city`, `users`.`user_lat`, `users`.`user_lon`, `users`.`user_phone`, `services`.`service_name`, `services`.`service_price` FROM `jobs` JOIN `users` on `users`.`user_id` = `jobs`.`vendor_id`  JOIN `services` on `jobs`.`fk_service_id` = `services`.`service_id` WHERE `jobs`.`vendor_id` = '+req.params.id+' ')
    .spread((result, metadata) => {
            res.send(result);
        }).catch(err => res.send(err));
}

//Updated One
exports.job_details = async (req, res) => {
    await Job.findOne({ where: {job_id: req.params.id} })
        .then(result => res.send(result)).catch(err => res.send(err));
}

// Complete Job
exports.complete_job = async (req, res) => {
    await Job.update(
        {
            job_status: 'completed'
        },
        {
            where: {
                job_id: req.params.id
            }
        }).then(res.send("Job Completed")).catch(err => res.send(err));
}

// Change Schedule Status
exports.schedule_job = async (req, res) => {
    await Job.update(
        {
            job_status: 'scheduled'
        },
        {
            where: {
                job_id: req.params.id
            }
        }).then(res.send("Job Scheduled")).catch(err => res.send(err));
}

// Change Schedule Status
exports.schedule_job_status = async (req, res) => {
    await Job.update(
        {
            job_status: 'started'
        },
        {
            where: {
                job_id: req.params.id
            }
        }).then(res.send("Job Scheduled")).catch(err => res.send(err));
}


// Cancel Job
exports.cancel_job = async (req, res) => {
    await Job.update(
        {
            job_status: 'cancelled'
        },
        {
            where: {
                job_id: req.params.id
            }
        }).then(res.send("Job Cancelled")).catch(err => res.send(err));
}

// Cash Updation
exports.job_cash_status_update = async (req, res) => {
    await Job.update(
        {
            cash_status: req.body.cash_status
        },
        {
            where: {
                job_id: req.params.id
            }
        }).then(res.send("Job Cash Status Updated")).catch(err => res.send(err));
}


// Status Changed
exports.accept_job = async (req, res) => {
    await Job.update(
        {
            job_status: 'accepted',
            job_start_time: req.body.job_start_time
        },
        {
            where: {
                job_id: req.params.id
            }
        }).then(res.send("Job Status Changed")).catch(err => res.send(err));
}

// Start FinalTime
exports.start_final_time_job = async (req, res) => {
    await Job.update(
        {
            job_finish_time: req.body.job_finish_time,
            job_final_start_time: req.body.job_final_start_time
        },
        {
            where: {
                job_id: req.params.id
            }
        }).then(res.send("Job Final Time Started")).catch(err => res.send(err));
}


// Update Job Values
exports.job_final_values_updates = async (req, res) => {
    await Job.update(
        {
            job_finish_time: req.body.job_finish_time,
            total_bill: req.body.total_bill
        },
        {
            where: {
                job_id: req.params.id
            }
        }).then(res.send("Job Values Has Been Updateed")).catch(err => res.send(err));
}

// Update Job Values
exports.job_final_time_values_updates = async (req, res) => {
    await Job.update(
        {
            job_final_finish_time: req.body.job_final_finish_time,
            total_bill: req.body.total_bill
        },
        {
            where: {
                job_id: req.params.id
            }
        }).then(res.send("Job Values Has Been Updateed")).catch(err => res.send(err));
}

// All In Progress Jobs
exports.all_in_progress_jobs = async (req, res) => {
    await Job.sequelize.query('SELECT `jobs`.`job_id`, `jobs`.`job_status`, `jobs`.`job_start_date`, `jobs`.`customer_id`, `jobs`.`vendor_id`, `jobs`.`fk_service_id`, `users`.`user_name`, `users`.`user_address`, `users`.`user_city`, `users`.`user_lat`, `users`.`user_lon`, `users`.`user_phone`, `services`.`service_name`, `services`.`service_price` FROM `jobs` JOIN `users` on `users`.`user_id` = `jobs`.`vendor_id`  JOIN `services` on `jobs`.`fk_service_id` = `services`.`service_id` WHERE `jobs`.`job_status` = \'started\' ')
    .spread((result, metadata) => {
            res.send(result);
        }).catch(err => res.send(err));
}


// All Completed Jobs
exports.all_completed_jobs = async (req, res) => {
    await Job.sequelize.query('SELECT `jobs`.`job_id`, `jobs`.`job_status`, `jobs`.`job_start_date`, `jobs`.`customer_id`, `jobs`.`vendor_id`, `jobs`.`fk_service_id`, `users`.`user_name`, `users`.`user_address`, `users`.`user_city`, `users`.`user_lat`, `users`.`user_lon`, `users`.`user_phone`, `services`.`service_name`, `services`.`service_price` FROM `jobs` JOIN `users` on `users`.`user_id` = `jobs`.`vendor_id`  JOIN `services` on `jobs`.`fk_service_id` = `services`.`service_id` WHERE `jobs`.`job_status` = \'completed\' ')
    .spread((result, metadata) => {
            res.send(result);
        }).catch(err => res.send(err));
}

// All Vendor Payments
exports.all_vendor_payments = async (req, res) => {
    await Job.sequelize.query('SELECT `jobs`.`job_id`, `jobs`.`total_bill`, `jobs`.`customer_id`, `jobs`.`vendor_id`, `jobs`.`cash_status`, `jobs`.`fk_service_id`, `users`.`user_name`, `services`.`service_name` FROM `jobs` JOIN `users` on `users`.`user_id` = `jobs`.`vendor_id` JOIN `services` on `jobs`.`fk_service_id` = `services`.`service_id` WHERE `jobs`.`vendor_id` = '+req.params.id+' ')
    .spread((result, metadata) => {
            res.send(result);
        }).catch(err => res.send(err));
}

// All Customer Payments
exports.all_customer_payments = async (req, res) => {
    await Job.sequelize.query('SELECT `jobs`.`job_id`, `jobs`.`total_bill`, `jobs`.`customer_id`, `jobs`.`vendor_id`, `jobs`.`cash_status`, `jobs`.`fk_service_id`, `users`.`user_name`, `services`.`service_name` FROM `jobs` JOIN `users` on `users`.`user_id` = `jobs`.`vendor_id` JOIN `services` on `jobs`.`fk_service_id` = `services`.`service_id` WHERE `jobs`.`customer_id` = '+req.params.id+' ')
    .spread((result, metadata) => {
            res.send(result);
        }).catch(err => res.send(err));
}

exports.filter_jobs = async (req, res) => {
    await Job.sequelize.query('SELECT DISTINCT `jobs`.`job_start_date`, `jobs`.`job_status`, `users`.`user_id`, `users`.`user_name`, `users`.`user_image`, `users`.`user_lat`, `users`.`user_lon` FROM `jobs` JOIN `users` on `jobs`.`vendor_id` = `users`.`user_id` where `jobs`.`vendor_id` = '+req.params.id+' AND `job_status` != \'started\' AND `jobs`.`job_start_date` != '+req.params.date+' ')
    .spread((result) => {
        res.send(result);
    }).catch(err => res.send(err));
}
