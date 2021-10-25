const { Department, Sequelize, sequelize, User, Day } = require('../../db');
let db = require('../../db');
let login = db.User;
let { signUser, verify } = require("../utils/token.js")
let moment = require('moment');
const Op = Sequelize.Op;

module.exports.getEmployeeById = async (req, res) => {
    try {
        let id = req.params.id;
        let user = await User.findOne({
            where: {
                user_id: id
            },
            include: Department
        });
        if (user) {
            res.status(200).json({
                message: "User found",
                user: user
            });
        } else {

            res.status(200).json({
                message: "User not found"
            });
        }
    } catch (error) {
        res.status(200).json({
            message: "Internal server error"
        });
    }
}

module.exports.updateUser = async (req, res) => {
    try {
        let { user_id } = req.params
        let user = await login.update(req.body, {
            where: {
                user_id
            }
        });
        res.status(200).json({
            success: "1",
            message: "User updated successfully",
            data: user
        });
    } catch (error) {
        res.status(200).json({
            success: 0,
            error: error.message
        });
    }
}

module.exports.addUser = async (req, res) => {
    try {
        // console.log(req.body);
        let data = await login.build(req.body)
        await data.save()
        let token = await signUser({ ...data.dataValues })
        res.status(200).json({
            token, data
        })
    } catch (error) {
        res.status(200).json({ success: "0", error: error.message })
    }
}

module.exports.findUser = async (req, res) => {
    try {
        let data = await login.findOne({ where: req.body });
        let token = await signUser({ ...data.dataValues })
        res.status(200).json({
            token, data: {
                name: data.dataValues.name,
                email: data.dataValues.email,
                address: data.dataValues.address,
                role: data.dataValues.role
            }
        })
    } catch (error) {
        res.status(200).json({ success: "0", error: error.message })
    }
}
module.exports.getUserFromToken = async (req, res) => {
    try {
        const token = req.body.token;
        let user = await verify(token)
        res.status(200).json({
            token, data: user
        })
    } catch (error) {
        res.status(200).json({ success: "0", error: error.message })
    }
}

module.exports.getAllEmp = async (req, res) => {
    try {
        let data = await sequelize.query("select user_id, color, Departments.name as dept,Users.name,Users.name,Users.email,role from Users inner join Departments on Users.department_id = Departments.department_id");
        res.status(200).json({ success: "1", data: data[0] })

    } catch (error) {
        res.status(200).json({ success: "0", error: error.message })
    }
}

module.exports.getDeptEmpl = async (req, res) => {
    const { dept_id } = req.params
    try {
        let data = await sequelize.query("select user_id,Departments.name as dept,Users.name,Users.name,Users.email,role from Users inner join Departments on Users.department_id = Departments.department_id where Departments.department_id = " + dept_id);
        res.status(200).json({ success: "1", data: data[0] })
    }
    catch (error) {
        res.status(200).json({ success: "0", error: error.message })
    }
}




module.exports.searchEmployee = async (req, res) => {
    try {
        console.log(req.body);
        let name = req.body.name ? req.body.name : '';
        let dept_id = req.body.department;
        let role = req.body.role ? req.body.role : '';
        let department = await Department.findAll({
            where: {
                department_id: dept_id == 0 ? {
                    [Op.not]: null
                } : dept_id
            },
            include: [{
                model: User,
                where: {
                    name: {
                        [Op.like]: "%" + name + "%"
                    },
                    role: {
                        [Op.like]: "%" + role + "%"
                    }
                }
            }]
        })
        res.status(200).json({ success: "1", data: department })
    } catch (error) {
        res.status(200).json({ success: "0", error: error.message })
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        let check = await User.findOne({ where: { user_id: req.body.id } })
        if (check) {
            let data = await login.destroy({
                where: {
                    user_id: req.body.id
                }
            })
            let data1 = await sequelize.query("select user_id, Departments.name as dept,Users.name,Users.name,Users.email,role from Users inner join Departments on Users.department_id = Departments.department_id");
            res.status(200).json({ success: "1", data: data1[0] })
        } else {
            res.status(200).json({ success: "0", error: "User Not found." })
        }

    } catch (error) {
        res.status(200).json({ success: "0", error: error.message })
    }
}



module.exports.getDepartmentMembers = async (req, res) => {
    try {
        // verify token
        const token = req.headers.authorization.split(" ")[1];
        let user = await verify(token);
        let data = await Department.findAll({
            include: [{
                model: User,
                include: [{
                    model: Day
                }]
            }],
            where: {
                department_id: user.department_id
            }
        })
        res.status(200).json({
            success: "1", departmentMembers: {
                name: data[0].name, users: data[0].Users
            }
        })
    } catch (error) {
        res.status(200).json({
            success: "0", error: error.message
        })
    }
}