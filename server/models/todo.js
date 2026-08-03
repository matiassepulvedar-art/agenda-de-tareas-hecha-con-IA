const todos = []
let nextId = 1

export function add({ title, description, completed }) {
  const todo = { id: nextId++, title, description, completed }
  todos.push(todo)
  return todo
}

export function getById(id) {
  return todos.find((todo) => todo.id === Number(id))
}

export function getAll() {
  return todos
}

export function search(query) {
  const term = query.trim().toLowerCase()
  if (!term) return todos
  return todos.filter((todo) =>
    todo.title.toLowerCase().includes(term) ||
    todo.description.toLowerCase().includes(term),
  )
}

export function remove(id) {
  const index = todos.findIndex((todo) => todo.id === Number(id))
  if (index === -1) return null
  return todos.splice(index, 1)[0]
}

export function update(id, changes) {
  const todo = getById(id)
  if (!todo) return null
  Object.assign(todo, changes)
  return todo
}
