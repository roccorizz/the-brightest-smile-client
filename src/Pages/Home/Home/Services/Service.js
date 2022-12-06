import React from 'react';

const Service = ({ service }) => {
    const { name, description, img, bgClass } = service;
    return (
        <div className={`card p-3 m-2 ${bgClass} shadow-xl `}>
            <figure><img src={img} alt="" /></figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
            </div>
        </div>



    );
};

export default Service;