import React, { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
const MyAppointment = () => {
    const { user } = useContext(AuthContext);

    const url = `http://localhost:5000/bookings?email=${user?.email}`;
    const { data: bookings = [] } = useQuery({
        querykey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })
    return (
        <div>
            <h2 className='text-3xl font-bold text-center my-5'>My Appointments</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Treatment</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            bookings?.length && bookings?.map((booking, i) => <tr key={booking._id}>
                                <th>{i + 1}</th>
                                <td>{booking.patient}</td>
                                <td>{booking.treatment}</td>
                                <td>{booking.appointmentDate}</td>
                                <td>{booking.slot}</td>
                                <td>{
                                    booking.price && !booking.paid && <Link to={`/dashboard/payment/${booking._id}`}>
                                        <button
                                            className='btn btn-primary btn-sm'>

                                        </button>
                                    </Link>

                                }

                                    {
                                        booking.price && booking.paid && <span className='text-primary'>Paid</span>
                                    }
                                </td>
                            </tr>
                            )}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointment;