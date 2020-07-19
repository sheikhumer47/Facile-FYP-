const env = require('./env.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,

    pool: {
        max: env.pool.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

sequelize.authenticate().then(() => console.log('Connection Established')).catch(err => console.log('Unable to Connect', err));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

 db.users = require('../models/User.js')(sequelize, Sequelize);
 db.services = require('../models/Service.js')(sequelize, Sequelize);
 //New
 db.departments = require('../models/Department.js')(sequelize, Sequelize);

 db.ratings = require('../models/Rating.js')(sequelize, Sequelize);
 db.vendorservices = require('../models/VendorService.js')(sequelize, Sequelize);
 db.jobs = require('../models/Job.js')(sequelize, Sequelize);
 db.complaints = require('../models/Complaint.js')(sequelize, Sequelize);

 db.carts = require('../models/Cart.js')(sequelize, Sequelize);

// one-to-many for User and VendorService
 db.users.hasMany(db.vendorservices, {foreignKey: 'vendor_id', sourceKey: 'user_id'});

// on-to-many for Category and VendorService
 db.departments.hasMany(db.vendorservices, {foreignKey: 'fk_department_id', sourceKey: 'department_id'});

// one-to-many for Users and Jobs
db.users.hasMany(db.jobs, {foreignKey: 'customer_id', sourceKey: 'user_id'});

// one-to-many for Users and Carts
db.users.hasMany(db.carts, {foreignKey: 'customer_id', sourceKey: 'user_id'});

// New
 db.departments.hasMany(db.services, {foreignKey: 'fk_depart_id', sourceKey: 'department_id'});

// one-to-many for Users and Jobs
db.services.hasMany(db.jobs, {foreignKey: 'fk_service_id', sourceKey: 'service_id'});

// one-to-many for Users and Carts
db.services.hasMany(db.carts, {foreignKey: 'fk_service_id', sourceKey: 'service_id'});

db.jobs.hasOne(db.ratings, {foreignKey: 'fk_job_id', sourceKey: 'job_id'});
// one-to-many for Users and Ratings
db.users.hasMany(db.ratings, {foreignKey: 'vendor_id', sourceKey: 'user_id'});

// one-to-many for Users and Complaints
db.users.hasMany(db.complaints, {foreignKey: 'fk_user_id', sourceKey: 'user_id'});


 module.exports = db;