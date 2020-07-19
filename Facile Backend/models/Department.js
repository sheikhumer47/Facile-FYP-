module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define('departments', {
        department_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        department_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        timestamps: false
    }
    );
    return Department;
};