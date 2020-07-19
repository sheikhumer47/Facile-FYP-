const env = {
    username: "root",
    password: "",
    database: "service",
    host: "localhost",
    dialect: "mysql",
    pool: {
        max: 50000,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = env;

// const env = {
//     database: 'wivaa',
//     username: 'postgres',
//     password: 'comsian038',
//     host: 'localhost',
//     dialect: 'postgres',
//     pool: {
//         max: 50000,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// };

// module.exports = env;