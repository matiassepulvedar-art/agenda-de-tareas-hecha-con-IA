import Input from '../atoms/Input'
import Button from '../atoms/Button'
import Label from '../atoms/Label'

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
      <div>
        <Label className="field-label" htmlFor="edit-title">
          Tarea
        </Label>
        <Input
          id="edit-title"
          className="field"
          value={title}
          onChange={onTitleChange}
          required
          autoFocus
        />
      </div>
      <div>
        <Label className="field-label" htmlFor="edit-description">
          Nota
        </Label>
        <Input
          id="edit-description"
          className="field"
          value={description}
          onChange={onDescriptionChange}
        />
      </div>
      <div className="edit-actions">
        <Button type="submit" className="btn btn--primary">
          Guardar
        </Button>
        <Button type="button" className="btn btn--ghost" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
