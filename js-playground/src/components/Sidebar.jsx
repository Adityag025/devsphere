function Sidebar({ topics, activeTopicId, completed, onSelect }) {
  const done = completed.size
  const total = topics.length
  const pct = Math.round((done / total) * 100)

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-bracket">{'{ }'}</span> JS Playground
        </div>
        <div className="progress-row">
          <span className="progress-text">{done}/{total} completed</span>
          <span className="progress-pct">{pct}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-bar" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <nav className="topic-nav">
        {topics.map((topic, i) => {
          const isActive = topic.id === activeTopicId
          const isDone = completed.has(topic.id)
          return (
            <button
              key={topic.id}
              className={`topic-btn${isActive ? ' active' : ''}${isDone ? ' done' : ''}`}
              onClick={() => onSelect(topic.id)}
            >
              <span className="topic-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="topic-emoji">{topic.emoji}</span>
              <span className="topic-name">{topic.title}</span>
              {isDone && <span className="topic-check">✓</span>}
            </button>
          )
        })}
      </nav>

      <div className="sidebar-footer">
        {done === total
          ? '🎉 All topics done!'
          : `${total - done} topic${total - done !== 1 ? 's' : ''} remaining`}
      </div>
    </aside>
  )
}

export default Sidebar
