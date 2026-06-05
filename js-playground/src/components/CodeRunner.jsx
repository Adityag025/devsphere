import { useState, useCallback } from 'react'

function formatValue(v) {
  if (v === null) return 'null'
  if (v === undefined) return 'undefined'
  if (typeof v === 'object') {
    try { return JSON.stringify(v, null, 2) } catch { return String(v) }
  }
  return String(v)
}

async function executeCode(code) {
  const output = []
  const fakeConsole = {
    log:   (...args) => output.push({ type: 'log',   text: args.map(formatValue).join(' ') }),
    error: (...args) => output.push({ type: 'error', text: args.map(formatValue).join(' ') }),
    warn:  (...args) => output.push({ type: 'warn',  text: args.map(formatValue).join(' ') }),
    table: (data)   => output.push({ type: 'log',   text: JSON.stringify(data, null, 2) }),
  }
  try {
    const fn = new Function('console', `return (async () => { ${code} })()`)
    await fn(fakeConsole)
  } catch (e) {
    output.push({ type: 'error', text: e.message })
  }
  return output
}

function CodeRunner({ initialCode, compact }) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState([])
  const [running, setRunning] = useState(false)
  const [hasRun, setHasRun] = useState(false)

  const run = useCallback(async () => {
    setRunning(true)
    setOutput([])
    const result = await executeCode(code)
    setOutput(result)
    setRunning(false)
    setHasRun(true)
  }, [code])

  const reset = () => {
    setCode(initialCode)
    setOutput([])
    setHasRun(false)
  }

  const lineCount = code.split('\n').length
  const editorRows = Math.max(compact ? 6 : 10, lineCount + 1)

  return (
    <div className="code-runner">
      <div className="editor-header">
        <span className="panel-label">Editor</span>
        <div className="editor-actions">
          <button className="btn-reset" onClick={reset} title="Reset to starter code">
            ↩ Reset
          </button>
          <button className="btn-run" onClick={run} disabled={running}>
            {running ? '⏳ Running…' : '▶ Run'}
          </button>
        </div>
      </div>

      <textarea
        className="code-editor"
        value={code}
        onChange={e => setCode(e.target.value)}
        spellCheck={false}
        rows={editorRows}
        onKeyDown={e => {
          if (e.key === 'Tab') {
            e.preventDefault()
            const { selectionStart: s, selectionEnd: end } = e.target
            const next = code.slice(0, s) + '  ' + code.slice(end)
            setCode(next)
            requestAnimationFrame(() => {
              e.target.selectionStart = e.target.selectionEnd = s + 2
            })
          }
        }}
      />

      <div className="console-header">
        <span className="panel-label">Console</span>
        {hasRun && output.length === 0 && (
          <span className="muted">(no output)</span>
        )}
      </div>
      <div className="console-output">
        {!hasRun && <span className="idle-hint">Click ▶ Run to see output</span>}
        {output.map((line, i) => (
          <div key={i} className={`console-line ${line.type}`}>
            <span className="caret">›</span>
            <pre>{line.text}</pre>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CodeRunner
