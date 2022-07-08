const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();
const corsOptions = {
  origin: "http://localhost:4200"
};
app.use(cors(corsOptions));

// const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize('testdb', 'root', 'mysql@12345', {
//     host: 'localhost',
//     dialect: 'mysql'
// });
// try {
//   sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

// app.get("/api/test", (req, res) => {
// 	console.log("test is successful");
//     res.send("test is successful");
// });

/* const db = require("./app/models");
const Role = db.role;
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();
}).catch((err) => {
  console.log(err);
}); */

app.use(express.json());

const userRoute = require("./app/routes/user.routes");
app.use("/api/users", userRoute);

const todoRoute = require("./app/routes/todo.routes");
app.use("/api/todos", todoRoute);

const authRoute = require("./app/routes/auth.routes");
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});

// 為 roles table 新增二筆初始資料
/* function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "admin"
  });
} */