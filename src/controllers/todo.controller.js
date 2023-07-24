const todoService = require('../services/todo.service');

const createTodo = async (req, res) => {
  const { body, user } = req;
  const { title, description, deadline } = body;

  if (!title || !description || !deadline) {
    return res.status(400).json({
      status: 'fail',
      message: 'Data tidak lengkap',
    });
  }

  try {
    await todoService.createTodo(user[0][0].id, title, description, deadline);
    return res.status(201).json({
      status: 'success',
      message: 'Todo berhasil ditambahkan',
      data: { title, description, deadline },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Gagal menambahkan todo',
    });
  }
};

const getTodos = async (req, res) => {
  const { user } = req;

  try {
    const [todos] = await todoService.getTodosByUserId(user[0][0].id);
    return res.status(200).json({
      status: 'success',
      message: 'Daftar todos milik user',
      data: todos,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Gagal mengambil daftar todos',
    });
  }
};

const getTodoById = async (req, res) => {
  const { user } = req;
  const { todoId } = req.params;

  try {
    const [todo] = await todoService.getTodoById(todoId, user[0][0].id);

    if (!todo[0]) {
      return res.status(404).json({
        status: 'fail',
        message: 'Todo tidak ditemukan',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Detail todo',
      data: todo[0],
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Gagal mengambil detail todo',
    });
  }
};

const updateTodo = async (req, res) => {
  const { params, body } = req;
  const { todoId } = params;
  const updatedFields = {};

  if (body.title) {
    updatedFields.title = body.title;
  }
  if (body.description) {
    updatedFields.description = body.description;
  }
  if (body.deadline) {
    updatedFields.deadline = body.deadline;
  }

  try {
    await todoService.updateTodo(todoId, updatedFields);
    return res.status(200).json({
      status: 'success',
      message: 'Todo berhasil diperbarui',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Gagal memperbarui todo',
    });
  }
};

const deleteTodo = async (req, res) => {
  const { params } = req;
  const { todoId } = params;

  try {
    await todoService.deleteTodo(todoId);
    return res.status(200).json({
      status: 'success',
      message: 'Todo berhasil dihapus',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Gagal menghapus todo',
    });
  }
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
