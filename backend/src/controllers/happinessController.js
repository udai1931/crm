const { Happiness } = require("../../db");


module.exports.insertHappiness = async (req, res) => {
    try {

        const { programming, english, gym, performance, day_id } = req.body;
        const check = await Happiness.findOne({
            where: {
                day_id
            }
        });

        if (!check) {
            const newHappiness = await Happiness.create({
                programming,
                english,
                gym,
                performance,
                day_id
            });
            res.status(200).json({
                check,
                happiness: newHappiness,
                message: "Happiness saved successfully",
            });
        } else {
            let newHappiness = await Happiness.update({
                programming,
                english,
                gym,
                performance,
                day_id
            }, {
                where: {
                    day_id
                }
            });
            res.status(200).json({
                success: newHappiness,
                message: "Happiness updated successfully",
            });
        }
    } catch (error) {
        res.status(200).json({
            success: 0,
            message: "Error saving happiness",
            error: error.message
        });
    }
};



// get todays happiness
module.exports.getHappiness = async (req, res) => {
    try {
        const day_id = req.params.day_id;
        const happiness = await Happiness.findOne({
            where: {
                day_id
            }
        });
        res.status(200).json({
            happiness,
            message: "Happiness Retrieved Successfully",
        });
    } catch (error) {
        res.status(200).json({
            success: 0,
            message: "Error getting happiness",
            error: error.message
        });
    }
}