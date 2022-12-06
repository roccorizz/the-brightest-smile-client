import React from 'react';
import doctor from '../../../assets/images/doctor_r.png'
import appointment from '../../../assets/images/appointment.png'
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const MakeAppointment = () => {
    return (
        <section className='mt-16'
            style={{ background: `url(${appointment})` }}
        >
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={doctor} className="-mt-[130px] hidden lg:block lg:w-1/2 rounded-lg shadow-2xl" alt='' />
                    <div>
                        <h1 className="text-lg text-primary font-bold">Appointment</h1>
                        <h1 className="text-5xl font-bold text-white">Make an Appointment Today</h1>
                        <p className="py-6 text-white">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <PrimaryButton>Getting Started</PrimaryButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MakeAppointment;