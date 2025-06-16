const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
};

exports.createTask = async (req, res) => {
    const { title, description, dueDate } = req.body;
    const task = await Task.create({ userId: req.userId, title, description, dueDate });
    res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, userId: req.userId },
        req.body,
        { new: true }
    );
    res.json(task);
};

exports.deleteTask = async (req, res) => {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: 'Deleted' });
};
