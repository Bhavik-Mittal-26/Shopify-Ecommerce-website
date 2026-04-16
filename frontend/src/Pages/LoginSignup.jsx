import React, { useState, useContext } from 'react'
import "../CSS/LoginSignup.css"
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'

const LoginSignup = () => {
  const [isSignUp, setIsSignUp] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(ShopContext)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(isSignUp) {
      if(!name || !email || !password) {
        alert('Please fill all fields')
        return
      }
      login(name, email, password)
      alert('Sign up successful')
      navigate('/')
    } else {
      if(!email || !password) {
        alert('Please fill all fields')
        return
      }
      login(name || email, email, password)
      alert('Login successful')
      navigate('/')
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
        <div className='loginsignup-fields'>
          {isSignUp && <input type='text' placeholder='Your Name' value={name} onChange={(e) => setName(e.target.value)}/>}
          <input type='email' placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button onClick={handleSubmit}>{isSignUp ? 'Continue' : 'Login'}</button>
        </div>
        
        <p className="loginsignup-login">
          {isSignUp ? "Already have an account ? " : "Don't have an account ? "}<span onClick={() => {
            setIsSignUp(!isSignUp)
            setName('')
            setEmail('')
            setPassword('')
          }}>{isSignUp ? 'Login here' : 'Sign Up here'}</span>
        </p>
        {isSignUp && <div className='loginsignup-agree'>
          <input type='checkbox' name='' id=''/>
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>}
      </div>
    </div>
  )
}

export default LoginSignup