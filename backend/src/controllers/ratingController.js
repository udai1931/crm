const { Rating } = require("../../db");

module.exports.updateRatng = async (req, res) => {
    try {
        // const { day_id } = req.params;
        const { day_id,remark, rating_of_the_day } = req.body;
        const rating = await Rating.update({
            remark,
            rating_of_the_day
        }, {
            where: {
                day_id
            }
        });
        res.status(200).json({
            success: 1,
            rating
        });
    } catch (error) {
        res.status(200).json({
            stccess: 0,
            error: error.message
        })
    }
}

// get rating of the day by day_id
module.exports.getRatingByDayId = async (req, res) => {
    try {
        const { day_id } = req.params;
        const rating = await Rating.findOne({
            where: {
                day_id
            }
        });
        res.status(200).json({
            success: 1,
            rating
        });
    } catch (error) {
        res.status(200).json({
            stccess: 0,
            error: error.message
        })
    }
}
