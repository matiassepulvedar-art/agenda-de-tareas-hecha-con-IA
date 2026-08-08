import Input from '../atoms/Input'

const SearchIcon = (
  <svg
    className="search-icon"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
)

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      {SearchIcon}
      <Input
        type="search"
        placeholder="Buscar..."
        value={value}
        onChange={onChange}
        className="field field--search"
        aria-label="Buscar tareas"
      />
    </div>
  )
}
