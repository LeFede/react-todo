import { useEffect, useRef, useState } from 'react'
import { useStorage } from './lib/useStorage'
import './App.css'


function App() {
  const [storage, setStorage] = useStorage()
  const [todos, setTodos] = useState(storage() || [
    { text: 'Do the laundry 👚', done: false },
    { text: 'Prepare the food 🥘', done: true },
    { text: 'Read 📖', done: false },
  ])

  const input = useRef()

  const handleRemove = (index) => {
    setTodos(prev => {
      const newValue = prev.filter((_, i) => i !== index)
      setStorage(newValue)
      return newValue
    })
  }
  const handleChange = (e, todo) => {
    setTodos(prev => {
      const newValue = prev.map((p) => {
        if (p === todo) {
          p.done = e.target.checked
        }
        return p
      })

      setStorage(newValue)
      return newValue
    })
  }
  const handleSend = () => {
    const text = input.current.value
    if (!text.trim()) return
    input.current.value = ''
    setTodos(prev => {
      const newValue = [...prev, {
        text,
        done: false
      }]
      setStorage(newValue)
      return newValue
    })

    setStorage(todos)
  }
  const handleClear = () => {
    setTodos(() => {
      const newValue = []
      setStorage(newValue)
      return newValue
    })
  }
  const handleAdd = (e) => {
    if (e.key !== 'Enter') return
    const text = e.target.value
    if (!text.trim()) return
    e.target.value = ''
    setTodos(prev => {
      
      const newValue = [
        ...prev, 
        {
          text,
          done: false
        }
      ]

      setStorage(newValue)
      return newValue
    
    })
  }

  useEffect(() => {
    document.title = `${todos.filter(e => e.done).length}/${todos.length}`
  }, [todos])

  return (
    <div id="app">
      <main>
        <h1><picture><img src="./react.svg" alt="react logo"/></picture>React TODO App</h1>
        <div className="todos">
          {(!todos.length) 
            ? 'Nothing to do! ✅ That\'s good, isn\'t it?'
            : ''
          }
          {
            todos.map((todo, index) => {
              return <label key={`${todo.text}${new Date().toString()}${index}`} className={`todo ${todo.done ? 'done' : ''}`}>
                <input className="checkbox" type="checkbox" checked={todo.done} onChange={(e) => handleChange(e, todo)}/>
                <span className="text">{todo.text}</span>
                <button className="remove-button" onClick={() => handleRemove(index)}>🗑</button>
              </label>
            })
          }

        </div>

        <div className="bottom">
          <input className="input" ref={input} type="text" placeholder="Add todo" onKeyDown={handleAdd}/>
          <button className="clear" onClick={handleClear}>Clear</button>
          <button className="send" onClick={handleSend}>Add</button>
        </div>

      </main>
      <footer>
        <a href="https://github.com/LeFede/react-todo" target="_blank" rel="noreferrer">
          <picture>
            <img src="./github.svg" alt="github"/>
          </picture>
        </a>
      </footer>
    </div>
  )
}

export default App
