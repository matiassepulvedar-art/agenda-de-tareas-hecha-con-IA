import Heading from '../atoms/Heading'
import Message from '../atoms/Message'
import Button from '../atoms/Button'
import SearchBar from '../molecules/SearchBar'
import AppNav from '../organisms/AppNav'
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
  filter = 'all',
  query = '',
  loading = false,
  onRetry,
  notice = '',
  stats,
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
  const { total = 0, done = 0, pending = 0, pct = 0 } = stats ?? {}

  return (
    <main className="app">
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
          <div
            className="progress-track"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            aria-label={`${pct}% completado`}
          >
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </header>

      <AppNav />

      <TodoForm
        title={title}
        description={description}
        onTitleChange={onTitleChange}
        onDescriptionChange={onDescriptionChange}
        onSubmit={onAdd}
      />

      {error && (
        <Message className="message message--error" role="alert">
          {error}
          {onRetry && (
            <Button className="btn btn--retry" onClick={onRetry}>
              Reintentar
            </Button>
          )}
        </Message>
      )}

      {notice && (
        <Message className="toast" role="status">
          {notice}
        </Message>
      )}

      {loading && todos.length === 0 ? (
        <div className="skeleton-list" aria-hidden="true">
          <div className="skeleton-card" />
          <div className="skeleton-card" />
          <div className="skeleton-card" />
        </div>
      ) : (
        <>
          <div className="list-toolbar">
            <span className="section-label">Tus tareas</span>
            <SearchBar
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </div>
          {todos.length === 0 ? (
            <Message className="empty">
              {query ? (
                <>Sin resultados para «{query}».</>
              ) : filter === 'pending' ? (
                <>
                  No hay tareas pendientes.
                  <br />
                  Agrega una arriba cuando aparezca algo.
                </>
              ) : filter === 'completed' ? (
                <>
                  Aún no hay tareas hechas.
                  <br />
                  Completa una tarea y aparecerá aquí.
                </>
              ) : (
                <>
                  Tu lista está en blanco.
                  <br />
                  Agrega tu primera tarea arriba.
                </>
              )}
            </Message>
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
        </>
      )}

      <footer className="app-footer">
        {total} tareas · {pending} pendientes
      </footer>
    </main>
  )
}
