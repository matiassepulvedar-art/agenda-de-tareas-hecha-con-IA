import { Route, Routes } from 'react-router-dom'
import TodosPage from './components/pages/TodosPage'
import TodoDetailPage from './components/pages/TodoDetailPage'
import NotFoundPage from './components/pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TodosPage filter="all" />} />
      <Route path="/pendientes" element={<TodosPage filter="pending" />} />
      <Route path="/hechas" element={<TodosPage filter="completed" />} />
      <Route path="/todos/:id" element={<TodoDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
