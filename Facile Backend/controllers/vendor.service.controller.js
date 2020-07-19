const db = require('../config/db.config.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const VendorService = db.vendorservices;
const Job = db.jobs;

exports.fetch_vendor = async(req, res) => {
     await VendorService.sequelize.query('SELECT `users`.`user_id`, `users`.`user_name`, `users`.`user_image`, `users`.`user_lat`, `users`.`user_lon`,`users`.`daily_jobs`, `vendor_services`.`vendor_id` FROM `vendor_services` JOIN `users` on `vendor_services`.`vendor_id` = `users`.`user_id` WHERE `vendor_services`.`fk_department_id` = '+req.params.id+' AND `vendor_services`.`vendor_id` != '+req.params.vendor_id+' AND `users`.`user_online` = \'yes\' AND `users`.`user_verification_status` = \'verified\' AND `users`.`user_status` = \'enabled\' AND `users`.`daily_jobs` = 0')
        .spread((result, metadata) => res.send(result)).catch(err => res.send(err));
}

exports.fetch_vendors = async(req, res) => {
    await VendorService.sequelize.query('SELECT `users`.`user_id`, `users`.`user_name`, `users`.`user_image`, `users`.`user_lat`, `users`.`user_lon`, `users`.`daily_jobs`, `vendor_services`.`vendor_id` FROM `vendor_services` JOIN `users` on `vendor_services`.`vendor_id` = `users`.`user_id` WHERE `vendor_services`.`fk_department_id` = '+req.params.id+' AND `users`.`user_online` = \'yes\' AND `users`.`user_verification_status` = \'verified\' AND `users`.`user_status` = \'enabled\' AND `users`.`daily_jobs` = 0')
       .spread((result, metadata) => res.send(result)).catch(err => res.send(err));
}

// Fetch Pending Vendors
exports.fetch_pending_vendors = async(req, res) => {
    await VendorService.sequelize.query('SELECT `users`.`user_id`, `users`.`user_name`, `users`.`user_image`, `users`.`user_phone`, `users`.`user_address`, `users`.`user_city`,`users`.`user_lat`, `users`.`user_lon`, `users`.`user_cnic`, `users`.`user_status`,`users`.`user_email`, `vendor_services`.`vendor_id` FROM `vendor_services` JOIN `users` on `vendor_services`.`vendor_id` = `users`.`user_id` WHERE `users`.`user_verification_status` = \'pending\' AND `users`.`user_status` = \'enabled\' AND `users`.`daily_jobs` = 0')
       .spread((result, metadata) => res.send(result)).catch(err => res.send(err));
}

// Fetch Verified Vendors
exports.fetch_verified_vendors = async(req, res) => {
    await VendorService.sequelize.query('SELECT `users`.`user_id`, `users`.`user_name`, `users`.`user_image`, `users`.`user_phone`, `users`.`user_address`, `users`.`user_city`,`users`.`user_lat`, `users`.`user_lon`, `users`.`user_cnic`, `users`.`user_verification_status`,`users`.`user_email`, `vendor_services`.`vendor_id` FROM `vendor_services` JOIN `users` on `vendor_services`.`vendor_id` = `users`.`user_id` WHERE `users`.`user_verification_status` = \'verified\' AND `users`.`user_status` = \'enabled\' ')
       .spread((result, metadata) => res.send(result)).catch(err => res.send(err));
}

// All Photographers...with depart id now
exports.all_service_providers = async(req, res) => {
    await VendorService.sequelize.query('SELECT `users`.`user_id`, `users`.`user_cnic`, `users`.`user_phone`, `users`.`user_email`, `users`.`user_name`, `users`.`user_image`, `users`.`user_address`, `users`.`user_city`, `users`.`user_lat`, `users`.`user_lon`,`users`.`user_status` FROM `vendor_services` JOIN `users` on `vendor_services`.`vendor_id` = `users`.`user_id` where `users`.`user_verification_status` = \'verified\' AND `vendor_services`.`fk_department_id` = '+req.params.id+' ')
    .spread((result, metadata) => res.send(result)).catch(err => res.send(err));
}

exports.vendor_services = async (req, res) => {
    await VendorService.findAll({
        where: {
            vendor_id: req.params.id
        }
    }).then(result => res.send(result)).catch(err => res.send(err));
}

exports.delete_vendor_services = async (req, res) => {
    await VendorService.destroy({
        where: {
            vendor_id: req.params.id
        }
    }).then(res.send("ok")).catch(err => res.send(err));
}

exports.update_vendor_services = (req, res) => {
    var serviceItems = req.body.departments;
    var serviceArray = new Array();
    serviceArray = serviceItems.split(',');
    console.log(serviceArray + " Length is " + serviceArray.length)
    try {
        for(var i = 0; i < serviceArray.length-1; i++) {
            VendorService.create({
                vendor_id: req.params.id,
                fk_department_id: serviceArray[i]
            });
        }
        console.log("ok");
        res.send("ok");
        return;
    }
    catch(err) {
        res.send(err);
        return;
    }
}

exports.check_vendor = async (req, res) => {
    await VendorService.sequelize.query('SELECT `users`.`user_id`, `users`.`user_name`, `users`.`user_image`, `users`.`user_lat`, `users`.`user_lon`, `vendor_services`.`vendor_id` FROM `vendor_services` JOIN `users` on `vendor_services`.`vendor_id` = `users`.`user_id` WHERE `vendor_services`.`fk_department_id` = '+req.params.id+' AND `users`.`user_online` = \'yes\' ')
    .spread((result) => {
        res.send(result);
    }).catch(err => res.send(err));
}

