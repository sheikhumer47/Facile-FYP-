module.exports = (sequelize, DataTypes) => {
    const Job = sequelize.define('jobs', {
        job_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        job_status: {
            type: DataTypes.STRING,
            defaultValue: "started",
            allowNull: false
        },
        job_start_date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        job_start_time: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: true
        },
        job_finish_time: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: true
        },
        job_final_start_time: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: true
        },
        job_final_finish_time: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: true
        },
        cus_lat: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false
        },
        cus_lon: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false
        },
        total_bill: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: true
        },
        cash_status: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: true
        },
        vendor_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        timestamps: false
    }
    );
    return Job;
};