import Input from '../atoms/Input'
import Button from '../atoms/Button'
import Label from '../atoms/Label'

const PlusIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
)

export default function TodoForm({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="todo-form">
      <div>
        <Label className="field-label" htmlFor="todo-title">
          Tarea
        </Label>
        <Input
          id="todo-title"
          type="text"
          placeholder="¿Qué hay que hacer?"
          value={title}
          onChange={onTitleChange}
          required
          className="field"
        />
      </div>
      <div>
        <Label className="field-label" htmlFor="todo-description">
          Nota (opcional)
        </Label>
        <Input
          id="todo-description"
          type="text"
          placeholder="Un detalle más..."
          value={description}
          onChange={onDescriptionChange}
          className="field"
        />
      </div>
      <Button type="submit" className="btn btn--primary btn--block">
        {PlusIcon} Agregar tarea
      </Button>
    </form>
  )
}
