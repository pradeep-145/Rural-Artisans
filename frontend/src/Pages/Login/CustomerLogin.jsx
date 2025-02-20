import styles from './LoginStyles.module.css'
import { Link } from 'react-router-dom'

const CustomerLogin = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.loginSection}>
                <div className={styles.loginCard}>
                    <h1 className={styles.title}>Login to Your Account</h1>
                    <form>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email</label>
                            <input type="email" className={styles.input} placeholder="Your work email" />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Password</label>
                            <input type="password" className={styles.input} placeholder="Enter password" />
                        </div>
                        <button type="submit" className={styles.button}>
                            Next
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
