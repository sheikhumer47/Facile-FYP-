const db = require('../config/db.config.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Complaint = db.complaints;

// New Complaint
exports.submit_complaint = async (req, res) => {
    await Complaint.create({
        complaint_message: req.body.message,
        fk_user_id: req.body.fk_user_id,
        against_user_id: req.body.against_user_id,
        against_user_name: req.body.against_user_name
    }).then(result => res.send("Complaint Submitted Successfully")).catch(err => res.send(err));
}

// All Complaints
exports.all_complaints = async (req, res) => {
    await Complaint.findAll().then(result => {
        res.send(result);
    }).catch(err => res.send(err));
}

// All Complaints of perticular User
exports.all_single_user_complaints = async (req, res) => {
    await Complaint.findAll({
        where: {
            fk_user_id : req.params.id
        }
    }).then(result => {
        res.send(result);
    }).catch(err => res.send(err));
}

//Complaint Details
exports.complaint_details = async (req, res) => {
    await Complaint.sequelize.query('SELECT `complaints`.`complaint_id`, `complaints`.`complaint_message`, `users`.`user_name`, `users`.`user_image` FROM `complaints` JOIN `users` on `complaints`.`fk_user_id` = `users`.`user_id` ')
        .spread((result,metadata) => res.send(result)).catch(err => res.send(err));
}