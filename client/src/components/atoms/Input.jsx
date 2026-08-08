export default function Input({
  type = 'text',
  className = '',
  placeholder,
  value,
  onChange,
  required,
  ...rest
}) {
  return (
    <input
      type={type}
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      {...rest}
    />
  )
}
