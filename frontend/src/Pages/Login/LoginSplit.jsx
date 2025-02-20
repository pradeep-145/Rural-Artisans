import styles from './LoginStyles.module.css'

const LoginSplit = () => {
  return (
    <div className={styles.splitContainer}>
      <div className={styles.businessSection}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>For BUSINESS</h1>
          <p className={styles.subtitle}>Become a seller</p>
          <a href="/artisanLogin" className={styles.actionButton}>
            Login
          </a>
          <p className={styles.link}>
            Don't have an account?
            <a href="/artisanSignup" className={styles.linkText}>
              Sign Up
            </a>
          </p>
        </div>
      </div>

      <div className={styles.customerSection}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>For CUSTOMERS</h1>
          <p className={styles.subtitle}>Explore all our artisan's products</p>
          <a href="/customerLogin" className={styles.actionButton}>
            Login
          </a>
          <p className={styles.link}>
            Don't have an account?
            <a href="/customerSignup" className={styles.linkText}>
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginSplit