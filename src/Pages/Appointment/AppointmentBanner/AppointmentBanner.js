
import React from 'react';
import { DayPicker } from 'react-day-picker';
import Chair from '../../../assets/images/chair.png'

import 'react-day-picker/dist/style.css';

const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {

    return (
        <header className='my-6'>
            <div className="hero bg-base-300">
                <div className="hero-content flex-col lg:flex-row-reverse justify-between">
                    <img src={Chair} className="rounded-lg shadow-2xl lg:w-1/2" alt='' />
                    <div className='mr-6'>
                        <DayPicker
                            mode='single'
                            selected={new Date()}
                            onSelect={(data) => !data ? setSelectedDate(new Date()) : setSelectedDate(data)}
                        />

                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppointmentBanner;