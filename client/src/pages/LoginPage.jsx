import React, { useState } from 'react'
import "../styles/Login.scss"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
      e.preventDefault()
      try{
          const response = await fetch('http://localhost:3001/auth/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  email,
                  password
              })
          })
          if(response.ok){ 
            const data = await response.json()

            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))

            navigate('/home')
          }

      } catch (error){
          console.log("Login failed",error.message)
      }
  }

  return (
    <div className='login'>
        <div className='login_content'>
            <form className='login_content_form' onSubmit={handleSubmit}>    
                <input 
                type='email' 
                placeholder='Email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
                />
                <input 
                type='password' 
                name='password' 
                placeholder='Password' 
                value={password} 
                onChange={ (e) => setPassword(e.target.value)} 
                required
                />
                <button type='submit'>LOGIN</button>
            </form>
            <a href="/register">Don't have an account? Sign Up Here</a>
        </div>
    </div>
  )
}

export default LoginPage