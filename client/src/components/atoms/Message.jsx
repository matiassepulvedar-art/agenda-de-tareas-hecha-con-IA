export default function Message({ className = '', role, children }) {
  return (
    <p className={className} role={role}>
      {children}
    </p>
  )
}
