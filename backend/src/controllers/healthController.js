const { Health } = require("../../db");

module.exports.updateHealth = async (req, res) => {
    try {
        const { day_id } = req.body;
        const { morning_temperature, evening_temperature, covid_symptoms, mask_wearing_rating } = req.body;
        const health = await Health.update({
            morning_temperature, evening_temperature, covid_symptoms, mask_wearing_rating
        }, {
            where: {
                day_id
            }
        });
        res.status(200).json({
            success: 1,
            message: "Health updated successfully",
            health
        });
    } catch (error) {
        res.status(200).json({
            success: 0,
            message: error.message
        });
    }
};


// get health
module.exports.getHealth = async (req, res) => {
    try {
        const { day_id } = req.params;
        const health = await Health.findOne({
            where: {
                day_id
            }

        });
        res.status(200).json({
            success: 1,
            message: "Health found successfully",
            health
        });

    } catch (error) {
        res.status(200).json({
            success: 0,
            message: error.message
        });
    }
}