module.exports = (sequelize, DataTypes) => {
    const VendorService = sequelize.define('vendor_services', {
        vendor_service_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    },
    {
        timestamps: false
    }
    );

    return VendorService;
};