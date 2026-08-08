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
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
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
      ))}
    </ul>
  )
}
