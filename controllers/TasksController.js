const Task = require("../models/task");
function TasksController() {
  return {
    //C R E A T E
    async addTask(req, res) {
      //retreving data from req body
      const { TaskText } = req.body;

      if (!TaskText) {
        return res
          .status(422)
          .json({ message: "Error1: Field can not be empty!.." });
      }
      const newTask = new Task({
        Text: TaskText,
      });
      //saving Task to DB
      await newTask
        .save()
        .then(() => {
          console.log("Task added...");
          return res.status(201).json({ message: "Task added successfully" });
        })
        .catch((err) => {
          console.log(`Error adding Task: ${err}`);
          return res.status(500).json({
            message: "An error occurred while adding the Task!",
          });
        });
    },
    //R E A D
    async getTasks(req, res) {
      const allTasks = await Task.find({});
      if (allTasks && allTasks.length > 0) {
        res.status(200).json({ Tasks: allTasks });
      } else {
        console.log("No tasks yet..");
        return res.status(401).json({ message: "Tasks not found.." });
      }
    },
    //U P D A T E
    async updateTask(req, res) {
      // const { id, TaskText } = req.body;
      // console.log(req.body);
      try {
        var filter = { _id: req.body.editTaskId };
        var update = { $set: { Text: req.body.editText } };
        var result = await Task.updateOne(filter, update);

        if (result.modifiedCount === 1) {
          console.log("task updated");
          res.status(200).json({ message: "Task updated successfully" });
        } else {
          res.status(404).json({ message: "ERROR: UpdateTask/task not found" });
        }
      } catch (error) {
        console.error("Error updating Task:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    },

    //D E L E T E
    async deleteTask(req, res) {
      const { deleteTaskId } = req.body;
      console.log("Task removed");
      try {
        const result = await Task.deleteOne({ _id: deleteTaskId });

        if (result.deletedCount === 1) {
          res.status(200).json({ message: "Task deleted successfully" });
        } else {
          res.status(404).json({ message: "ERROR: DeleteTask/Task not found" });
        }
      } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    },
  };
}

module.exports = TasksController;
