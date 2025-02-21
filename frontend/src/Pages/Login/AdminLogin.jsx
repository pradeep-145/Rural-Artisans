import { set } from 'mongoose'
import styles from './LoginStyles.module.css'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const navigate=useNavigate()
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const response = await axios.post('/api/admin/login',formData)
      if(response){

        navigate('/adminDashboard')
      }

    }catch(error){
      console.log(error)
    }


  }
  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginSection}>
        <div className={styles.loginCard}>
          <h1 className={styles.title}>Admin Login</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Username</label>
              <input type="text"className={styles.input} placeholder="Enter username"  onChange={(e)=>{
                setFormData({...formData, username: e.target.value})
              }}/>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Password</label>
              <input type="password" className={styles.input} placeholder="Enter password"
              onChange={(e)=>{
                setFormData({...formData, password: e.target.value})
              }}
              />
            </div>
            <button type="submit" className={styles.button}>
              Login
            </button>
          </form>
        </div>
      </div>
      <div className={styles.promoSection}>
        <h2 className={styles.promoTitle}>
          Manage and Grow the Marketplace
        </h2>
        <p className={styles.promoText}>
          Access advanced tools to oversee and expand your platform.
        </p>
      </div>
    </div>
  )
}

export default AdminLogin;
