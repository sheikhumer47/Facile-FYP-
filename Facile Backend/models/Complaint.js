module.exports = (sequelize, DataTypes) => {
    const Complaint = sequelize.define('complaints', {
        complaint_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        complaint_message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        against_user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        against_user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        timestamps: false
    }
    );

    return Complaint;
};