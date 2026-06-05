import { useState } from 'react'
import CodeRunner from './CodeRunner'

function TopicView({ topic, isCompleted, onComplete }) {
  const [showSolution, setShowSolution] = useState(false)

  if (!topic) return null

  return (
    <div className="topic-view">
      {/* Header */}
      <div className="topic-header">
        <div className="topic-meta">
          <span className="topic-hero-emoji">{topic.emoji}</span>
          <div>
            <h1 className="topic-title">{topic.title}</h1>
            <p className="topic-summary">{topic.summary}</p>
          </div>
        </div>
        {isCompleted ? (
          <span className="badge-done">✓ Completed</span>
        ) : (
          <button className="btn-complete" onClick={onComplete}>
            Mark Complete
          </button>
        )}
      </div>

      {/* Concept cards */}
      {topic.concepts.map((c, i) => (
        <div key={i} className="concept-card">
          <h3 className="concept-title">{c.title}</h3>
          <p className="concept-body">{c.explanation}</p>
          {c.example && (
            <pre className="concept-code"><code>{c.example}</code></pre>
          )}
        </div>
      ))}

      {/* Try it */}
      <div className="section-heading">Try It Yourself</div>
      <CodeRunner initialCode={topic.starterCode} />

      {/* Challenge */}
      <div className="challenge-block">
        <div className="challenge-title-row">
          <span className="challenge-icon">🎯</span>
          <h3>Challenge</h3>
        </div>
        <p className="challenge-desc">{topic.challenge.description}</p>
        {topic.challenge.hint && (
          <div className="challenge-hint">
            <span>💡</span> <span>{topic.challenge.hint}</span>
          </div>
        )}
        <CodeRunner initialCode={topic.challenge.starterCode} compact />
        <div className="solution-row">
          <button
            className="btn-solution"
            onClick={() => setShowSolution(s => !s)}
          >
            {showSolution ? '🙈 Hide Solution' : '👁 Show Solution'}
          </button>
        </div>
        {showSolution && (
          <pre className="solution-code"><code>{topic.challenge.solution}</code></pre>
        )}
      </div>
    </div>
  )
}

export default TopicView
