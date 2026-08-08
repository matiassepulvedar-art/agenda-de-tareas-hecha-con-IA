import Input from '../atoms/Input'
import Button from '../atoms/Button'

export default function TodoForm({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="todo-form">
      <Input
        type="text"
        placeholder="Título (requerido)"
        value={title}
        onChange={onTitleChange}
        required
      />
      <Input
        type="text"
        placeholder="Descripción (opcional)"
        value={description}
        onChange={onDescriptionChange}
      />
      <Button type="submit">Agregar</Button>
    </form>
  )
}
