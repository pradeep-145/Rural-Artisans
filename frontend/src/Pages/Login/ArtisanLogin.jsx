import React, { useState } from 'react'
const ArtisanLogin = () => {
   const [otp, setOtp] = useState('');
    const [showOtpField, setShowOtpField] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    const sendOtp = () => {
      console.log('OTP sent to', phoneNumber);
      setShowOtpField(true);
    };

    
  return (
    <div>
      <div>
        <h1>Artisan Login</h1>
        <form>
          <div>
            <label>Phone number</label><br/>
            <input type="number" placeholder="Enter Phone number" />
          </div>
          <button type="button" onClick={sendOtp}>Send OTP</button><br/>
          {showOtpField && (
            <>
              <label>OTP</label><br/>
              <input
                type="number"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              /><br/>
            </>
          )}
          <div>
             <a href="/artisanSignup">Don't have an account?</a>
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default ArtisanLogin