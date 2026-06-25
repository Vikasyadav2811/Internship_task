import './Avatar.css'

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function Avatar({ user, size = 40 }) {
  if (!user) return null

  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
        background: user.avatarColor,
        fontSize: size * 0.4,
      }}
      aria-hidden="true"
    >
      {getInitials(user.name)}
    </div>
  )
}
