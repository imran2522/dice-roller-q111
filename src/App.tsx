import { useState, type FormEvent } from 'react'
import './App.css'

const facePips: Record<number, number[]> = {
  1: [5],
  2: [1, 9],
  3: [1, 5, 9],
  4: [1, 3, 7, 9],
  5: [1, 3, 5, 7, 9],
  6: [1, 3, 4, 6, 7, 9],
}

function App() {
  const [count, setCount] = useState('3')
  const [rolls, setRolls] = useState<number[] | null>(null)

  function rollDice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const diceCount = Number(count)

    if (!Number.isInteger(diceCount) || diceCount < 1 || diceCount > 12) {
      return
    }

    setRolls(
      Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1),
    )
  }

  const total = rolls?.reduce((sum, value) => sum + value, 0)

  return (
    <main className="app-shell">
      <header className="brand">
        <div className="brand-mark" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <span>LUCKY ROLL</span>
      </header>

      <section className="roller" aria-labelledby="page-title">
        <div className="eyebrow">A LITTLE ROLL OF THE DICE</div>
        <h1 id="page-title">
          Let’s roll
          <span className="title-die" aria-hidden="true">✦</span>
        </h1>
        <p className="intro">
          How many dice are you feeling lucky with today?
        </p>

        <form className="roll-form" onSubmit={rollDice}>
          <label htmlFor="dice-count">Number of dice</label>
          <div className="form-controls">
            <input
              id="dice-count"
              type="number"
              min="1"
              max="12"
              step="1"
              value={count}
              onChange={(event) => setCount(event.target.value)}
              required
            />
            <button type="submit">
              <span>Roll</span>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M4.2 5.2h11.6v11.6H4.2zM7 2.8v4.8m6-4.8v4.8M4.2 9h11.6" />
              </svg>
            </button>
          </div>
          <span className="input-hint">Choose between 1 and 12</span>
        </form>

        <div className="results" aria-live="polite">
          {rolls ? (
            <>
              <div className="results-heading">
                <div>
                  <div className="eyebrow">THE RESULTS ARE IN</div>
                  <h2>Your roll</h2>
                </div>
                <div className="total">
                  <span>Total</span>
                  <strong>{total}</strong>
                </div>
              </div>
              <div className="dice-grid">
                {rolls.map((value, index) => (
                  <div className="die-card" key={`${index}-${value}`}>
                    <div className="die" aria-label={`Die ${index + 1}: ${value}`}>
                      {Array.from({ length: 9 }, (_, pipIndex) => (
                        <span
                          className={
                            facePips[value].includes(pipIndex + 1) ? 'pip visible' : 'pip'
                          }
                          key={pipIndex}
                        />
                      ))}
                    </div>
                    <span className="die-number">DIE {String(index + 1).padStart(2, '0')}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-die" aria-hidden="true">
                <span>•</span>
                <span>•</span>
                <span>•</span>
              </div>
              <p>Your dice will land here</p>
            </div>
          )}
        </div>
      </section>

      <footer>GOOD THINGS COME TO THOSE WHO ROLL <span>✳</span></footer>
    </main>
  )
}

export default App
