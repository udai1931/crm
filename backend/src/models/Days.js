module.exports = (sequelize, Sequelize) => {
    const Days = sequelize.define('Days', {
        day_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: Sequelize.DATE
        },
        first_half: {
            type: Sequelize.BOOLEAN
        },
        second_half: {
            type: Sequelize.BOOLEAN
        },
        today: {
            type: Sequelize.DATEONLY
        },
        in_time: {
            type: Sequelize.TIME,
        },
        out_time: {
            type: Sequelize.TIME,
        }
    }, {
        timestamps: true
    });
    return Days;
}