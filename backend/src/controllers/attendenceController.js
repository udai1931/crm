const { Day, Health, Break, Rating, Happiness } = require("../../db");
const moment = require("moment");

module.exports.markInTime = async (req, res) => {
    try {
        // insert into day table
        const { user_id, in_time } = req.body;
        const check = await Day.findOne({
            where: {
                user_id,
                today: moment().format('YYYY-MM-DD')
            }
        });
        if (check) {
            throw new Error("Already Marked In");
        }

        const today = new Date();
        let day = await Day.create({
            user_id,
            in_time: moment(in_time).format('HH:mm:ss'),
            today
        });
        let health = await Health.create({
            day_id: day.day_id,
        });
        let rating = await Rating.create({
            day_id: day.day_id,
        });
        let happiness = await Happiness.create({
            day_id: day.day_id,
        });

        res.status(200).json({
            success: 1,
            message: "In Time Marked Successfully",
            day,
            health,
            rating,
            happiness
        });

    } catch (error) {
        res.status(200).json({
            success: 0,
            message: error.message
        })
    }
}

module.exports.getStatus = async (req, res) => {
    try {
        const { user_id } = req.body;
        const today = new Date();
        const day = await Day.findOne({
            where: {
                user_id,
                today
            }
        });
        res.status(200).json({
            success: 1,
            message: "Status Fetched Successfully",
            day
        });

    } catch (error) {
        res.status(200).json({
            success: 0,
            message: error.message
        })
    }
}


module.exports.markOutTime = async (req, res) => {
    try {
        const { day_id, out_time } = req.body;
        // console.log(req.body);
        if (!day_id) {
            throw new Error("Day Id is required");
        }

        let day = await Day.update({
            out_time: moment().format('HH:mm:ss')
        }, {
            where: {
                day_id
            }
        });
        if (day == 0) {
            throw new Error("Error in inserting data.");
        } else {
            res.status(200).json({
                success: 1,
                message: "Out Time Marked Successfully",
                day
            });
        }
    } catch (error) {
        res.status(200).json({
            success: 0,
            message: error.message
        })
    }
}


// get today
module.exports.getToday = async (req, res) => {
    try {
        let { user_id } = req.body;
        const today = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
        const day = await Day.findOne({
            where: {
                user_id,
                today: today.toString()
            },
            include: [{
                model: Health
            }, {
                model: Rating
            }, {
                model: Break
            }, {
                model: Happiness
            }]
        });
        res.status(200).json({
            success: 1,
            message: "Today's Data",
            day,
            today
        });
    } catch (error) {
        res.status(200).json({
            success: 0,
            message: error.message
        })
    }
}

// get all days
module.exports.getAllDays = async (req, res) => {
    try {
        const { user_id } = req.body;
        const days = await Day.findAll({
            where: {
                user_id
            }
        });
        res.status(200).json({
            success: 1,
            message: "All Days Data",
            days
        });
    } catch (error) {
        res.status(200).json({
            success: 0,
            message: error.message
        })
    }
}


module.exports.markHalfs = async (req, res) => {
    try {
        const { day_id, first_half, second_half } = req.body;
        let day = await Day.update({
            first_half,
            second_half
        }, {
            where: {
                day_id: day_id
            }
        });
        res.status(200).json({
            success: 1,
            message: "First Half Marked Successfully",
            day
        });
    } catch (error) {
        res.status(200).json({
            success: 0,
            message: error.message
        })
    }
}

