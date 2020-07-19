const db = require('../config/db.config.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Rating = db.ratings;

exports.post_rating = async (req, res) => {
    await Rating.create({
        rating_stars: req.body.rating_stars,
        feedback: req.body.feedback,
        fk_job_id: req.body.job_id,
        vendor_id: req.body.vendor_id
    }).then(res.send("Job Rated Successfully!")).catch(err => res.send(err));
}

exports.find_rating = async (req, res) => {
    await Rating.findOne({
        where: {
            fk_job_id: req.params.id
        }
    }).then(result => {
        if(result == null){
            res.send("")
        }
        else{
            res.send(result)
        }
    }).catch(err => res.send(err));
}

exports.find_all_rating = async (req, res) => {
    await Rating.sequelize.query('SELECT `ratings`.`rating_id`, `ratings`.`rating_stars` FROM `ratings` JOIN `users` on `ratings`.`vendor_id` = `users`.`user_id` where `ratings`.`vendor_id` = '+req.params.id+' ')
    .spread((result, metadata) => {
        res.send(result);
    }).catch(err => res.send(err));
}


exports.fetch_average_rating = async(req, res) => {
    await Rating.sequelize.query('SELECT AVG(rating_stars) as `rating` FROM `ratings` JOIN `users` on `ratings`.`vendor_id` = `users`.`user_id` where `ratings`.`vendor_id` = '+req.params.id+' ')
    .spread((result, metadata) => {
        res.send(result);
    }).catch(err => res.send(err));
}

// ratings

exports.fetch_service_average_rating = async(req, res) => {
    await Rating.findAll({
        where: {
            vendor_id: req.params.id
        }
    }).then(result => {
        res.send(result);
    }).catch(err => res.send(err));
}
