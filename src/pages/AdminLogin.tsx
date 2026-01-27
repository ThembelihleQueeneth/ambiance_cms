import React from 'react'
import Header from '../components/Header'

export default function AdminLogin() {
  return (
    <div>
      <Header/>
      <label htmlFor="">Email Adrress</label><br />
      <input type="text" placeholder='Enter email here' /><br />
      <label htmlFor="">Password</label><br />
      <input type="password" placeholder='Enter password here' /><br />
      <button>Login</button>
    </div>
  )
}
