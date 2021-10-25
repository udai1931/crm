const { Break, sequelize } = require("../../db");
const { verify } = require("../utils/token");
const moment = require('moment');

// get all breaks
module.exports.get_breaks = async function (req, res) {
    try {
        // get token from header
        let token = req.headers.authorization;
        // split token
        let token_data = token.split(" ")[1];
        let user = await verify(token_data);
        if (user.role == "Admin" || user.role == "hdd" || user.role == "Team Lead") {
            let { day_id, user_id } = req.body;
            const breaks = await Break.findAll({
                where: {
                    day_id,
                    user_id
                }
            });
            res.status(200).json(breaks);
        } else {
            res.status(200).json({
                success: 0,
                message: "You are not authorized to access this page"
            });
        }
    } catch (error) {
        res.status(200).json({
            message: error.message,
        });
    }
};

// get status of break
module.exports.get_break_status = async function (req, res) {
    try {
        let token = req.headers.authorization;
        // split token
        let token_data = token.split(" ")[1];
        let user = await verify(token_data);
        if (user.role == "Admin" || user.role == "hdd" || user.role == "Team Lead") {
            let { day_id, user_id } = req.body;
            const break_status = await Break.findOne({
                where: {
                    day_id,
                    user_id,
                    in_time: null
                }
            });
            if (break_status) {
                res.status(200).json({
                    status: 1,
                    data: break_status
                });
            } else {
                res.status(200).json({
                    status: 0
                });
            }
        } else {
            res.status(200).json({
                success: 0,
                message: "You are not authorized to access this page"
            });
        }
    } catch (error) {
        res.status(200).json({
            status: 0,
            message: error.message
        });
    }
};


// start break for a day
module.exports.start_break = async function (req, res) {
    try {
        let token = req.headers.authorization;
        // split token
        let token_data = token.split(" ")[1];
        let user = await verify(token_data);
        if (user.role == "Admin" || user.role == "hdd" || user.role == "Team Lead") {
            let { day_id, out_time, user_id } = req.body;
            let breakk = await Break.create({
                day_id,
                out_time: moment(out_time).format('HH:mm:ss'),
                user_id
            });

            res.status(200).json({
                success: 1,
                message: "Break started",
                breakk
            });
        } else {
            res.status(200).json({
                success: 0,
                message: "You are not authorized to access this page"
            });
        }
    } catch (error) {
        res.status(200).send({
            success: 0,
            message: error.message
        });
    }
}

// update end time of break
module.exports.end_break = async function (req, res) {
    try {
        let token = req.headers.authorization;
        let token_data = token.split(" ")[1];
        let user = await verify(token_data);
        if (user.role == "Admin" || user.role == "hdd" || user.role == "Team Lead") {

            let { break_id, in_time } = req.body;
            let breakk = await Break.update({
                in_time: moment(in_time).format('HH:mm:ss'),
            }, {
                where: {
                    break_id
                }
            });
            res.status(200).json({
                success: 1,
                message: "Break ended",
                break: breakk
            });
        } else {
            res.status(200).json({
                success: 0,
                message: "You are not authorized to access this page"
            });
        }
    } catch (error) {
        res.status(200).send({
            success: 0,
            message: error.message
        });
    }
}


module.exports.getTotalTime = async function (req, res) {
    try {
        let token = req.headers.authorization;
        // split token
        let token_data = token.split(" ")[1];
        let user = await verify(token_data);
        if (user.role == "Admin" || user.role == "hdd" || user.role == "Team Lead") {

            let { day_id, user_id } = req.body;
            let data = await sequelize.query(`select sum(td) from (select timediff(in_time,out_time) as td from breaks where user_id = ${user_id} and day_id = ${day_id}) as tab`);
            res.status(200).json({
                success: 1,
                message: "Total time",
                data: data[0][0]["sum(td)"]
            });
        } else {
            res.status(200).json({
                success: 0,
                message: "You are not authorized to access this page"
            });
        }
    } catch (error) {
        res.status(200).send({
            success: 0,
            message: error.message
        });
    }
}