import { add, getAll, getById, remove, search, update } from './models/todo.js'

export function createTodo(req, res) {
  const { title, description, completed } = req.body
  if (!title || title.trim() === '') {
    res.status(400).json({ error: 'Title is required' })
    return
  }
  const todo = add({
    title: title.trim(),
    description: description ?? '',
    completed: completed ?? false,
  })
  res.status(201).json(todo)
}

export function getTodos(req, res) {
  const { search: query } = req.query
  res.json(query ? search(query) : getAll())
}

export function getTodo(req, res) {
  const todo = getById(req.params.id)
  if (!todo) {
    res.status(404).json({ error: 'Todo not found' })
    return
  }
  res.json(todo)
}

export function deleteTodo(req, res) {
  const removed = remove(req.params.id)
  if (!removed) {
    res.status(404).json({ error: 'Todo not found' })
    return
  }
  res.status(204).send()
}

export function toggleTodo(req, res) {
  const todo = getById(req.params.id)
  if (!todo) {
    res.status(404).json({ error: 'Todo not found' })
    return
  }
  const completed = typeof req.body.completed === 'boolean'
    ? req.body.completed
    : !todo.completed
  res.json(update(todo.id, { completed }))
}

export function updateTodo(req, res) {
  const todo = getById(req.params.id)
  if (!todo) {
    res.status(404).json({ error: 'Todo not found' })
    return
  }
  const { title, description, completed } = req.body
  if (title !== undefined && title.trim() === '') {
    res.status(400).json({ error: 'Title cannot be empty' })
    return
  }
  const changes = {}
  if (title !== undefined) changes.title = title.trim()
  if (description !== undefined) changes.description = description
  if (typeof completed === 'boolean') changes.completed = completed
  res.json(update(todo.id, changes))
}
