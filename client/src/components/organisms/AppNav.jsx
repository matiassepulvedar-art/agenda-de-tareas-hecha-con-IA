import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/', label: 'Todas', end: true },
  { to: '/pendientes', label: 'Pendientes' },
  { to: '/hechas', label: 'Hechas' },
]

export default function AppNav() {
  return (
    <nav className="app-nav" aria-label="Filtrar tareas">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) =>
            isActive ? 'app-nav-link app-nav-link--active' : 'app-nav-link'
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}
