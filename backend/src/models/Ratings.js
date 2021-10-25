module.exports = (sequelize, Sequelize) => {
    const Ratings = sequelize.define("Ratings", {
        rating_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        remark: {
            type: Sequelize.STRING,
        },
        rating_of_the_day: {
            type: Sequelize.INTEGER,
        },
    }, {
        timestamps: true
    });
    return Ratings;
};