module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define('services', {
        service_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        service_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        service_des: {
            type: DataTypes.STRING,
            allowNull: false
        },
        service_cart: {
            type: DataTypes.STRING,
            defaultValue: 'uncarted',
            allowNull: false
        },
        service_price: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        timestamps: false
    }
    );
    return Service;
};