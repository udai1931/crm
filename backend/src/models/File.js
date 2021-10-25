module.exports = (sequelize, Sequelize) => {
    const File = sequelize.define('File', {
        file_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        path: {
            type: Sequelize.STRING,
            allowNull: false
        },
        size: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return File;
}