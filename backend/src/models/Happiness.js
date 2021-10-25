module.exports = (sequelize, Sequelize) => {
    const Happiness = sequelize.define("Happiness", {
        happiness_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        programming: {
            type: Sequelize.INTEGER,
        },
        english: {
            type: Sequelize.INTEGER,
        },
        gym: {
            type: Sequelize.INTEGER,
        },
        performance: {
            type: Sequelize.INTEGER,
        }
    }, {
        timestamps: true
    });
    return Happiness;
};