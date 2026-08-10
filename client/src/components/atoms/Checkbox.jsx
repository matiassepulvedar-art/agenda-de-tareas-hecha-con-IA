export default function Checkbox({ checked, onChange, className = '', disabled = false, ...rest }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={className}
      disabled={disabled}
      {...rest}
    />
  )
}
