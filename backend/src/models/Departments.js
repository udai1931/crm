module.exports = (sequelize, Sequelize) => {
    const Departments = sequelize.define("Departments", {
        department_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        color:{
            type: Sequelize.STRING,
        }
    }, {
        timestamps: true
    });
    Departments.associate = (models) => {
        Departments.hasMany(models.Users, {
            foreignKey: 'department_id',
            as: 'users'
        });
    };

    return Departments;
};