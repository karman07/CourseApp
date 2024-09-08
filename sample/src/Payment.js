import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false); 

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    const res = await loadRazorpayScript();

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    setLoading(true);

    try {
      const orderUrl = 'http://localhost:3001/api/payment/createOrder';
      const result = await axios.post(orderUrl, {
        amount: parseInt(amount),
        currency: 'INR',
        receipt: 'receipt#1',
      });

      if (!result || !result.data.order) {
        throw new Error('Server error. Are you sure the backend is running?');
      }

      const { amount: orderAmount, id: order_id, currency } = result.data.order;

      const options = {
        key: 'rzp_test_yRICbmzmpY7nEE', 
        amount: orderAmount.toString(),
        currency: currency,
        name: 'Admin',
        description: 'Test Transaction',
        order_id: order_id,
        handler: async function (response) {
          try {
            const paymentUrl = 'http://localhost:3001/api/payment/capturePayment';
            const paymentResult = await axios.post(paymentUrl, {
              payment_id: response.razorpay_payment_id,
              amount: orderAmount / 100, 
            });

            if (paymentResult.data.success) {
              alert('Payment successful!');
            } else {
              alert('Payment failed. Please try again.');
            }
          } catch (error) {
            console.error('Payment capture error:', error)
          }
        },
        prefill: {
          name: 'Karman Singh',
          email: 'karmansingharora01@gmail.com',
          contact: '8813947793',
        },
        notes: {
          address: 'A-30, Max Heights Delhi',
        },
        theme: {
          color: '#A020F0',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Order creation error:', error);
      alert(error.message || 'Failed to initiate payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Make a Payment</h2>
      <input
        type='number'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder='Enter Amount'
        style={{ padding: '10px', width: '200px', marginBottom: '20px' }}
      />
      <br />
      <button
        onClick={handlePayment}
        style={{
          padding: '10px 20px',
          backgroundColor: '#A020F0',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
};

export default Payment;
