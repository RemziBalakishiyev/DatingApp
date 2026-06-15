import { useRef } from 'react'
import ElusiveNoButton from './ElusiveNoButton'

export default function QuestionScreen({ onYes }) {
  const escapeZoneRef = useRef(null)

  return (
    <section className="question-screen" ref={escapeZoneRef}>
      <div className="screen-badge">Sənin üçün xüsusi</div>

      <div className="title-heart-ring" aria-hidden="true">
        <span className="title-heart">💗</span>
      </div>

      <h1 className="question-title">
        Mənimlə date etmək
        <span className="title-accent">istəyərsənmi?</span>
      </h1>

      <p className="question-subtitle">
        Cavabını gözləyirəm... ürəyimdə kiçik bir ümid var
      </p>

      <div className="buttons-zone">
        <button type="button" className="btn btn-yes" onClick={onYes}>
          <span className="btn-shine" aria-hidden="true" />
          Hə ❤️
        </button>
        <ElusiveNoButton containerRef={escapeZoneRef} />
      </div>
    </section>
  )
}
