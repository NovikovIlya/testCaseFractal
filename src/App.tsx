import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <form style={{display:'flex', flexWrap:'wrap'}} className=''>
        <input  />
        <select>
          <option value="">-- Выберите опцию --</option>
          <option value="user">user</option>
          <option value="repo">repo</option>
        </select>
      </form>
    </>
  )
}

export default App
