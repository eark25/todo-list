const mongoose = require('mongoose');
const Todo = mongoose.model('Todo');

// alternative response format
// {
//     status: false,
//     code: 500,
//     data: null,
//     error: "Internal Server Error"
// }

exports.createTodo = async (req, res) => {
    try {
        const successCreateTodo = await Todo.create(req.body);
        res.status(200).json(successCreateTodo);
    } catch (error) {
        res.status(500).json(error);
    };
};

exports.getTodos = async (req, res) => {
    try {
        const successGetTodos = await Todo.find();
        res.status(200).json(successGetTodos);
    } catch (error) {
        res.status(500).json(error);
    };
};

exports.getTodo = async (req, res) => {
    try {
        const successGetTodo = await Todo.findById(req.params.id);
        res.status(200).json(successGetTodo);
    } catch (error) {
        res.status(500).json(error);
    };
};

exports.updateTodo = async (req, res) => {
    try {
        const successUpdateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(successUpdateTodo);
    } catch (error) {
        res.status(404).json(error);
    };
};

exports.deleteTodo = async (req, res) => {
    try {
        const successDeleteTodo = await Todo.findByIdAndDelete(req.params.id);
        console.log(`The task with id ${req.params.id} is deleted!`);
        res.status(200).json(successDeleteTodo);
    } catch (error) {
        res.status(404).json(error);
    };
};

exports.deleteTodos = async (req, res) => {
    try {
        const successDeleteTodos = await Todo.deleteMany();
        console.log(`The whole list is deleted!`);
        res.status(200).json(successDeleteTodos);
    } catch (error) {
        res.status(500).json(error);
    };
};