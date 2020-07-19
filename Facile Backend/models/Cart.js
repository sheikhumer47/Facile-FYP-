module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('carts', {
        cart_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cart_created_date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        service_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        service_des: {
            type: DataTypes.STRING,
            allowNull: false
        },
        service_price: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dept_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        vendor_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        depart_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        timestamps: false
    }
    );
    return Cart;
};