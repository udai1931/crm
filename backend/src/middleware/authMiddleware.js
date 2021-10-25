const { verify } = require("../utils/token");

module.exports.authMiddleware = async function authMiddleware(req, res, next) {
    const authHeadder = req.headers['authorization'];
    const token = authHeadder && authHeadder.split(" ")[1];
    if (token == null) res.json({
        error: "Auth failed",
        success: 0
    })
    else {
        try {
            await verify(token)
            next()
        } catch (error) {
            res.send({
                success: 2,
                error: error.message
            })
        }
    }
}
