import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    const { signIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';
    if (token) {
        navigate(from, { raplace: true });
    }
    const handleLogin = data => {
        console.log(data);
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoginUserEmail(data.email);

            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message);
            }
            );
    }
    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7 border'>
                <h2 className='text-4xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)} >

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
                            minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        <label className="label">
                            <span className="label-text">Forget Password ?</span>

                        </label>
                    </div>



                    <input className='btn btn-accent w-full text-white' value="Login" type="submit" />
                    {loginError && <p>{loginError}</p>}
                </form>
                <p>New to Brightest Smile ? <Link to='/signup'>Sign up</Link></p>
                <div className='divider'>OR</div>
                <input className='btn btn-outline w-full' value="Google" type="submit" />
            </div>
        </div>
    );
};

export default Login;