import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <header className="masthead">
      <div className="masthead-inner">
        <Link to="/" className="masthead-logo-link" aria-label="Pynker home">
          <img className="masthead-logo" src="/logo.png" alt="Pynker logo" draggable="false" />
        </Link>
        <span className="masthead-title">Pynker</span>
        <span className="masthead-sub">community Board</span>
      </div>
    </header>
  )
}
