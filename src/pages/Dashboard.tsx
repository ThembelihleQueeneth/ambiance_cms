import React from 'react'
import Header from '../components/Header'

export default function Dashboard() {
  return (
    <div>
      <Header/>
      <h1>Admin Dashboard</h1>
      <button>Manage Menu</button>
      <button>View Orders</button>
    </div>
  )
}
