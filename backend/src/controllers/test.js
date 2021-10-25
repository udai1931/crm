const { Department, User, Day } = require("../../db");
async function fun() {
    let data = await User.findAll();
    console.log(data);
}
fun();