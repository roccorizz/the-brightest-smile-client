import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';
import useToken from '../../../hooks/useToken';
const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('')
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();

    if (token) {
        navigate('/');
    }

    const handleSignup = (data) => {
        console.log(data)
        setSignUpError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('User Created Successfully')
                const userInfo = {
                    displayName: (data.firstName + " " + data.lastName)
                }
                updateUser(userInfo)
                    .then(() => {
                        let name = data.firstName + " " + data.lastName;
                        saveUser(name, data.email);
                    })
                    .catch(err => console.log(err))
            })
            .catch(error => {
                console.log(error)
                setSignUpError(error.message)
            }
            );
    }
    const saveUser = (name, email) => {
        const user = { name, email };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email);

            })

    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7 border'>
                <h2 className='text-4xl text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignup)} >

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
                            <span className="label-text">Password</span>

                        </label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: 'Password must be 6 characters or longer' },
                            pattern: { value: /(?=.*[A-Z])(?=.*[!%()^@#$&*])(?=.*[0-9])(?=.*[a-z])/, message: "Password must be strong" }
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}

                    </div>



                    <input className='btn btn-accent w-full text-white my-3' value="Sign Up" type="submit" />
                    {signUpError && <p>{signUpError}</p>}
                </form>
                <p>Already have an account ? <Link to='/login'>Login</Link></p>
                <div className='divider'>OR</div>
                <input className='btn btn-outline w-full' value="Google" type="submit" />
            </div>
        </div>
    );
};

export default SignUp;