module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_image: {
            type: DataTypes.TEXT,
            defaultValue: "",
            allowNull: true
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        user_phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_address: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false
        },
        user_city: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false
        },
        user_gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_cnic: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_status: {
            type: DataTypes.STRING,
            defaultValue: 'enabled',
            allowNull: false
        },
        charges: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false
        },
        user_verification_status: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user_lat: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false
        },
        user_lon: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false
        },
        user_online: {
            type: DataTypes.STRING,
            defaultValue: "yes",
            allowNull: false
        },
        daily_jobs: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
    },
    {
        timestamps: false
    }
    );

    return User;
};