const db = require('../config/db.config.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Department = db.departments;

// ADD NEW SERVICE

exports.add_department = async (req, res) => {

    // CHECK IF SERVICE EXISTS
    await Department.count({ where: { department_name: req.body.department_name }})
        .then(count => { 
            if(count != 0 ){
                res.send("Department already exists");
                return;
            }
            else {
                // REGISTER SERVICE
                Department.create({
                    department_name: req.body.department_name
                }).then(res.send("Department Added Successfully")).catch(err => res.send(err));
            }
         }).catch(err => res.send(err));
}

// FETCH ALL SERVICES

exports.get_department = async(req, res) => {
    await Department.findAll().then(departments => res.send(departments)).catch(err => res.send(err));
}
