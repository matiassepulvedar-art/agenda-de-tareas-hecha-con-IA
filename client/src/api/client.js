const BASE = '/api/todos'

export async function fetchTodos(search = '') {
  const query = search ? `?search=${encodeURIComponent(search)}` : ''
  const res = await fetch(`${BASE}${query}`)
  if (!res.ok) throw new Error('Error al cargar los todos')
  return res.json()
}

export async function fetchTodo(id) {
  const res = await fetch(`${BASE}/${id}`)
  if (!res.ok) throw new Error('Error al cargar el todo')
  return res.json()
}

export async function createTodo(title, description) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  })
  if (!res.ok) throw new Error('Error al crear el todo')
  return res.json()
}

export async function setTodoCompleted(id, completed) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  })
  if (!res.ok) throw new Error('Error al actualizar el todo')
  return res.json()
}

export async function updateTodo(id, data) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Error al editar el todo')
  return res.json()
}

export async function deleteTodo(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Error al eliminar el todo')
}
