const { Sales, Sequelize, User, sequelize } = require("../../db");
const Op = Sequelize.Op;
const { verify } = require("../utils/token");
const fs = require("fs");
const salesLeaderCols = ["email", "college_name", "passout_year", "leader_id", "createdAt", "updatedAt", "response", "call_later", "interested", "link", "date_of_assign"]
const salesPersonsCols = ["email", "college_name", "passout_year", "assigned_id", "leader_id", "createdAt", "updatedAt", "date_of_assign"]
const adminCols = ["location", "response", "call_later", "interested", "link", "remarks", "date_of_assign", "createdAt", "updatedAt", "assigned_id"]

module.exports.getSales = async (req, res) => {
    try {
        let token = req.headers.authorization;
        token = token.split(" ")[1];
        let user = await verify(token);
        let col = user.role == "salesperson" ? "assigned_id" : user.role == "salesleader" ? "leader_id" : null;
        if (user.role == "Admin") {
            let sales = await Sales.findAll({
                attributes: {
                    exclude: user.role == "salesperson" ? salesPersonsCols : user.role == "salesleader" ? salesLeaderCols : user.role == "Admin" ? adminCols : null
                }
            });

            res.status(200).json({
                success: 1,
                sales
            });
        } else {
            let sales = await Sales.findAll({
                attributes: {
                    exclude: user.role == "salesperson" ? salesPersonsCols : user.role == "salesleader" ? salesLeaderCols : user.role == "Admin" ? adminCols : null
                },
                where: {
                    [col]: user.user_id
                }
            });

            res.status(200).json({
                success: 1,
                sales
            });
        }
    } catch (error) {
        res.status(200).json({
            success: 0,
            error: error.message
        });
    }
};

module.exports.updateSales = async (req, res) => {
    try {
        let sales = await Sales.findOne({
            where: {
                sales_id: req.params.id
            }
        });
        if (sales) {
            sales.update(req.body);
            res.status(200).json({
                success: 1,
                sales
            });
        } else {
            res.status(200).json({
                success: 0,
                error: "Sales not found"
            });
        }
    } catch (error) {
        res.status(200).json({
            success: 0,
            error: error.message
        });
    }
};


module.exports.searchByName = async (req, res) => {
    try {
        // get token from header
        let token = req.headers.authorization;
        token = token.split(" ")[1];
        let user = await verify(token);
        // let col = user.role == "salesperson" ? null : user.role == "salesleader" ? "assigned_id" : null;

        let sales = await Sales.findAll({
            where: {
                name: {
                    [Op.like]: "%" + req.body.search_name + "%"
                },
                // [col]: user.user_id
            },
            attributes: {
                exclude: user.role == "salesperson" ? salesPersonsCols : user.role == "salesleader" ? salesLeaderCols : user.role == "Admin" ? adminCols : null
            }
        });

        res.status(200).json({
            success: 1,
            sales
        });
    } catch (error) {
        res.status(200).json({
            success: 0,
            error: error.message
        });
    }
};

module.exports.searchByNamePerson = async (req, res) => {
    try {
        let token = req.headers.authorization;
        token = token.split(" ")[1];
        let user = await verify(token);
        // let col = user.role == "salesperson" ? null : user.role == "salesleader" ? "assigned_id" : null;

        let sales = await Sales.findAll({
            where: {
                name: {
                    [Op.like]: "%" + req.body.search_name + "%"
                },
                assigned_id: user.user_id
            },
            attributes: {
                exclude: user.role == "salesperson" ? salesPersonsCols : user.role == "salesleader" ? salesLeaderCols : user.role == "Admin" ? adminCols : null
            }
        });

        res.status(200).json({
            success: 1,
            sales
        });
    } catch (error) {
        res.status(200).json({
            success: 0,
            error: error.message
        });
    }
};

module.exports.searchByNameLeader = async (req, res) => {
    try {
        let token = req.headers.authorization;
        token = token.split(" ")[1];
        let user = await verify(token);


        let sales = await Sales.findAll({
            where: {
                name: {
                    [Op.like]: "%" + req.body.search_name + "%"
                },
                leader_id: user.user_id
            },
            attributes: {
                exclude: user.role == "salesperson" ? salesPersonsCols : user.role == "salesleader" ? salesLeaderCols : user.role == "Admin" ? adminCols : null
            }
        });

        res.status(200).json({
            success: 1,
            sales
        });
    } catch (error) {
        res.status(200).json({
            success: 0,
            error: error.message
        });
    }
};



module.exports.getLeaders = async (req, res) => {
    try {
        let token = req.headers.authorization;
        token = token.split(" ")[1];
        let user = await verify(token);
        if (user.role == "Admin") {
            let sales = await User.findAll({
                where: {
                    role: "salesleader"
                }
            });
            res.status(200).json({
                success: 1,
                salesLeaders: sales
            });
        } else {
            res.status(200).json({
                success: 0,
                error: "You are not authorized to view this"
            });
        }
    } catch (error) {
        res.status(200).json({
            success: 0,
            error: error.message
        });
    }
}

module.exports.assignLeader = async (req, res) => {
    try {
        let { start, end, leader_id } = req.body;
        let sales = await Sales.findAll({
            where: {
                sales_id: {
                    [Op.between]: [start, end]
                }
            }
        });
        for (let i = 0; i < sales.length; i++) {
            await sales[i].update({
                leader_id
            });
        }
        res.status(200).json({
            success: 1,
        });
    } catch (error) {
        res.status(200).json({
            success: 0,
            error: error.message,
        });
    }
}



module.exports.getSalesPersons = async (req, res) => {
    try {
        let token = req.headers.authorization;
        token = token.split(" ")[1];
        let user = await verify(token);
        if (user.role == "Admin" || user.role == "salesleader") {
            let sales = await User.findAll({
                where: {
                    role: "salesperson"
                }
            });
            res.status(200).json({
                success: 1,
                salesLeaders: sales
            });
        } else {
            res.status(200).json({
                success: 0,
                error: "You are not authorized to view this"
            });
        }
    } catch (error) {
        res.status(200).json({
            success: 0,
            error: error.message
        });
    }
}

module.exports.assignPerson = async (req, res) => {
    try {
        let { start, end, person_id } = req.body;
        let sales = await Sales.findAll({
            where: {
                sales_id: {
                    [Op.between]: [start, end]
                }
            }
        });

        for (let i = 0; i < sales.length; i++) {
            await sales[i].update({
                assigned_id: person_id,
                date_of_assign: new Date()
            });
        }
        res.status(200).json({
            success: 1,
        });
    } catch (error) {
        res.status(200).json({
            success: 0,
            error: error.message,
            sql
        });
    }
}

module.exports.uploadFile = async (req, res) => {
    try {
        // upload file in multer 

        let file = req.files.file.name

        console.log(file);
    } catch (error) {
        res.status(200).json({
            success: 0,
            error: error.message,
        });
    }
}


module.exports.assignFilter = async (req, res) => {
    try {
        let { filter } = req.body;
        let token = req.headers.authorization;
        token = token.split(" ")[1];
        let user = await verify(token);
        let condition = filter ? Op.not : Op.is;
        let col = user.role == "Admin" ? "leader_id" : "assigned_id";
        let col2 = user.role == "salesperson" ? "assigned_id" : user.role == "salesleader" ? "leader_id" : null;

        if (user.role == "Admin") {
            let sales = await Sales.findAll({
                where: {
                    [col]: {
                        [condition]: null
                    },
                },
                attributes: {
                    exclude: user.role == "salesperson" ? salesPersonsCols : user.role == "salesleader" ? salesLeaderCols : user.role == "Admin" ? adminCols : null
                }
            });

            res.status(200).json({
                success: 1,
                sales
            });
        }
        else {
            let sales = await Sales.findAll({
                where: {
                    [col]: {
                        [condition]: null
                    },
                    [col2]: user.user_id
                },
                attributes: {
                    exclude: user.role == "salesperson" ? salesPersonsCols : user.role == "salesleader" ? salesLeaderCols : user.role == "Admin" ? adminCols : null
                }
            });

            res.status(200).json({
                success: 1,
                sales
            });
        }
    } catch (error) {
        res.status(200).json({
            success: 0,
            error: error.message
        });
    }
}


