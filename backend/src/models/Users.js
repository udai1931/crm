module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("Users", {
        user_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        salary: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        dose_1: {
            type: Sequelize.DATE,
        },
        dose_2: {
            type: Sequelize.DATE,
        },
    }, {
        timestamps: true
    });
    
    return User;
};