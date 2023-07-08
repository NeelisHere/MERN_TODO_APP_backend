import express from "express";
import { createNewTask, getMyTasks, deleteTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js"

const router = express.Router();

router.post('/add-task', isAuthenticated, createNewTask)
router.get('/my-tasks', isAuthenticated, getMyTasks)
router.route('/:id').put(updateTask).delete(deleteTask)

export default router