import styles from './SignUpStyles.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect,useState } from 'react'
const CustomerSignup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate=useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            await axios.post('/api/auth/user/sign-up',{...formData})
            console.log('created')
            navigate('/customerLogin')
            
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className={styles.pageContainer}>
            <div className={styles.animatedSection}>
                <p className={styles.welcomeTitle}>Welcome to</p>
                <h1 className={styles.communityTitle}>Our Marketplace Community</h1>
                <p className={styles.communityText}>
                    Join thousands of customers discovering unique artisan products
                </p>
            </div>
            <div className={styles.signupSection}>
                <div className={styles.signupCard}>
                    <h2 className={styles.joinTitle}>Join us</h2>
                    <h3 className={styles.createAccount}>Create an account</h3>
                    <p className={styles.subtitle}>Be part of our growing community of shoppers</p>

                    <form>
                        <div className={styles.formGroup}>
                            <input type="text" className={styles.input} placeholder="Full Name" onChange={(e)=>{
                                setFormData({...formData,name:e.target.value})
                            }} />
                        </div>
                        <div className={styles.formGroup}>
                            <input type="email" className={styles.input} placeholder="Email"
                                onChange={(e)=>{
                                    setFormData({...formData,email:e.target.value})
                                }}    
                                />
                        </div>
                        <div className={styles.formGroup}>
                            <input type="password" className={styles.input} placeholder="Password"  
                                onChange={(e)=>{
                                    setFormData({...formData,password:e.target.value})
                                }}
                            />
                        </div>

                        <button type="submit" onClick={handleSubmit} className={styles.signupButton}>
                            Sign up
                        </button>

                        <p className={styles.signupLink}>
                            Already have an account?
                            <Link to="/customerLogin" className={styles.signupLinkText}>Log in</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CustomerSignup
