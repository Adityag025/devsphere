import { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopicView from './components/TopicView'
import { topics } from './topics'
import './App.css'

function App() {
  const [activeTopicId, setActiveTopicId] = useState(topics[0].id)
  const [completed, setCompleted] = useState(new Set())

  const activeTopic = topics.find(t => t.id === activeTopicId)

  const selectTopic = (id) => {
    setActiveTopicId(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const markComplete = () => {
    setCompleted(prev => new Set([...prev, activeTopicId]))
    const currentIndex = topics.findIndex(t => t.id === activeTopicId)
    if (currentIndex < topics.length - 1) {
      setTimeout(() => selectTopic(topics[currentIndex + 1].id), 400)
    }
  }

  return (
    <div className="app-shell">
      <Sidebar
        topics={topics}
        activeTopicId={activeTopicId}
        completed={completed}
        onSelect={selectTopic}
      />
      <main className="app-main">
        <TopicView
          topic={activeTopic}
          isCompleted={completed.has(activeTopicId)}
          onComplete={markComplete}
        />
      </main>
    </div>
  )
}

export default App
