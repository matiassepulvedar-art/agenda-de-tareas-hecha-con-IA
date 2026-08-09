import { useEffect, useRef } from 'react'
import Checkbox from '../atoms/Checkbox'
import Label from '../atoms/Label'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import TodoEditForm from './TodoEditForm'

const PencilIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
  </svg>
)

const TrashIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
)

export default function TodoItem({
  todo,
  editing,
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
  const editBtnRef = useRef(null)
  const wasEditing = useRef(false)

  useEffect(() => {
    if (wasEditing.current && !editing) {
      editBtnRef.current?.focus()
    }
    wasEditing.current = editing
  }, [editing])

  if (editing) {
    return (
      <li className="todo todo--editing">
        <TodoEditForm
          title={editTitle}
          description={editDescription}
          onTitleChange={onEditTitleChange}
          onDescriptionChange={onEditDescriptionChange}
          onSubmit={onSave}
          onCancel={onCancel}
        />
      </li>
    )
  }

  const className = todo.completed ? 'todo todo--done' : 'todo'

  return (
    <li className={className}>
      <Label className="todo-toggle">
        <Checkbox className="checkbox" checked={todo.completed} onChange={onToggle} />
        <span className="todo-text">
          <Text className="todo-title">{todo.title}</Text>
          {todo.description && (
            <Text className="todo-description">{todo.description}</Text>
          )}
        </span>
      </Label>
      <div className="todo-actions">
        <Button
          className="icon-btn"
          onClick={onEdit}
          aria-label="Editar"
          ref={editBtnRef}
        >
          {PencilIcon}
        </Button>
        <Button
          className="icon-btn icon-btn--danger"
          onClick={onDelete}
          aria-label="Eliminar"
        >
          {TrashIcon}
        </Button>
      </div>
    </li>
  )
}
