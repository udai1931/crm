const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("crm", "root", "", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    pool: {
        max: 5, min: 0, idle: 10000
    },
    logging: false
});

async function auth() {
    try {
        const a = await sequelize.authenticate()
        console.log("connected");
        await db.sequelize.sync({ force: false });
        console.log("sync done");
    } catch (error) {
        console.log(error);
    }
}


const db = {
    Sequelize,
    sequelize,
    User: require("./src/models/Users.js")(sequelize, Sequelize),
    Department: require("./src/models/Departments.js")(sequelize, Sequelize),
    Rating: require("./src/models/Ratings.js")(sequelize, Sequelize),
    Health: require("./src/models/Healths.js")(sequelize, Sequelize),
    Happiness: require("./src/models/Happiness.js")(sequelize, Sequelize),
    Break: require("./src/models/Breaks.js")(sequelize, Sequelize),
    Day: require("./src/models/Days.js")(sequelize, Sequelize),
    Sales: require("./src/models/Sales.js")(sequelize, Sequelize),
    File: require("./src/models/File.js")(sequelize, Sequelize),
};



/* DB Relations */
db.Department.hasMany(db.User, { foreignKey: "department_id" });
db.User.belongsTo(db.Department, { foreignKey: "department_id" });
db.User.hasMany(db.Day, { foreignKey: "user_id" });
db.User.hasMany(db.Break, { foreignKey: "user_id" });
db.Day.belongsTo(db.User, { foreignKey: "user_id" });
db.Day.hasOne(db.Rating, { foreignKey: "day_id" });
db.Rating.belongsTo(db.Day, { foreignKey: "day_id" });
db.Day.hasMany(db.Break, { foreignKey: "day_id" });
db.Break.belongsTo(db.Day, { foreignKey: "day_id" });
db.Day.hasOne(db.Health, { foreignKey: "day_id" });
db.Health.belongsTo(db.Day, { foreignKey: "day_id" });
db.Day.hasOne(db.Happiness, { foreignKey: "day_id" });
db.Happiness.belongsTo(db.Day, { foreignKey: "day_id" });
db.User.hasMany(db.Sales, { foreignKey: "leader_id" });
db.User.hasMany(db.Sales, { foreignKey: "assigned_id" });

auth();

module.exports = db;
