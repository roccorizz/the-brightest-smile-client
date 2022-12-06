import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const navigate = useNavigate();
    const { data: specialties, isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/appointmentsSpecialty');
            const data = await res.json();
            return data;
        }
    })

    const handleAddDoctor = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url)
                    let doctorName = data.firstName + " " + data.lastName;
                    const doctor = {
                        name: doctorName,
                        email: data.email,
                        specialty: data.specialty,
                        image: imgData.data.url
                    }
                    //save doctor information to the database
                    fetch('http://localhost:5000/doctors', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)

                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${doctorName} is added successfully`);
                            navigate('/dashboard/managedoctors')
                        })
                }
            })
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='w-96 p-7 border'>
            <h2 className='text-4xl'>Add a Doctor</h2>
            <form onSubmit={handleSubmit(handleAddDoctor)} >

                <div className="form-control w-full max-w-xs">

                    <label className="label">
                        <span className="label-text">First Name</span>

                    </label>
                    <input type="text" {...register("firstName", {
                        required: "First Name is required"
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.firstName && <p className='text-red-600'>{errors.firstName?.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">

                    <label className="label">
                        <span className="label-text">Last Name</span>

                    </label>
                    <input type="text" {...register("lastName", {
                        required: "Last Name is required"
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.lastName && <p className='text-red-600'>{errors.lastName?.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">

                    <label className="label">
                        <span className="label-text">Email</span>

                    </label>
                    <input type="email" {...register("email", {
                        required: "Email Address is required"
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">

                    <label className="label">
                        <span className="label-text">Specialty</span>
                    </label>
                    <select
                        {...register('specialty')}
                        className="select select-bordered w-full max-w-xs">
                        <option disabled selected>Please select a Specialty</option>
                        {
                            specialties.map(specialty => <option
                                key={specialty._id}
                                value={specialty.name}
                            >{specialty.name}</option>)
                        }
                    </select>

                </div>
                <div className="form-control w-full max-w-xs">

                    <label className="label">
                        <span className="label-text">Photo</span>

                    </label>
                    <input type="file" {...register("image", {
                        required: "Photo is required"
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.image && <p className='text-red-600'>{errors.image.message}</p>}
                </div>



                <input className='btn btn-accent w-full text-white my-4' value="Add Doctor" type="submit" />

            </form>
        </div>
    );
};

/***
 * Three places to store images
 * 1. Third party image hosting server(best)
 * 2. File system of your server
 * 3. mongoDB (database)
 */


export default AddDoctor;