module.exports = (sequelize, Sequelize) => {
    const Healths = sequelize.define("Healths", {
        health_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        morning_temperature: {
            type: Sequelize.FLOAT,
        },
        evening_temperature: {
            type: Sequelize.FLOAT,
        },
        covid_symptoms: {
            type: Sequelize.STRING,
        },
        mask_wearing_rating: {
            type: Sequelize.INTEGER,
        }
    }, {
        timestamps: true
    });
    return Healths;
};