import ErrorHandler from '../middlewares/error.js';
import { Task } from '../models/task.js';


export const createNewTask = async (req, res, next) => {
    try {
        await Task.create({ ...req.body, user: req.user })
        res.status(200).json({
            success: true,
            message: 'Task created successfully'
        })
    } catch (error) {
        return next(error);
    }
}

export const getMyTasks = async (req, res, next) => {
    try {
        const id = req.user._id
        const tasks = await Task.find({ user: id })
        res.status(200).json({
            success: true,
            tasks
        })
    } catch (error) {
        return next(error);
    }
}


export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params
        const task = await Task.findById(id)
        await task.deleteOne()
        res.status(200).json({
            success: true,
            message: 'Task deleted successfully'
        })
    } catch (error) {
        return next(new ErrorHandler('Task not found', 404))
    }
}

export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params
        const task = await Task.findById(id)
        task.isCompleted = !task.isCompleted
        await task.save()
        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            task
        })
    } catch (error) {
        return next(new ErrorHandler('Task not found', 404))
    }
}