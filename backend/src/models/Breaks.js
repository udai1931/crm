module.exports = (sequelize, Sequelize) => {
    const Breaks = sequelize.define("Breaks", {
        break_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
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
    return Breaks;
};