import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SignUpStyles.module.css';

const ArtisanSignup = () => {
  const [brand, setBrand] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [sentOtp, setSentOtp] = useState(null);
  const [signUp, setSignUp] = useState(true);

  useEffect(() => {
    if (otp == sentOtp) {
      setSignUp(false);
    }
  }, [otp, sentOtp]);

  const sendOtp = async (e) => {
    e.preventDefault();
    const generatedOtp = Math.floor(100000 + Math.random() * 900000);
    setSentOtp(generatedOtp);
    console.log(generatedOtp);

    
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
      await axios.post('/api/auth/artisan/sign-up', { brand, mobileNo });
      console.log("created");
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
      <div className={styles.animatedSection}>
        <p className={styles.welcomeTitle}>Welcome to</p>
        <h1 className={styles.communityTitle}>Our Artisan Community</h1>
        <p className={styles.communityText}>
          Join our network of skilled artisans and grow your business
        </p>
      </div>
      <div className={styles.signupSection}>
        <div className={styles.signupCard}>
          <h2 className={styles.joinTitle}>Join us</h2>
          <h3 className={styles.createAccount}>Create an account</h3>
          <p className={styles.subtitle}>Showcase your craftsmanship to a wider audience</p>

          <form >
            <div className={styles.formGroup}>
              <input type="text" className={styles.input} placeholder="Brand Name"
                value={brand} onChange={(e) => setBrand(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <input type="number" className={styles.input} placeholder="Phone Number" min={0}
                value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} />
            </div>
            <button type="button" className={`${styles.signupButton} ${isButtonDisabled ? styles.disabledButton : ''}`}
              onClick={sendOtp} disabled={isButtonDisabled} >
              {isButtonDisabled ? `Resend in ${countdown}s` : 'Send OTP'}
            </button>

            {showOtpField && (
              <div className={styles.formGroup}>
                <input type="number" className={styles.input} placeholder="Enter OTP" value={otp} min={0}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}

            <button type="submit" disabled={signUp} onClick={handleSubmit} className={`${styles.signupButton} ${signUp ? styles.disabledButton : ''}`}>
              Signup
            </button>

            <p className={styles.signupLink}>
              Already have an account?
              <Link to="/artisanLogin" className={styles.signupLinkText}>Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ArtisanSignup;
