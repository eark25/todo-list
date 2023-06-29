const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todos');

router.get('/', todoController.getTodos);

router.post('/', todoController.createTodo);

router.get('/:id', todoController.getTodo);

router.put('/:id', todoController.updateTodo);

router.delete('/:id', todoController.deleteTodo);

router.delete('/', todoController.deleteTodos);

module.exports = router;