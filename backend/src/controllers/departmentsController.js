
const { Department, User, sequelize } = require("../../db")

module.exports.getTopTen = async (req, res) => {

}

//insert department 
module.exports.insertDepartment = async (req, res) => {
    try {
        const { name } = req.body
        const department = await Department.create({
            name
        })
        res.status(200).json({
            success: 1,
            message: "Department created successfully",
            department
        })
    } catch (error) {
        res.status(200).json({
            success: 0,
            message: "Error creating department",
            error
        })
    }
}

//update department
module.exports.updateDepartment = async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body
        const department = await Department.update({
            name
        }, {
            where: {
                id
            }
        })
        res.status(200).json({
            success: 1,
            message: "Department updated successfully",
            department
        })
    } catch (error) {
        res.status(200).json({
            success: 0,
            message: "Error updating department",
            error
        })
    }
}

//delete department
module.exports.deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params
        const department = await Department.destroy({
            where: {
                id
            }
        })
        res.status(200).json({
            success: 1,
            message: "Department deleted successfully",
            department
        })
    } catch (error) {
        res.status(200).json({
            success: 0,
            message: "Error deleting department",
            error
        })
    }
}




module.exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.findAll()

        res.status(200).json({
            success: 1, data: [...departments]
        })
    } catch (error) {
        res.status(200).json({ success: 1, error: error.message })
    }
}

module.exports.getAllEmployeesOfDepartment = async (req, res) => {

}