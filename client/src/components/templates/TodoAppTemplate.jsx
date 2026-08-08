import Heading from '../atoms/Heading'
import Message from '../atoms/Message'
import SearchBar from '../molecules/SearchBar'
import TodoForm from '../organisms/TodoForm'
import TodoList from '../organisms/TodoList'

function today() {
  return new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

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
  const total = todos.length
  const done = todos.filter((todo) => todo.completed).length
  const pending = total - done
  const pct = total ? Math.round((done / total) * 100) : 0

  return (
    <div className="app">
      <header className="app-header">
        <p className="eyebrow">{today()} · tu lista de hoy</p>
        <Heading level={1} className="app-title">
          Mis <em>Todos</em>
        </Heading>
        <div
          className="progress"
          role="group"
          aria-label={`${done} de ${total} tareas hechas`}
        >
          <div className="progress-count">
            {total === 0 ? (
              <span className="progress-of">sin tareas aún</span>
            ) : (
              <>
                <span className="progress-done">{done}</span>
                <span className="progress-of">de {total} · hechas</span>
              </>
            )}
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </header>

      <TodoForm
        title={title}
        description={description}
        onTitleChange={onTitleChange}
        onDescriptionChange={onDescriptionChange}
        onSubmit={onAdd}
      />

      {error && <Message className="message message--error">{error}</Message>}

      {total === 0 ? (
        search ? (
          <Message className="empty">Sin resultados para «{search}».</Message>
        ) : (
          <Message className="empty">
            Tu lista está en blanco.
            <br />
            Agrega tu primera tarea arriba.
          </Message>
        )
      ) : (
        <>
          <div className="list-toolbar">
            <span className="section-label">Tus tareas</span>
            <SearchBar value={search} onChange={onSearchChange} />
          </div>
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
        </>
      )}

      <footer className="app-footer">
        {total} tareas · {pending} pendientes
      </footer>
    </div>
  )
}
