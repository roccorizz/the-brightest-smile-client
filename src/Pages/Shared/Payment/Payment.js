import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLoaderData } from 'react-router-dom'
import CheckOutForm from './CheckOutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise)
const Payment = () => {
    const booking = useLoaderData();
    const { treatment, price, appointmentDate, slot } = booking;
    return (
        <div>
            <h3 className='text-4xl'>Payment for {treatment}</h3>
            <h3 className='text-xl'>Please pay <span className='font-semibold'>${price}</span> for your appointment on {appointmentDate} at {slot}</h3>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckOutForm />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;