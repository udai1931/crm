const express = require("express");
const cors = require("cors");
const { addUser, findUser, getUserFromToken, getAllEmp, searchEmployee, getDeptEmpl, deleteUser, getEmployeeById, updateUser, getDepartmentMembers } = require("./src/controllers/userController");
const { getAllDepartments, getAllEmployeesOfDepartment, insertDepartment, updateDepartment, deleteDepartment } = require("./src/controllers/departmentsController");
const { authMiddleware } = require("./src/middleware/authMiddleware");
const { markInTime, markOutTime, getToday, getAllDays, markHalfs } = require("./src/controllers/attendenceController");
const { insertHappiness, updateHappiness, getHappiness } = require("./src/controllers/happinessController");
const { updateHealth, getHealth } = require("./src/controllers/healthController");
const { getRatingByDayId, updateRatng } = require("./src/controllers/ratingController");
const { get_breaks, get_break_status, start_break, end_break, getTotalTime } = require("./src/controllers/breaksController");
const { getSales, updateSales, searchByName, getLeaders, assignLeader, getSalesPersons, assignPerson, assignFilter, searchByNamePerson, searchByNameLeader, uploadFile } = require("./src/controllers/salesController");
const { getEmpData } = require("./src/controllers/employeeBackend");

const app = express();

var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to crm application." });
});

app.use(express.static(__dirname + 'public')); //Serves resources from public folder

/* Routs */

/* User Routes */
app.post("/api/users/signup", addUser)
app.post("/api/users/login", findUser)
app.post("/api/users/getUsersFromToken", getUserFromToken)
app.get("/api/users/getAll", getAllEmp)
app.get("/api/users/:id", authMiddleware, getEmployeeById)
app.post("/api/users/searchEmployee", authMiddleware, searchEmployee)
app.post("/api/users/deleteUser/", authMiddleware, deleteUser)
app.post("/api/users/update/:user_id", authMiddleware, updateUser)
// app.post("/api/users/filter/:role", authMiddleware, getRoleEmpl)

/* Department Routes*/
app.post("/api/department/create", authMiddleware, insertDepartment)
app.get("/api/department", authMiddleware, getAllDepartments)
app.get("/api/department/getDeptEmpl/:dept_id", authMiddleware, getDeptEmpl)
app.put("/api/department/update/:dept_id", authMiddleware, updateDepartment)
app.delete("/api/department/delete/:dept_id", authMiddleware, deleteDepartment)
app.get("/api/department/getDepartmentMembers", authMiddleware, getDepartmentMembers)

/* Day Routes*/
app.post("/api/day/markInTime", authMiddleware, markInTime)
app.post("/api/day/markOutTime", authMiddleware, markOutTime)
app.post("/api/day/getToday", authMiddleware, getToday)
app.post("/api/day/getAllDays", authMiddleware, getAllDays)
app.post("/api/day/markHalfs", authMiddleware, markHalfs)


/* Happinness Routes*/
app.post("/api/happiness", authMiddleware, insertHappiness)
app.get("/api/happiness/:day_id", authMiddleware, getHappiness)


/* Health Routes */
app.get("/api/health/:day_id", authMiddleware, getHealth)
app.post("/api/health", authMiddleware, updateHealth)


/* Rating Routes */
app.get("/api/rating/:day_id", authMiddleware, getRatingByDayId)
app.post("/api/rating/", authMiddleware, updateRatng)


/* Breaks Routs */
app.post("/api/breaks/getAllBreaks", authMiddleware, get_breaks)
app.post("/api/breaks/getBreakStatus", authMiddleware, get_break_status)
app.post("/api/breaks/startBreak", authMiddleware, start_break)
app.post("/api/breaks/endBreak", authMiddleware, end_break)
app.post("/api/breaks/getTotalTime", authMiddleware, getTotalTime)


/* Sales Routes */
app.get("/api/sales", authMiddleware, getSales)
app.post("/api/sales/searchByName", authMiddleware, searchByName)
app.post("/api/sales/searchByNamePerson", authMiddleware, searchByNamePerson)
app.post("/api/sales/searchByNameLeader", authMiddleware, searchByNameLeader)
app.get("/api/sales/getSalesLeaders", authMiddleware, getLeaders)
app.get("/api/sales/getSalesPersons", authMiddleware, getSalesPersons)
app.post("/api/sales/assignSalesLeader", authMiddleware, assignLeader)
app.post("/api/sales/assignSalesPerson", authMiddleware, assignPerson)
app.post("/api/sales/filter", authMiddleware, assignFilter)
app.post("/api/sales/upload",authMiddleware,uploadFile)
app.post("/api/sales/:id", authMiddleware, updateSales)

/* Employee Routs*/
app.get("/api/employee", authMiddleware, getEmpData) 
app.get("/api/employee/attendance", authMiddleware, getempa) 

/* Set port, listen for requests */
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

