const express = require('express');
const passport = require('passport');
const todoController = require('../controllers/todo.controller');

const router = express.Router();

router.post('/create', passport.authenticate('jwt', { session: false }), todoController.createTodo);
router.get('/todos', passport.authenticate('jwt', { session: false }), todoController.getTodos);
router.get('/todos/:todoId', passport.authenticate('jwt', { session: false }), todoController.getTodoById);
router.put('/update/:todoId', passport.authenticate('jwt', { session: false }), todoController.updateTodo);
router.delete('/delete/:todoId', passport.authenticate('jwt', { session: false }), todoController.deleteTodo);

module.exports = router;
