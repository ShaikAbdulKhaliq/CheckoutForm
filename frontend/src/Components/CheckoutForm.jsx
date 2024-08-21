import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CheckoutForm.css';

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    cardNumber: '',
  });

  

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.address.trim()) {
      errors.address = 'Shipping address is required';
    }

    const cardNumberPattern = /^[0-9]{16}$/;
    if (!formData.cardNumber) {
      errors.cardNumber = 'Card number is required';
    } else if (!cardNumberPattern.test(formData.cardNumber)) {
      errors.cardNumber = 'Card number must be 16 digits';
    }

    return errors;
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/checkout', formData);
      setMessage(response.data);
      setFormData({ name: '', address: '', cardNumber: '' }); // Clear form after successful submission
      setErrors({}); // Clear errors
    } catch (error) {
      setMessage('Error submitting order. Please try again.');
    }
  };


  useEffect(() => {
    if (message !== '') {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000); // Clear the message after 3 seconds

      // Cleanup the timeout to prevent memory leaks
      return () => clearTimeout(timer);
    }
  }, [message]);
  return (
    <div className="container">
      <h2>Checkout Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Shipping Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <p className="error">{errors.address}</p>}
        </div>
        <div>
          <label>Card Number:</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
          />
          {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CheckoutForm;
