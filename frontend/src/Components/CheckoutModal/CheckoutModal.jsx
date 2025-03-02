import { useState } from 'react';
import styles from './CheckoutModal.module.css';

const CheckoutModal = ({ isOpen, onClose, finalTotal, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (currentStep === 1) {
        setCurrentStep(2);
      } else {
        handleRazorpayPayment();
      }
    }
  };

  const handleRazorpayPayment = () => {

  };

  const goBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2>{currentStep === 1 ? 'Shipping Details' : 'Payment'}</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.stepIndicator}>
          <div className={`${styles.step} ${currentStep >= 1 ? styles.activeStep : ''}`}>
            <div className={styles.stepNumber}>1</div>
            <span>Shipping</span>
          </div>
          <div className={styles.stepDivider}></div>
          <div className={`${styles.step} ${currentStep >= 2 ? styles.activeStep : ''}`}>
            <div className={styles.stepNumber}>2</div>
            <span>Payment</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.checkoutForm}>
          {currentStep === 1 ? (
            <div className={styles.shippingDetails}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" value={formData.name}
                  onChange={handleChange} className={errors.name ? styles.inputError : ''} />
                {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" value={formData.email}
                    onChange={handleChange} className={errors.email ? styles.inputError : ''} />
                  {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                    maxLength={10} className={errors.phone ? styles.inputError : ''} />
                  {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="address">Address</label>
                <textarea id="address" name="address" value={formData.address} onChange={handleChange}
                  rows={3} className={errors.address ? styles.inputError : ''} />
                {errors.address && <span className={styles.errorMessage}>{errors.address}</span>}
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="city">City</label>
                  <input type="text" id="city" name="city" value={formData.city} onChange={handleChange}
                    className={errors.city ? styles.inputError : ''} />
                  {errors.city && <span className={styles.errorMessage}>{errors.city}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="state">State</label>
                  <input type="text" id="state" name="state" value={formData.state} onChange={handleChange}
                    className={errors.state ? styles.inputError : ''} />
                  {errors.state && <span className={styles.errorMessage}>{errors.state}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="pincode">Pincode</label>
                  <input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange}
                    maxLength={6} className={errors.pincode ? styles.inputError : ''} />
                  {errors.pincode && <span className={styles.errorMessage}>{errors.pincode}</span>}
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.paymentDetails}>
              <div className={styles.orderSummary}>
                <h3>Order Summary</h3>
                <div className={styles.summaryItem}>
                  <span>Shipping to:</span>
                  <p>{formData.name}</p>
                  <p>{formData.address}</p>
                  <p>{formData.city}, {formData.state} - {formData.pincode}</p>
                  <p>Phone: {formData.phone}</p>
                </div>
                <div className={styles.summaryItem}>
                  <span>Total Amount:</span>
                  <span className={styles.amount}>Rs.{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className={styles.paymentMethod}>
                <h3>Payment Method</h3>
                <p>You will be redirected to Razorpay to complete your payment securely.</p>
                <div className={styles.razorpayInfo}>
                  <img src="https://razorpay.com/favicon.png" alt="Razorpay" className={styles.razorpayLogo} />
                  <span>Secure payment by Razorpay</span>
                </div>
              </div>
            </div>
          )}

          <div className={styles.formActions}>
            <button type="button" className={styles.backButton} onClick={goBack} >
              {currentStep === 1 ? 'Cancel' : 'Back'}
            </button>
            <button type="submit" className={styles.continueButton} >
              {currentStep === 1 ? 'Continue to Payment' : 'Pay Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;