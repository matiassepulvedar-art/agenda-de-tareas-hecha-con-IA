import TodoItem from '../molecules/TodoItem'

export default function TodoList({
  todos,
  editingId,
  editTitle,
  editDescription,
  onEditTitleChange,
  onEditDescriptionChange,
  onToggle,
  onEdit,
  onDelete,
  onSave,
  onCancel,
}) {
  const pending = todos.filter((todo) => !todo.completed)
  const completed = todos.filter((todo) => todo.completed)

  function renderTodo(todo) {
    return (
      <TodoItem
        key={todo.id}
        todo={todo}
        editing={editingId === todo.id}
        editTitle={editTitle}
        editDescription={editDescription}
        onEditTitleChange={onEditTitleChange}
        onEditDescriptionChange={onEditDescriptionChange}
        onToggle={() => onToggle(todo)}
        onEdit={() => onEdit(todo)}
        onDelete={() => onDelete(todo.id)}
        onSave={onSave}
        onCancel={onCancel}
      />
    )
  }

  return (
    <div className="todo-groups">
      {pending.length > 0 && (
        <section className="todo-group" aria-label="Por hacer">
          <h2 className="section-label">
            Por hacer <span className="count">{pending.length}</span>
          </h2>
          <ul className="todo-list">{pending.map(renderTodo)}</ul>
        </section>
      )}
      {completed.length > 0 && (
        <section className="todo-group todo-group--done" aria-label="Hechas">
          <h2 className="section-label">
            Hechas <span className="count">{completed.length}</span>
          </h2>
          <ul className="todo-list">{completed.map(renderTodo)}</ul>
        </section>
      )}
    </div>
  )
}
