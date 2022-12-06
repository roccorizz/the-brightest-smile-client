import React from 'react';
import floride from '../../../../assets/images/fluoride.png'
import cavity from '../../../../assets/images/cavity.png'
import teeth from '../../../../assets/images/whitening.png'
import Service from './Service';
const Services = () => {
    const ServicesData = [
        {
            id: 1,
            name: "Floride Treatment",
            description: "Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi",
            img: floride,
            bgClass: "bg-white"
        },
        {
            id: 2,
            name: "Cavity Filling",
            description: "Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi",
            img: cavity,
            bgClass: "bg-white"
        },
        {
            id: 3,
            name: "Teeth Whitening",
            description: "Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi",
            img: teeth,
            bgClass: "bg-white"
        },
    ]
    return (
        <div>
            <div className='my-2'>
                <h2 className='text-primary font-bold text-3xl text-center my-4'>Services</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

                {
                    ServicesData.map(service => <Service
                        key={service.id}
                        service={service}
                    ></Service>)
                }
            </div>
        </div>

    );
};

export default Services;