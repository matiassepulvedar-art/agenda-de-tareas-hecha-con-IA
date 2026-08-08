import Checkbox from '../atoms/Checkbox'
import Label from '../atoms/Label'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import TodoEditForm from './TodoEditForm'

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
  const className = todo.completed ? 'completed' : ''

  if (editing) {
    return (
      <li className={className}>
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

  return (
    <li className={className}>
      <Label>
        <Checkbox checked={todo.completed} onChange={onToggle} />
        <div>
          <Text className="title">{todo.title}</Text>
          {todo.description && <Text className="description">{todo.description}</Text>}
        </div>
      </Label>
      <Button className="edit" onClick={onEdit}>
        Editar
      </Button>
      <Button className="delete" onClick={onDelete}>
        Eliminar
      </Button>
    </li>
  )
}
