import React, { useState } from 'react';

const ArtisanSignup = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);

  const sendOtp = () => {
    console.log('OTP sent to', phoneNumber);
    setShowOtpField(true);
  };

  return (
    <div>
      <div>
        <h1>Artisan Signup</h1>
        <form>
          <label>Brand Name</label><br/>
          <input
            type="text"
            placeholder="Enter brand name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          /><br/>
          <label>Phone number</label><br/>
          <input
            type="number"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          /><br/>
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
            <a href="/artisanLogin">Already have an account?</a>
          </div>
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default ArtisanSignup;
