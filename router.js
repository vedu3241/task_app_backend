const express = require("express");
const router = express.Router();

// importing controllers
const TasksController = require("./controllers/TasksController");

//Tasks routes
router.post("/addTask", TasksController().addTask);

router.get("/getTasks", TasksController().getTasks);

router.post("/updateTask", TasksController().updateTask);

router.post("/deleteTask", TasksController().deleteTask);

module.exports = router;
