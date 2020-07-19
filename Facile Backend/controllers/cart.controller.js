const db = require('../config/db.config.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Cart = db.carts;

exports.new_cart = async (req, res) => {
    await Cart.create({
        cart_created_date: req.body.cart_created_date,
        service_name: req.body.service_name,
        service_des: req.body.service_des,
        service_price: req.body.service_price,
        dept_name: req.body.dept_name,
        vendor_id: req.body.vendor_id,
        customer_id: req.body.customer_id,
        fk_service_id: req.body.fk_service_id,
        depart_id: req.body.depart_id
    }).then(res.send("Cart Created")).catch(err => res.send(err));
}

// All Carts

exports.get_carts = async(req, res) => {
    await Cart.sequelize.query('SELECT `carts`.`cart_id`, `carts`.`cart_created_date`, `carts`.`service_name`, `carts`.`service_des`, `carts`.`service_price`, `carts`.`dept_name`, `carts`.`vendor_id`, `carts`.`customer_id`, `carts`.`depart_id`, `carts`.`fk_service_id` FROM `carts` JOIN `users` on `carts`.`customer_id` = `users`.`user_id` where `carts`.`customer_id` = '+req.params.id+' ')
    .spread((result, metadata) => res.send(result)).catch(err => res.send(err));
}


// Cancel Job
exports.cancel_cart = async (req, res) => {
    await Cart.destroy({
        where: {
            cart_id: req.params.id
        }
    }).then(res.send("Cart Deleted")).catch(err => res.send(err));
}
