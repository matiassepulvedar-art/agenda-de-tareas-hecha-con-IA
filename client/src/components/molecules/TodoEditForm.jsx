import Input from '../atoms/Input'
import Button from '../atoms/Button'

export default function TodoEditForm({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
  onCancel,
}) {
  return (
    <form onSubmit={onSubmit} className="edit-form">
      <Input value={title} onChange={onTitleChange} required />
      <Input value={description} onChange={onDescriptionChange} />
      <Button type="submit">Guardar</Button>
      <Button type="button" onClick={onCancel}>
        Cancelar
      </Button>
    </form>
  )
}
