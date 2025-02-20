import styles from './LoginStyles.module.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const ArtisanLogin = () => {
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const sendOtp = (e) => {
    e.preventDefault();
    console.log('OTP sent to', phoneNumber);

    setShowOtpField(true);
    setIsButtonDisabled(true);
    setCountdown(60);

    setTimeout(() => {
      console.log('OTP Sent Successfully');
    }, 1000);
  };

  useEffect(() => {
    let timer;
    if (isButtonDisabled && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsButtonDisabled(false);
    }

    return () => clearInterval(timer);
  }, [isButtonDisabled, countdown]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginSection}>
        <div className={styles.loginCard}>
          <h1 className={styles.title}>Artisan Login</h1>
          <form>
            <div className={styles.formGroup}>
              <label className={styles.label}>Phone Number</label>
              <input type="number" className={styles.input} placeholder="Enter Phone Number" value={phoneNumber} min={0}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <button type="button" className={`${styles.button} ${isButtonDisabled ? styles.disabledButton : ''}`}
              onClick={sendOtp} disabled={isButtonDisabled}
            >
              {isButtonDisabled ? `Resend in ${countdown}s` : 'Send OTP'}
            </button>
            {showOtpField && (
              <div className={styles.formGroup}>
                <label className={styles.label}>OTP</label>
                <input type="number" className={styles.input} placeholder="Enter OTP" min={0}
                  value={otp} onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}
            <button type="submit" className={styles.button}>
              Login
            </button>
            <p className={styles.link}>
              Don't have an account?
              <Link to="/artisanSignup" className={styles.linkText}>Sign up</Link>
            </p>
          </form>
        </div>
      </div>
      <div className={styles.promoSection}>
        <h2 className={styles.promoTitle}>
          Showcase Your Craftsmanship
        </h2>
        <p className={styles.promoText}>
          Join our community of skilled artisans and reach a wider audience.
        </p>
      </div>
    </div>
  )
}

export default ArtisanLogin;
