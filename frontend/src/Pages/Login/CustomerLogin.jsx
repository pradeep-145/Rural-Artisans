import styles from './LoginStyles.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '../../context/AuthContext'
const CustomerLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const {setAuthUser}=useAuthContext()
    const navigate=useNavigate()
    const handleLogin = async(e) => {
        e.preventDefault()
        console.log(formData)
        try {
            const response=await axios.post('/api/auth/user/sign-in',{...formData})
            if(response)
            {
                localStorage.setItem('authUser',JSON.stringify(response.data.message))
                localStorage.setItem('type',response.data.user)
                setAuthUser({
                    user:response.data.message,
                    type:response.data.user
                })
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.loginSection}>
                <div className={styles.loginCard}>
                    <h1 className={styles.title}>Login to Your Account</h1>
                    <form>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email</label>
                            <input type="email" className={styles.input} placeholder="Your work email" 
                                onChange={(e)=>{
                                    setFormData({...formData,email:e.target.value})
                                }}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Password</label>
                            <input type="password" className={styles.input} placeholder="Enter password"
                                onChange={(e)=>{
                                    setFormData({...formData,password:e.target.value})
                                }}
                            />
                        </div>
                        <button type="submit" onClick={handleLogin} className={styles.button}>
                            Login
                        </button>
                        <p className={styles.link}>
                            Don't have an account?
                            <Link to="/customerSignup" className={styles.linkText}>Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
            <div className={styles.promoSection}>
                <h2 className={styles.promoTitle}>
                    Find the Best Products from Top Artisans
                </h2>
                <p className={styles.promoText}>
                    Join our marketplace to discover unique handcrafted items and connect with skilled artisans.
                </p>
            </div>
        </div>
    )
}

export default CustomerLogin
