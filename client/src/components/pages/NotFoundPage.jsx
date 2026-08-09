import { Link } from 'react-router-dom'
import Heading from '../atoms/Heading'
import Text from '../atoms/Text'

export default function NotFoundPage() {
  return (
    <main className="app">
      <header className="app-header">
        <p className="eyebrow">404</p>
        <Heading level={1} className="app-title">
          Página no encontrada
        </Heading>
      </header>
      <Text className="page-lead">
        La ruta que buscas no existe. Vuelve a tu lista y sigue con el día.
      </Text>
      <Link to="/" className="btn btn--primary">
        Volver a mis tareas
      </Link>
    </main>
  )
}
