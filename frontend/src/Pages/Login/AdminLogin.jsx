import styles from './LoginStyles.module.css'
import axios from 'axios'
const AdminLogin = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginSection}>
        <div className={styles.loginCard}>
          <h1 className={styles.title}>Admin Login</h1>
          <form>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input type="email"className={styles.input} placeholder="Enter email" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Password</label>
              <input type="password" className={styles.input} placeholder="Enter password"
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
