module.exports = (sequelize, Sequelize) => {
    const Sales = sequelize.define('sales', {
        sales_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        localtion: {
            type: Sequelize.STRING
        },
        college_name: {
            type: Sequelize.STRING
        },
        passout_year: {
            type: Sequelize.INTEGER
        },
        response: {
            type: Sequelize.STRING
        },
        call_later: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        interested: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        link: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        paid: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        remarks: {
            type: Sequelize.STRING,
            defaultValue: "Not Contacted Yet"
        },
        date_of_assign: {
            type: Sequelize.DATEONLY
        },
    }, {
        timestamps: true
    });
    return Sales;
};