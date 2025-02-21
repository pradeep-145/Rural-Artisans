import styles from './LoginStyles.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const ArtisanLogin = () => {
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [mobileNo, setmobileNo] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [sentOtp, setSentOtp] = useState(null);
  const [login, setlogin] = useState(true);
  const navigate =useNavigate()

  useEffect(() => {
    if (otp == sentOtp) {
      setlogin(false);
    }
  }, [otp, sentOtp]);

  const sendOtp = async (e) => {
    e.preventDefault();
    const generatedOtp = Math.floor(100000 + Math.random() * 900000);
    setSentOtp(generatedOtp);
    console.log(generatedOtp)
 

    
    // await axios.get(`https://www.fast2sms.com/dev/bulkV2?authorization=YOUR_API_KEY&route=otp&variables_values=${generatedOtp}&flash=0&numbers=${mobileNo}`)
    //   .then(() => {
        setShowOtpField(true);
        setIsButtonDisabled(true);
        setCountdown(60);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    setTimeout(() => {
      console.log('OTP Sent Successfully');
    }, 1000);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resposne=await axios.post('/api/auth/artisan/sign-in', { mobileNo });
      if(resposne)
      {
        localStorage.setItem('authUser',JSON.stringify(resposne.data.message))
        localStorage.setItem('type',resposne.data.user)
        navigate('/artisanDashboard')

      }
    } catch (error) {
      console.log(error);
    }
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
              <input type="number" className={styles.input} placeholder="Enter Phone Number" value={mobileNo} min={0}
                onChange={(e) => setmobileNo(e.target.value)}
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
            <button type="submit" disabled={login} onClick={handleSubmit} className={`${styles.button} ${login ? styles.disabledButton : ''}`}>
                          login
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
