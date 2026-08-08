import { useEffect, useState } from 'react'
import {
  fetchTodos,
  createTodo,
  setTodoCompleted,
  deleteTodo,
  updateTodo,
} from '../../api/client'
import TodoAppTemplate from '../templates/TodoAppTemplate'

export default function TodosPage() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    loadTodos(search)
  }, [search])

  async function loadTodos(query = search) {
    try {
      setTodos(await fetchTodos(query))
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleAdd(event) {
    event.preventDefault()
    try {
      await createTodo(title, description)
      setTitle('')
      setDescription('')
      await loadTodos()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleToggle(todo) {
    try {
      await setTodoCompleted(todo.id, !todo.completed)
      await loadTodos()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTodo(id)
      await loadTodos()
    } catch (err) {
      setError(err.message)
    }
  }

  function startEdit(todo) {
    setEditingId(todo.id)
    setEditTitle(todo.title)
    setEditDescription(todo.description)
  }

  async function handleSaveEdit(event) {
    event.preventDefault()
    try {
      await updateTodo(editingId, {
        title: editTitle,
        description: editDescription,
      })
      setEditingId(null)
      await loadTodos()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <TodoAppTemplate
      search={search}
      onSearchChange={(event) => setSearch(event.target.value)}
      title={title}
      description={description}
      onTitleChange={(event) => setTitle(event.target.value)}
      onDescriptionChange={(event) => setDescription(event.target.value)}
      onAdd={handleAdd}
      error={error}
      todos={todos}
      editingId={editingId}
      editTitle={editTitle}
      editDescription={editDescription}
      onEditTitleChange={(event) => setEditTitle(event.target.value)}
      onEditDescriptionChange={(event) => setEditDescription(event.target.value)}
      onToggle={handleToggle}
      onEdit={startEdit}
      onDelete={handleDelete}
      onSave={handleSaveEdit}
      onCancel={() => setEditingId(null)}
    />
  )
}
