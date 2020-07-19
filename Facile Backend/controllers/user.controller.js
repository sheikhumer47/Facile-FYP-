const db = require('../config/db.config.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const cloudinary = require('cloudinary');
var path = require('path');

const Users = db.users;
const Rating = db.ratings;
const VendorService = db.vendorservices;

var imgUrl = null;
var urlImage = null;
var portfolioLocation = null;

async function uploadImage(image){
    imgUrl = await cloudinary.uploader.upload(image, {folder: "user_images/"}, function(result){
        console.log(result.url);
        return result.url;
        });
    return imgUrl;
}

exports.create_user = async (req, res) => {

    var imageFile = req.file.path;

    if(imageFile != null) {
        await uploadImage(imageFile);
        urlImage = JSON.stringify(imgUrl.url);
    }
    else {
        urlImage = "";
    }

    await Users.count({ where: { [Op.or]: [{user_email: req.body.user_email}, {user_phone: req.body.user_phone}, {user_cnic: req.body.user_cnic}] }})
        .then(count => {
            if(count != 0) {
                res.send("");
                return;
            }
            else{
                var role = req.body.user_role;

                if(role == "customer"){
                    Users.create({
                        user_name: req.body.user_name,
                        user_image: urlImage,
                        user_email: req.body.user_email,
                        user_phone: req.body.user_phone,
                        user_password: req.body.user_password,
                        user_role: req.body.user_role,
                        user_gender: req.body.user_gender,
                        user_cnic: req.body.user_cnic
                    }).then(res.send("Registration Successful")).catch(err => res.send("Something went wrong"));
                }

                if(role == "vendor"){
                    var serviceItems = req.body.departments;
                    var serviceArray = new Array();
                    serviceArray = serviceItems.split(',');
                    console.log(serviceArray + " Length is " + serviceArray.length);
                    Users.create({
                        user_name: req.body.user_name,
                        user_image: urlImage,
                        user_email: req.body.user_email,
                        user_phone: req.body.user_phone,
                        user_password: req.body.user_password,
                        user_role: req.body.user_role,
                        user_gender: req.body.user_gender,
                        charges: req.body.charges,
                        user_address: req.body.user_address,
                        user_city: req.body.user_city,
                        user_lat: req.body.user_lat,
                        user_lon: req.body.user_lon,
                        user_verification_status: 'pending',
                        user_cnic: req.body.user_cnic
                    }).then(result => {
                        for(var i = 0; i < serviceArray.length-1; i++) {
                            VendorService.create({
                                vendor_id: result.user_id,
                                fk_department_id: serviceArray[i]
                            });
                        }
                    }).then(res.send("Registration Successful")).catch(err => res.send(err));
                }
            }
        }).catch(err => {res.send(err); console.log(err)});
}

// Register without Image
exports.new_user = async (req, res) => {
    await Users.count({ where: { [Op.or]: [{user_email: req.body.user_email}, {user_phone: req.body.user_phone}, {user_cnic: req.body.user_cnic}] }})
        .then(count => {
            if(count != 0) {
                res.send("");
                return;
            }
            else{
                var role = req.body.user_role;

                if(role == "customer"){
                    Users.create({
                        user_name: req.body.user_name,
                        user_email: req.body.user_email,
                        user_phone: req.body.user_phone,
                        user_password: req.body.user_password,
                        user_role: req.body.user_role,
                        user_gender: req.body.user_gender,
                        user_cnic: req.body.user_cnic
                    }).then(res.send("Registration Successful")).catch(err => res.send("Something went wrong"));
                }

                if(role == "vendor"){
                    var serviceItems = req.body.departments;
                    var serviceArray = new Array();
                    serviceArray = serviceItems.split(',');
                    console.log(serviceArray + " Length is " + serviceArray.length);
                    Users.create({
                        user_name: req.body.user_name,
                        user_email: req.body.user_email,
                        user_phone: req.body.user_phone,
                        user_password: req.body.user_password,
                        user_role: req.body.user_role,
                        user_gender: req.body.user_gender,
                        charges: req.body.charges,
                        user_address: req.body.user_address,
                        user_city: req.body.user_city,
                        user_lat: req.body.user_lat,
                        user_lon: req.body.user_lon,
                        user_verification_status: 'pending',
                        user_cnic: req.body.user_cnic
                    }).then(result => {
                        for(var i = 0; i < serviceArray.length-1; i++) {
                            VendorService.create({
                                vendor_id: result.user_id,
                                fk_department_id: serviceArray[i]
                            });
                        }
                    }).then(res.send("Registration Successful")).catch(err => res.send(err));
                }
            }
        }).catch(err => {res.send(err); console.log(err)});
}

exports.update_customer_profile = async (req, res) => {
    var imageFile = req.file.path;

    if(imageFile != null) {
        await uploadImage(imageFile);
        urlImage = JSON.stringify(imgUrl.url);
    }
    else {
        urlImage = "";
    }

    await Users.update({
        user_name: req.body.user_name,
        user_image: urlImage,
        user_phone: req.body.user_phone,
        user_password: req.body.user_password
    },
    {
        where: {
            user_id: req.params.id
        }
    }).then(res.send("Profile Update Successfully")).catch(err => res.send(err));
}

// Update without image
exports.update_customer = async(req, res) => {
    await Users.update({
        user_name: req.body.user_name,
        user_phone: req.body.user_phone,
        user_password: req.body.user_password
    },
    {
        where: {
            user_id: req.params.id
        }
    }).then(res.send("Profile Update Successfully")).catch(err => res.send(err));
}

exports.login_user = async (req, res) => {
    
    await Users.findOne({ 
        where:  { 
            [Op.and]: [{user_email: req.body.user_email}, {user_password: req.body.user_password}] 
        } 
    }).then(result => {
        if(result == null) {
            res.send("")
        }
        else{
            res.send(result);
        }
        
    }).catch(err => res.json(err));
}

exports.find_vendor = async (req, res) => {
    await Users.sequelize.query('SELECT `users`.`user_id`, `users`.`user_name`, `users`.`user_phone`, `users`.`user_address`, `users`.`user_city`, `users`.`user_lat`, `users`.`user_lon`, `users`.`user_image` FROM `users` JOIN `vendor_services` on `users`.`user_id` = `vendor_services`.`vendor_id` JOIN `services` on `vendor_services`.`fk_department_id` = `departments`.`department_id` WHERE `users`.`user_role` = \'vendor\' AND `users`.`user_verification_status` = \'verified\' AND `vendor_services`.`fk_department_id` = '+req.params.id+' LIMIT 1 ')
    .spread((result, metadata) => {
        res.send(result);
    }).catch(err => res.send("Error is " + err));
}

exports.user_profile = async (req, res) => {
    await Users.findOne({ where: {user_id: req.params.id} })
        .then(result => res.send(result)).catch(err => res.send(err));
}

// All Registered Customers
exports.all_customers = async(req, res) => {
    await Users.findAll({
        where: {
            user_role: 'customer'
        }
    }).then(result => {
        res.send(result);
    }).catch(err => res.send(err));
}

// All Registered Service Providors
exports.all_vendors = async(req, res) => {
    await Users.findAll({
        where: {
            user_role: 'vendor',
            user_verification_status: 'verified'
        }
    }).then((result, metadata) => {
        res.send(result);
    }).catch(err => res.send(err));
}

exports.update_password = async (req, res) => {
    await Users.update({
        user_password: req.body.user_password
    },{
        where: {
            user_id: req.params.id
        }
    }).then(res.send("Password Updated Successfully")).catch(err => res.send(err));
}

exports.update_vendor_profile = async (req, res) => {

    var imageFile = req.file.path;

    if(imageFile != null) {
        await uploadImage(imageFile);
        urlImage = JSON.stringify(imgUrl.url);
    }
    else {
        urlImage = "";
    }

    await Users.update({
        user_name: req.body.user_name,
        user_image: urlImage,
        user_email: req.body.user_email,
        user_phone: req.body.user_phone,
        charges: req.body.charges,
        user_address: req.body.user_address,
        user_city: req.body.user_city,
        user_lat: req.body.user_lat,
        user_lon: req.body.user_lon
    }, {
        where: {
            user_id: req.params.id
        }
    }).then(res.send("Profile Updated Successfully")).catch(err => res.send(err));
}

exports.update_vendor = async (req, res) => {
    await Users.update({
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_phone: req.body.user_phone,
        charges: req.body.charges,
        user_address: req.body.user_address,
        user_city: req.body.user_city,
        user_lat: req.body.user_lat,
        user_lon: req.body.user_lon
    }, {
        where: {
            user_id: req.params.id
        }
    }).then(res.send("Profile Updated Successfully")).catch(err => res.send(err));
}

exports.change_status = async (req, res) => {
    await Users.update({
        user_status: req.body.status
    },{
        where: {
            user_id: req.params.id
        }
    }).then(res.send("User Status Updated")).catch(err => res.send(err));
}

exports.verify_email = async (req, res) => {
    await Users.findOne({
        where: {
            user_email: req.body.user_email
        }
    }).then(result =>
            res.send(result)).catch(err => res.send(err));
}

exports.reset_password = async (req, res) => {
    await Users.update({
        user_password: req.body.password
    },
    {
        where: {
            user_email: req.body.email
        }
    }).then(res.send("Password Reset Successfully")).catch(err => res.send(err));
}

exports.update_status = async (req, res) => {
    Users.update({
        user_online: req.body.status
    },{
        where: {
            user_id: req.params.id
        }
    }).then(res.send("Status Updated Successfully")).catch(err => res.send(err));
}
//Newly Added
exports.update_pen_verification_status = async (req, res) => {
    Users.update({
        user_verification_status: 'verified'
    },{
        where: {
            user_id: req.params.id
        }
    }).then(res.send("Verification Status Updated Successfully")).catch(err => res.send(err));
}

exports.update_rej_verification_status = async (req, res) => {
    Users.update({
        user_verification_status: 'rejected'
    },{
        where: {
            user_id: req.params.id
        }
    }).then(res.send("Verification Status Updated Successfully")).catch(err => res.send(err));
}

exports.update_daily_jobs = async (req, res) => {
    await Users.update({
        daily_jobs: req.body.jobs
    },{
        where: {
            user_id: req.params.id
        }
    }).then(res.send("Job Started")).catch(err => res.send(err));
}

//Delete  User
exports.delete_user = async (req, res) => {
    await Users.destroy({
        where: {
            user_id: req.params.id
        }
    }).then(res.send("User has been Deleted")).catch(err => res.send(err));
}

exports.reset_jobs = async (req, res) => {
    await Users.update({
        daily_jobs: "0"
    }, {
        where: {
            user_id: req.params.id
        }
    }).then(result => res.send("Vendor Jobs Updated to 0")).catch(err => res.send(err));
}