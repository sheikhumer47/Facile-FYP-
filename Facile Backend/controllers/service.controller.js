const db = require('../config/db.config.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const cloudinary = require('cloudinary');

const Service = db.services;
const Department = db.departments;
// ADD NEW SERVICE

exports.add_service = async (req, res) => {

  //  CHECK IF SERVICE EXISTS
    await Service.count({ where: { service_name: req.body.service_name } })
        .then(count => { 
            if(count != 0 ){
                res.send("Service already exists");
                return;
            }
            else {
                // REGISTER SERVICE
                Service.create({
                    service_name: req.body.service_name,
                    service_des: req.body.service_des,
                    service_price: req.body.service_price,
                    fk_depart_id: req.body.department_id
                }).then((result)=>{
                    console.log(result)
                    res.send("Service Added Successfully")}).catch(err => res.send(err));
            }
         }).catch(err => res.send(err));
}


// FETCH ALL SERVICES

exports.get_services = async(req, res) => {
    await Service.findAll().then(services => res.send(services)).catch(err => res.send(err));
}

// UPDATE SERVICE
exports.update_service = async (req, res) => {
        // UPDATE SERVICE
        Service.update({
            service_name: req.body.service_name,
            service_des: req.body.service_des,
            service_price: req.body.service_price
        },{
            where: {
                service_id: req.params.id
            }
        }).then((result)=>{
            console.log(result)
            res.send("Service Updated Successfully")}).catch(err => res.send(err));   
}
//Delete 
exports.delete_service = async (req, res) => {
    await Service.destroy({
        where: {
            service_id: req.params.id
        }
    }).then(res.send("Service has been Deleted")).catch(err => res.send(err));
}
 
// Find Single Service Data based on ID
exports.fetch_single_service = async(req, res) => {
    await Service.sequelize.query('SELECT `services`.`service_id`, `services`.`service_name`, `services`.`service_des`, `services`.`service_price` FROM `services` WHERE `services`.`service_id` = '+req.params.id+' ')
       .spread((result, metadata) => res.send(result)).catch(err => res.send(err));
}

//// Fetch all services of one deparmtnent
exports.fetch_dept_services = async(req, res) => {
    await Department.sequelize.query('SELECT `services`.`service_id`, `services`.`service_name`,  `services`.`service_des`, `services`.`service_price`, `departments`.`department_name`,`departments`.`department_id` FROM `departments` JOIN `services` on `departments`.`department_id` = `services`.`fk_depart_id` ')
       .spread((result, metadata) => res.send(result)).catch(err => res.send(err));
}
//WHERE `vendor_services`.`fk_department_id` = '+req.params.id+'

//fetch all services of 1 department
exports.fetch_single_dept_services = async (req, res) => {
    await Service.sequelize.query('SELECT `services`.`service_id`, `services`.`service_name`,  `services`.`service_des`, `services`.`service_price`, `departments`.`department_name` FROM `services` JOIN `departments` on `services`.`fk_depart_id` = `departments`.`department_id` WHERE `services`.`fk_depart_id` = '+req.params.id+' AND `services`.`service_cart` = \'uncarted\' ')
       .spread((result, metadata) => res.send(result)).catch(err => res.send(err));
}

exports.update_cart_status = async (req, res) => {
    Service.update({
        service_cart: req.body.service_cart
    },{
        where: {
            service_id: req.params.id
        }
    }).then(res.send("Cart Status Updated Successfully")).catch(err => res.send(err));
}