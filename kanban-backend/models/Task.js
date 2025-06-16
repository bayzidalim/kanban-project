const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: String,
    description: String,
    status: { type: String, enum: ['todo', 'in-progress', 'completed'], default: 'todo' },
    dueDate: Date,
});

module.exports = mongoose.model('Task', taskSchema);
