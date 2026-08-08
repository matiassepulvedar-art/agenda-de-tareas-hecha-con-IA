export default function Checkbox({ checked, onChange, className = '' }) {
  return <input type="checkbox" checked={checked} onChange={onChange} className={className} />
}
