const { User, Day, Happiness, Break, Health, Rating, } = require("../../db")
const { verify } = require("../utils/token")
const moment = require("moment")
module.exports.getEmpData = async (req, res) => {
    try {
        let token = req.headers.authorization.split(" ")[1]
        let user = await verify(token)
        // console.log(user);

        let data = await User.findOne({
            where: {
                user_id: user.user_id
            },
            include: {
                model: Day,
                include: [{
                    model: Health
                }, {
                    model: Rating
                }, {
                    model: Happiness
                }, {
                    model: Break
                }],
                where: {
                    today: moment().format("YYYY-MM-DD")
                }
            }
        });
        console.log(data);
        res.status(200).json({
            success: 1,
            day: data.Days,
        })
    } catch (error) {
        res.status(200).json({
            success: 0,
            message: error.message,
        })
    }
}


modeule.exports.getEmpAttendance = (req, res) => {

}