module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('ratings', {
        rating_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rating_stars: {
            type: DataTypes.STRING,
            allowNull: false
        },
        feedback: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        timestamps: false
    }
    );

    return Rating;
};