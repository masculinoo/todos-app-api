const dbPool = require('../config/database');

const createTodo = async (userId, title, description, deadline) => {
  const query = `INSERT INTO todos (user_id, title, description, deadline) VALUES (${userId}, '${title}', '${description}', '${deadline}')`;
  return dbPool.execute(query);
};

const getTodosByUserId = async (userId) => {
  const query = `SELECT id, title, description, deadline FROM todos WHERE user_id = ${userId}`;
  return dbPool.execute(query);
};

const getTodoById = async (todoId, userId) => {
  const query = `SELECT id, title, description, deadline FROM todos WHERE id = ${todoId} AND user_id = ${userId}`;
  return dbPool.execute(query);
};

const updateTodo = async (todoId, data) => {
  const { title, description, deadline } = data;
  const updateFields = [];

  if (title) {
    updateFields.push(`title = '${title}'`);
  }
  if (description) {
    updateFields.push(`description = '${description}'`);
  }
  if (deadline) {
    updateFields.push(`deadline = '${deadline}'`);
  }

  const query = `UPDATE todos SET ${updateFields.join(',')} WHERE id = ${todoId}`;
  return dbPool.execute(query);
};

const deleteTodo = async (todoId) => {
  const query = `DELETE FROM todos WHERE id = ${todoId}`;
  return dbPool.execute(query);
};

module.exports = {
  createTodo,
  getTodosByUserId,
  getTodoById,
  updateTodo,
  deleteTodo,
};
