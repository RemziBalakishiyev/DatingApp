import { useState } from 'react'
import QuestionScreen from './components/QuestionScreen'
import DateForm from './components/DateForm'
import SuccessScreen from './components/SuccessScreen'

const SCREENS = {
  question: 'question',
  form: 'form',
  success: 'success',
}

const HEARTS = ['♥', '♡', '❤', '💕', '✦', '♥', '♡', '❤', '💗', '✧', '♥', '💕']
const PETALS = ['🌸', '✿', '🌷', '💮', '🌺', '🌸', '✿', '🌷']

export default function App() {
  const [screen, setScreen] = useState(SCREENS.question)

  return (
    <div className="app">
      <div className="bg-gradient" aria-hidden="true" />
      <div className="bg-orbs" aria-hidden="true">
        <span className="orb orb-1" />
        <span className="orb orb-2" />
        <span className="orb orb-3" />
      </div>

      <div className="background-hearts" aria-hidden="true">
        {HEARTS.map((heart, i) => (
          <span key={i} className="floating-heart" style={{ '--i': i }}>
            {heart}
          </span>
        ))}
      </div>

      <div className="background-petals" aria-hidden="true">
        {PETALS.map((petal, i) => (
          <span key={i} className="falling-petal" style={{ '--i': i }}>
            {petal}
          </span>
        ))}
      </div>

      <div className="sparkles" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="sparkle" style={{ '--i': i }} />
        ))}
      </div>

      <main className="card">
        <div className="card-glow" aria-hidden="true" />
        <div className="card-corner card-corner-tl" aria-hidden="true">♥</div>
        <div className="card-corner card-corner-tr" aria-hidden="true">♥</div>
        <div className="card-corner card-corner-bl" aria-hidden="true">♥</div>
        <div className="card-corner card-corner-br" aria-hidden="true">♥</div>

        {screen === SCREENS.question && (
          <QuestionScreen onYes={() => setScreen(SCREENS.form)} />
        )}
        {screen === SCREENS.form && (
          <DateForm onSuccess={() => setScreen(SCREENS.success)} />
        )}
        {screen === SCREENS.success && <SuccessScreen />}
      </main>
    </div>
  )
}
