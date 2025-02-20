import styles from './SignUpStyles.module.css'
import { Link } from 'react-router-dom'

const CustomerSignup = () => {
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
                            <input type="text" className={styles.input} placeholder="Full Name" />
                        </div>
                        <div className={styles.formGroup}>
                            <input type="email" className={styles.input} placeholder="Email" />
                        </div>
                        <div className={styles.formGroup}>
                            <input type="password" className={styles.input} placeholder="Password" />
                        </div>

                        <button type="submit" className={styles.signupButton}>
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
