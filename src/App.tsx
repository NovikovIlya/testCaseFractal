import { useState } from 'react'
import './App.css'

function App() {
  const [selectedOption, setSelectedOption] = useState(''); 
  const [inputValue, setInputValue] = useState(''); 

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <form style={{display:'flex', flexWrap:'wrap'}} className=''>
        <input  />
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="">-- Выберите опцию --</option>
          <option value="user">user</option>
          <option value="repo">repo</option>
        </select>
      </form>
    </>
  )
}

export default App
