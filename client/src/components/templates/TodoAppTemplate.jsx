import Heading from '../atoms/Heading'
import Message from '../atoms/Message'
import SearchBar from '../molecules/SearchBar'
import TodoForm from '../organisms/TodoForm'
import TodoList from '../organisms/TodoList'

export default function TodoAppTemplate({
  search,
  onSearchChange,
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onAdd,
  error,
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
    <div className="app">
      <Heading>Mis Todos</Heading>

      <SearchBar value={search} onChange={onSearchChange} />

      <TodoForm
        title={title}
        description={description}
        onTitleChange={onTitleChange}
        onDescriptionChange={onDescriptionChange}
        onSubmit={onAdd}
      />

      {error && <Message className="error">{error}</Message>}

      {todos.length === 0 ? (
        <Message className="empty">No hay todos todavía</Message>
      ) : (
        <TodoList
          todos={todos}
          editingId={editingId}
          editTitle={editTitle}
          editDescription={editDescription}
          onEditTitleChange={onEditTitleChange}
          onEditDescriptionChange={onEditDescriptionChange}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          onSave={onSave}
          onCancel={onCancel}
        />
      )}
    </div>
  )
}
