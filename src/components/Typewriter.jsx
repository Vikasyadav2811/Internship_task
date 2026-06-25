import { useEffect, useState } from 'react'
import './Typewriter.css'

export default function Typewriter({
  phrases = [],
  typingSpeed = 70,
  deletingSpeed = 40,
  pauseAfterTyping = 1400,
  pauseAfterDeleting = 400,
  className = '',
}) {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (phrases.length === 0) return

    const currentPhrase = phrases[phraseIndex]

    // Finished typing the full phrase -> pause, then start deleting.
    if (!isDeleting && text === currentPhrase) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseAfterTyping)
      return () => clearTimeout(timeout)
    }

    // Finished deleting -> pause, then advance to the next phrase.
    if (isDeleting && text === '') {
      const timeout = setTimeout(() => {
        setIsDeleting(false)
        setPhraseIndex((index) => (index + 1) % phrases.length)
      }, pauseAfterDeleting)
      return () => clearTimeout(timeout)
    }

    // Type or delete one character.
    const timeout = setTimeout(() => {
      setText((current) =>
        isDeleting
          ? currentPhrase.slice(0, current.length - 1)
          : currentPhrase.slice(0, current.length + 1)
      )
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [
    text,
    isDeleting,
    phraseIndex,
    phrases,
    typingSpeed,
    deletingSpeed,
    pauseAfterTyping,
    pauseAfterDeleting,
  ])

  return (
    <span className={`typewriter ${className}`.trim()} aria-label={phrases.join(' ')}>
      <span aria-hidden="true">{text}</span>
      <span className="typewriter-cursor" aria-hidden="true">|</span>
    </span>
  )
}
