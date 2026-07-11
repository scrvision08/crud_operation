import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [course, setCourse] = useState('')
  const [gender, setGender] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = { name, lastName, mobileNumber, course, gender };
    const existingData = JSON.parse(localStorage.getItem('users')) || [];
    localStorage.setItem('users', JSON.stringify([...existingData, formData]));
    
    setName('');
    setLastName('');
    setMobileNumber('');
    setCourse('');
    setGender('');



  }
  

  return (
    <>
      <h1 className='counter'>form</h1>

     <form onSubmit={handleSubmit} className='form-data'>
        <div className='form-group'>
          <input
            className='form-field'
            type="text"
            placeholder='First Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className='form-group'>
          <input
            className='form-field'
            type="text"
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <input
            className=''
            type="tel"
            placeholder='Mobile Number'
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
             />
        </div>
            <select className='hero' name="course" id="course" value={course} onChange={(e) => setCourse(e.target.value)}>
              <option value="">Select Course</option>
              <option value="Web">Web Developer</option>
              <option value="App">App Developer</option>
              <option value="Data">Data Scientist</option>
              <option value="AI">AI Engineer</option>
              <option value="other">Other</option>
            </select>

            <input type="radio" name="gender" value="male" onChange={(e) => setGender(e.target.value)} />Male
            <input type="radio" name="gender" value="female" onChange={(e) => setGender(e.target.value)} />Female
            <button type='submit'>Submit</button>
          </form>        
    </>
  )
}

export default App
