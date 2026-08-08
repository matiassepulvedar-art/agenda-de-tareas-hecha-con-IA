import Input from '../atoms/Input'

export default function SearchBar({ value, onChange }) {
  return (
    <Input
      type="search"
      placeholder="Buscar todos..."
      value={value}
      onChange={onChange}
      className="todo-search"
    />
  )
}
